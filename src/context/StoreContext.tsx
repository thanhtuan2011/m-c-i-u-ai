import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  BlogPost, 
  Review, 
  CartItem, 
  Order, 
  OrderStatus, 
  CustomerFeedback, 
  SiteSettings 
} from '../types';
import { 
  initialProducts, 
  initialBlogPosts, 
  initialReviews, 
  initialSiteSettings 
} from '../data/initialData';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;

  // Blog
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, updates: Partial<BlogPost>) => void;
  deletePost: (id: string) => void;
  getPostBySlug: (slug: string) => BlogPost | undefined;

  // Reviews
  reviews: Review[];
  addReview: (review: Omit<Review, 'id' | 'createdAt'>) => void;
  updateReview: (id: string, updates: Partial<Review>) => void;
  deleteReview: (id: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  subtotal: number;
  cartCount: number;

  // Orders
  orders: Order[];
  createOrder: (data: Omit<Order, 'id' | 'orderCode' | 'createdAt'>) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  getOrderById: (id: string) => Order | undefined;
  getOrderByCode: (code: string) => Order | undefined;

  // Feedbacks
  feedbacks: CustomerFeedback[];
  addFeedback: (fb: Omit<CustomerFeedback, 'id' | 'createdAt'>) => void;

  // Settings
  settings: SiteSettings;
  updateSettings: (updates: Partial<SiteSettings>) => void;
  resetAllToDefault: () => void;

  // Toast
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  dismissToast: (id: string) => void;

  // Routing
  currentPath: string;
  navigateTo: (path: string) => void;
}

const StoreContext = createContext<StoreContextType | null>(null);

const STORAGE_KEYS = {
  PRODUCTS: 'moc_dieu_products_v1',
  POSTS: 'moc_dieu_posts_v1',
  REVIEWS: 'moc_dieu_reviews_v1',
  CART: 'moc_dieu_cart_v1',
  ORDERS: 'moc_dieu_orders_v1',
  FEEDBACKS: 'moc_dieu_feedbacks_v1',
  SETTINGS: 'moc_dieu_settings_v1',
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State from LocalStorage or Defaults
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      if (saved) {
        const parsed: Product[] = JSON.parse(saved);
        return parsed.map(p => {
          const defaultMatch = initialProducts.find(ip => ip.id === p.id);
          if (defaultMatch) {
            return {
              ...p,
              image: defaultMatch.image,
              gallery: defaultMatch.gallery,
            };
          }
          return p;
        });
      }
      return initialProducts;
    } catch {
      return initialProducts;
    }
  });

  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.POSTS);
      if (saved) {
        const parsed: BlogPost[] = JSON.parse(saved);
        return parsed.map(post => {
          const defaultMatch = initialBlogPosts.find(ip => ip.id === post.id);
          return defaultMatch ? { ...post, coverImage: defaultMatch.coverImage } : post;
        });
      }
      return initialBlogPosts;
    } catch {
      return initialBlogPosts;
    }
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) {
        const parsed: Order[] = JSON.parse(saved);
        return parsed.map(o => ({
          ...o,
          status: (o.status === 'Đã thanh toán' || o.status === 'completed') ? 'Đã thanh toán' : 'Chưa thanh toán',
        }));
      }
      return [];
    } catch {
      return [];
    }
  });

  const [feedbacks, setFeedbacks] = useState<CustomerFeedback[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...initialSiteSettings,
          ...parsed,
          hotlinePlaceholder: (parsed.hotlinePlaceholder && !parsed.hotlinePlaceholder.includes('[')) ? parsed.hotlinePlaceholder : initialSiteSettings.hotlinePlaceholder,
          emailPlaceholder: (parsed.emailPlaceholder && !parsed.emailPlaceholder.includes('[')) ? parsed.emailPlaceholder : initialSiteSettings.emailPlaceholder,
          addressPlaceholder: (parsed.addressPlaceholder && !parsed.addressPlaceholder.includes('[')) ? parsed.addressPlaceholder : initialSiteSettings.addressPlaceholder,
          tiktokPlaceholder: (parsed.tiktokPlaceholder && !parsed.tiktokPlaceholder.includes('[')) ? parsed.tiktokPlaceholder : initialSiteSettings.tiktokPlaceholder,
          facebookPlaceholder: (parsed.facebookPlaceholder && !parsed.facebookPlaceholder.includes('[')) ? parsed.facebookPlaceholder : initialSiteSettings.facebookPlaceholder,
          zaloPlaceholder: (parsed.zaloPlaceholder && !parsed.zaloPlaceholder.includes('[')) ? parsed.zaloPlaceholder : initialSiteSettings.zaloPlaceholder,
        };
      }
      return initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Navigation State supporting browser URL
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  // Sync to LocalStorage on updates
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
    } catch (e) {
      console.error(e);
    }
  }, [feedbacks]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  // Handle popstate for browser history navigation
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path: string) => {
    if (path !== currentPath) {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Product Actions
  const addProduct = (prodData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newProduct: Product = {
      ...prodData,
      id: 'prod-' + Date.now(),
      createdAt: now,
      updatedAt: now,
    };
    setProducts(prev => [newProduct, ...prev]);
    showToast(`Đã thêm sản phẩm "${newProduct.name}"`, 'success');
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates, updatedAt: new Date().toISOString() } : p))
    );
    showToast('Đã lưu thay đổi sản phẩm', 'success');
  };

  const deleteProduct = (id: string) => {
    const p = products.find(prod => prod.id === id);
    setProducts(prev => prev.filter(item => item.id !== id));
    showToast(`Đã xóa sản phẩm ${p ? `"${p.name}"` : ''}`, 'info');
  };

  const getProductBySlug = (slug: string) => {
    return products.find(p => p.slug === slug);
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Blog Actions
  const addPost = (postData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
    const now = new Date().toISOString();
    const newPost: BlogPost = {
      ...postData,
      id: 'post-' + Date.now(),
      createdAt: now,
      updatedAt: now,
    };
    setPosts(prev => [newPost, ...prev]);
    showToast('Đã đăng bài viết mới thành công', 'success');
  };

  const updatePost = (id: string, updates: Partial<BlogPost>) => {
    setPosts(prev =>
      prev.map(item => (item.id === id ? { ...item, ...updates, updatedAt: new Date().toISOString() } : item))
    );
    showToast('Đã cập nhật bài viết', 'success');
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(p => p.id !== id));
    showToast('Đã xóa bài viết', 'info');
  };

  const getPostBySlug = (slug: string) => {
    return posts.find(p => p.slug === slug);
  };

  // Review Actions
  const addReview = (revData: Omit<Review, 'id' | 'createdAt'>) => {
    const newReview: Review = {
      ...revData,
      id: 'rev-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setReviews(prev => [newReview, ...prev]);
    showToast('Cảm ơn bạn đã gửi đánh giá! Chúng tôi đã ghi nhận.', 'success');
  };

  const updateReview = (id: string, updates: Partial<Review>) => {
    setReviews(prev => prev.map(r => (r.id === id ? { ...r, ...updates } : r)));
    showToast('Đã cập nhật trạng thái đánh giá', 'success');
  };

  const deleteReview = (id: string) => {
    setReviews(prev => prev.filter(r => r.id !== id));
    showToast('Đã xóa đánh giá', 'info');
  };

  // Cart Actions
  const addToCart = (product: Product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Đã thêm ${quantity} x "${product.name}" vào giỏ hàng`, 'success');
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Đã xóa sản phẩm khỏi giỏ hàng', 'info');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((sum, item) => {
    const itemPrice = item.product.salePrice ?? item.product.price;
    return sum + itemPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Orders
  const createOrder = (data: Omit<Order, 'id' | 'orderCode' | 'createdAt'>) => {
    const orderNumber = Math.floor(100000 + Math.random() * 900000);
    const orderCode = `MD-${orderNumber}`;
    const newOrder: Order = {
      ...data,
      // Luôn tự động có giá trị: "Chưa thanh toán", không bao giờ "pending" hoặc rỗng
      status: (data.status === 'Đã thanh toán') ? 'Đã thanh toán' : 'Chưa thanh toán',
      id: 'order-' + Date.now(),
      orderCode,
      createdAt: new Date().toISOString(),
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    showToast(`Đặt hàng thành công! Mã đơn: ${orderCode}`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(o => (o.id === orderId ? { ...o, status } : o)));
    showToast(`Đã cập nhật trạng thái đơn hàng sang "${status}"`, 'success');
  };

  const getOrderById = (id: string) => {
    return orders.find(o => o.id === id);
  };

  const getOrderByCode = (code: string) => {
    return orders.find(o => o.orderCode.toLowerCase() === code.toLowerCase());
  };

  // Feedback
  const addFeedback = (fb: Omit<CustomerFeedback, 'id' | 'createdAt'>) => {
    const newFb: CustomerFeedback = {
      ...fb,
      id: 'fb-' + Date.now(),
      createdAt: new Date().toISOString(),
    };
    setFeedbacks(prev => [newFb, ...prev]);
    showToast('Mộc Điều đã nhận được tin nhắn của bạn. Xin cảm ơn!', 'success');
  };

  // Settings
  const updateSettings = (updates: Partial<SiteSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
    showToast('Đã lưu cấu hình thương hiệu', 'success');
  };

  const resetAllToDefault = () => {
    setProducts(initialProducts);
    setPosts(initialBlogPosts);
    setReviews(initialReviews);
    setSettings(initialSiteSettings);
    setOrders([]);
    setFeedbacks([]);
    localStorage.clear();
    showToast('Đã khôi phục dữ liệu gốc thành công', 'info');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,
        posts,
        addPost,
        updatePost,
        deletePost,
        getPostBySlug,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        subtotal,
        cartCount,
        orders,
        createOrder,
        updateOrderStatus,
        getOrderById,
        getOrderByCode,
        feedbacks,
        addFeedback,
        settings,
        updateSettings,
        resetAllToDefault,
        toasts,
        showToast,
        dismissToast,
        currentPath,
        navigateTo,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
