export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  salePrice?: number;
  weight: string; // e.g. "250g", "500g"
  image: string;
  gallery: string[];
  ingredients: string;
  usage: string;
  storage: string;
  stock: number;
  featured: boolean;
  category: 'roasted_salt' | 'plain' | 'gift' | 'specialty';
  badges?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  readTime: string;
  published: boolean;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  content: string;
  rating: number; // 1 - 5
  image?: string;
  published: boolean;
  createdAt: string;
  productId?: string;
  productName?: string;
  location?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type PaymentStatus = 'Chưa thanh toán' | 'Đã thanh toán';
export type OrderStatus = 'Chưa thanh toán' | 'Đã thanh toán' | 'pending' | 'processing' | 'shipping' | 'completed' | 'cancelled';
export type PaymentMethod = 'cod' | 'bank_transfer';

export interface OrderItem {
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image: string;
  weight: string;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  phone: string;
  province?: string;
  address: string;
  note?: string;
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  createdAt: string;
}

export interface CustomerFeedback {
  id: string;
  name: string;
  phone: string;
  email?: string;
  message: string;
  type: 'contact' | 'qr_care' | 'product_inquiry';
  productPurchased?: string;
  createdAt: string;
}

export interface SiteSettings {
  brandName: string;
  slogan: string;
  announcementText: string;
  hotlinePlaceholder: string;
  emailPlaceholder: string;
  addressPlaceholder: string;
  tiktokPlaceholder: string;
  facebookPlaceholder: string;
  zaloPlaceholder: string;
  googleAnalyticsId: string;
  tiktokPixelId: string;
  metaPixelId: string;
  freeShippingThreshold: number;
  standardShippingFee: number;
}
