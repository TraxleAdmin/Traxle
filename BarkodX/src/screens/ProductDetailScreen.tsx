import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';
import { getProductByBarcode, Product } from '../store/productStore';
import { isAdmin } from '../store/roleStore';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'ProductDetail'>;

export default function ProductDetailScreen() {
  const route = useRoute<ProductDetailRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { barcode } = route.params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUserAdmin, setIsUserAdmin] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProductByBarcode(barcode);
      const adminStatus = await isAdmin();

      setIsUserAdmin(adminStatus);
      if (data) {
        setProduct(data);
      }
      setLoading(false);
    };

    fetchProduct();
  }, [barcode]);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Ürün bulunamadı!</Text>
        <Text style={styles.barcodeText}>Okutulan Barkod: {barcode}</Text>

        {isUserAdmin ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace('AddEditProduct', { barcode })}
          >
            <Text style={styles.buttonText}>Bu Barkodla Yeni Ürün Ekle</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.noAuthText}>Sisteme ürün eklemek için Admin yetkisi gereklidir.</Text>
        )}

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.secondaryButtonText}>Geri Dön</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.imageContainer}>
        {product.imageUri ? (
          <Image source={{ uri: product.imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.noImageContainer}>
            <Text style={styles.noImageText}>Görsel Yok</Text>
          </View>
        )}
      </View>

      <View style={styles.detailsCard}>
        <Text style={styles.productName}>{product.name}</Text>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Barkod:</Text>
          <Text style={styles.value}>{product.barcode}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Fiyat:</Text>
          <Text style={styles.priceValue}>{product.price.toFixed(2)} TL</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Stok Miktarı:</Text>
          <Text style={[styles.value, product.stock < 10 ? styles.lowStock : styles.goodStock]}>
            {product.stock} Adet
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        {isUserAdmin && (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AddEditProduct', { barcode: product.barcode })}
          >
            <Text style={styles.buttonText}>Ürünü Düzenle</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.button, styles.secondaryButton]}
          onPress={() => navigation.navigate('Camera')}
        >
          <Text style={styles.secondaryButtonText}>Yeni Barkod Okut</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  noImageText: {
    color: '#666',
    fontSize: 18,
    fontWeight: 'bold',
  },
  detailsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  priceValue: {
    fontSize: 20,
    color: '#2e7d32',
    fontWeight: 'bold',
  },
  lowStock: {
    color: '#d32f2f',
  },
  goodStock: {
    color: '#1976d2',
  },
  actionContainer: {
    gap: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 10,
  },
  barcodeText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  noAuthText: {
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
  },
});
