'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiUser, FiSearch, FiMoreVertical, FiCheck, FiClock, FiImage } from 'react-icons/fi';
import { db, auth } from '@/lib/firebase';
import { 
  collection, query, where, onSnapshot, addDoc, 
  serverTimestamp, orderBy, doc, updateDoc 
} from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState<any>(null);
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // --- 1. SOHBET LİSTESİNİ DİNLE ---
  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const q = query(
          collection(db, "chats"),
          where("participants", "array-contains", user.uid)
        );

        const unsubChats = onSnapshot(q, (snapshot) => {
          const chatList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setChats(chatList);
          setLoading(false);
        });

        return () => unsubChats();
      }
    });
    return () => unsubAuth();
  }, []);

  // --- 2. AKTİF MESAJLARI DİNLE ---
  useEffect(() => {
    if (!activeChat) return;

    const q = query(
      collection(db, "chats", activeChat.id, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubMessages = onSnapshot(q, (snapshot) => {
      const msgList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgList);
      // Mesaj gelince aşağı kaydır
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });

    return () => unsubMessages();
  }, [activeChat]);

  // --- 3. MESAJ GÖNDER ---
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeChat || !auth.currentUser) return;

    const msgData = {
      senderId: auth.currentUser.uid,
      text: newMessage,
      createdAt: serverTimestamp(),
    };

    try {
      // Mesajı alt koleksiyona ekle
      await addDoc(collection(db, "chats", activeChat.id, "messages"), msgData);
      
      // Ana sohbet dokümanını güncelle (Son mesaj ve zamanı)
      await updateDoc(doc(db, "chats", activeChat.id), {
        lastMessage: newMessage,
        lastMessageTime: serverTimestamp()
      });

      setNewMessage('');
    } catch (error) {
      console.error("Mesaj gönderilemedi:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-160px)] flex bg-white dark:bg-[#0F1629] rounded-3xl border border-gray-200 dark:border-white/5 overflow-hidden shadow-sm">
      
      {/* --- SOL: SOHBET LİSTESİ --- */}
      <div className="w-full md:w-80 lg:w-96 border-r border-gray-100 dark:border-white/5 flex flex-col">
        <div className="p-6 border-b border-gray-100 dark:border-white/5">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Mesajlar</h2>
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Sohbetlerde ara..." 
              className="w-full bg-gray-50 dark:bg-white/5 border-none rounded-xl py-2 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => (
            <div 
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`p-4 flex items-center gap-4 cursor-pointer transition-colors border-b border-gray-50 dark:border-white/5
                ${activeChat?.id === chat.id ? 'bg-blue-50 dark:bg-blue-900/20' : 'hover:bg-gray-50 dark:hover:bg-white/5'}
              `}
            >
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold shrink-0">
                {chat.chatName?.charAt(0) || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-gray-900 dark:text-white truncate">{chat.chatName}</h4>
                  <span className="text-[10px] text-gray-400">12:45</span>
                </div>
                <p className="text-xs text-gray-500 truncate">{chat.lastMessage || 'Mesaj bulunmuyor'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- SAĞ: SOHBET PENCERESİ --- */}
      <div className="hidden md:flex flex-1 flex-col bg-gray-50 dark:bg-black/20">
        {activeChat ? (
          <>
            {/* Sohbet Header */}
            <div className="p-4 bg-white dark:bg-[#0F1629] border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                  {activeChat.chatName?.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{activeChat.chatName}</h4>
                  <span className="text-[10px] text-green-500 font-bold uppercase tracking-wider">Çevrimiçi</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600"><FiMoreVertical /></button>
            </div>

            {/* Mesaj Alanı */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((msg) => {
                const isMe = msg.senderId === auth.currentUser?.uid;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm
                      ${isMe 
                        ? 'bg-blue-600 text-white rounded-tr-none' 
                        : 'bg-white dark:bg-[#1A1F2E] text-gray-900 dark:text-white rounded-tl-none'}
                    `}>
                      {msg.text}
                      <div className={`text-[9px] mt-1 flex justify-end gap-1 ${isMe ? 'text-blue-100' : 'text-gray-400'}`}>
                        {isMe && <FiCheck />} 12:46
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={scrollRef} />
            </div>

            {/* Input Alanı */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white dark:bg-[#0F1629] border-t border-gray-100 dark:border-white/5">
              <div className="flex items-center gap-3 bg-gray-50 dark:bg-white/5 p-2 rounded-2xl border border-gray-200 dark:border-white/10">
                <button type="button" className="p-2 text-gray-400 hover:text-blue-500 transition-colors"><FiImage /></button>
                <input 
                  type="text" 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Bir mesaj yazın..." 
                  className="flex-1 bg-transparent border-none outline-none text-sm text-gray-900 dark:text-white p-2"
                />
                <button 
                  type="submit"
                  className="w-10 h-10 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-all active:scale-90"
                >
                  <FiSend />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center text-4xl mb-4">💬</div>
            <p className="font-medium">Sohbet seçerek mesajlaşmaya başlayın.</p>
          </div>
        )}
      </div>
    </div>
  );
}