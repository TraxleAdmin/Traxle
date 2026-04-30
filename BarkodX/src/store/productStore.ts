import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCTS_KEY = '@BarkodX_Products';
const INITIALIZED_KEY = '@BarkodX_Initialized';

export interface Product {
  id: string;
  barcode: string;
  name: string;
  price: number;
  stock: number;
  imageUri?: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', barcode: '8690000000001', name: 'Örnek Ürün 1', price: 15.50, stock: 120 },
  { id: '2', barcode: '8690000000002', name: 'Örnek Ürün 2', price: 45.00, stock: 50 },
  { id: '3', barcode: '8690000000003', name: 'Örnek Ürün 3', price: 9.99, stock: 300 },
  { id: '4', barcode: '8690000000004', name: 'Örnek Ürün 4', price: 125.00, stock: 15 },
  { id: '5', barcode: '8690000000005', name: 'Örnek Ürün 5', price: 8.75, stock: 85 },
];

export const initializeMockData = async () => {
  try {
    const initialized = await AsyncStorage.getItem(INITIALIZED_KEY);
    if (!initialized) {
      await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(MOCK_PRODUCTS));
      await AsyncStorage.setItem(INITIALIZED_KEY, 'true');
      console.log('Mock products initialized.');
    }
  } catch (error) {
    console.error('Error initializing mock data:', error);
  }
};

export const getProducts = async (): Promise<Product[]> => {
  try {
    const data = await AsyncStorage.getItem(PRODUCTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting products:', error);
    return [];
  }
};

export const getProductByBarcode = async (barcode: string): Promise<Product | undefined> => {
  const products = await getProducts();
  return products.find(p => p.barcode === barcode);
};

export const saveProduct = async (product: Product) => {
  try {
    const products = await getProducts();
    const existingIndex = products.findIndex(p => p.barcode === product.barcode);

    if (existingIndex >= 0) {
      products[existingIndex] = product;
    } else {
      product.id = Date.now().toString(); // Basic ID generation for new products
      products.push(product);
    }

    await AsyncStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
    return true;
  } catch (error) {
    console.error('Error saving product:', error);
    return false;
  }
};
