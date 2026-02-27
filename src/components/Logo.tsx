export default function Logo({ className = "w-8 h-8" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Prizma / Kutu Şekli */}
      <path 
        d="M16 2L2 9L16 16L30 9L16 2Z" 
        className="fill-traxle-cyan" 
      />
      <path 
        d="M2 23L16 30V16L2 9V23Z" 
        className="fill-traxle-blue" 
      />
      <path 
        d="M30 23L16 30V16L30 9V23Z" 
        className="fill-blue-600" 
      />
      
      {/* Parlama Efekti */}
      <path 
        d="M16 2L20 4L6 11L2 9L16 2Z" 
        fill="white" 
        fillOpacity="0.3" 
      />
    </svg>
  );
}