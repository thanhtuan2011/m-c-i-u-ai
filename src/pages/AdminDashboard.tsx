import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { Product, BlogPost, Review, OrderStatus } from '../types';
import { formatVND, formatDate, slugify } from '../utils/formatters';
import { 
  googleSignIn, 
  logoutGoogle, 
  getAccessToken, 
  initAuth 
} from '../services/firebaseAuth';
import { 
  listSpreadsheets, 
  createMocDieuSpreadsheet, 
  syncAllOrdersToSheet, 
  syncProductsToSheet, 
  readSheetValues, 
  DriveSpreadsheet 
} from '../services/googleSheetsService';
import { 
  ShieldCheck, 
  Package, 
  ShoppingBag, 
  FileText, 
  Star, 
  Users, 
  Settings as SettingsIcon, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  CheckCircle2, 
  RefreshCw, 
  FileSpreadsheet, 
  Save, 
  X, 
  LogOut, 
  Sparkles, 
  RotateCcw 
} from 'lucide-react';
import { User } from 'firebase/auth';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    posts,
    addPost,
    updatePost,
    deletePost,
    reviews,
    updateReview,
    deleteReview,
    feedbacks,
    settings,
    updateSettings,
    resetAllToDefault,
    showToast,
  } = useStore();

  const [activeTab, setActiveTab] = useState<
    'sheets' | 'products' | 'orders' | 'blog' | 'reviews' | 'feedbacks' | 'settings'
  >('sheets');

  // Google Workspace State
  const [googleUser, setGoogleUser] = useState<User | null>(null);
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [userSheets, setUserSheets] = useState<DriveSpreadsheet[]>([]);
  const [activeSheetId, setActiveSheetId] = useState<string>(() => {
    return localStorage.getItem('moc_dieu_active_sheet_id') || '';
  });
  const [activeSheetUrl, setActiveSheetUrl] = useState<string>(() => {
    return localStorage.getItem('moc_dieu_active_sheet_url') || '';
  });
  const [isSyncing, setIsSyncing] = useState(false);

  // Modals state
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isNewProductModalOpen, setIsNewProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    price: 150000,
    salePrice: undefined as number | undefined,
    weight: '500g',
    category: 'roasted_salt' as Product['category'],
    stock: 50,
    image: '/src/assets/images/regenerated_image_1790907946473.png',
    featured: true,
    ingredients: 'Hạt điều chọn lọc (99%), muối biển tinh khiết (1%)',
    usage: 'Dùng ăn trực tiếp, làm món tráng miệng hoặc ăn nhẹ.',
    storage: 'Bảo quản nơi khô ráo, đậy kín sau khi dùng.',
    badges: 'Mộc vị',
  });

  // Blog modal
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [postForm, setPostForm] = useState({
    title: '',
    slug: '',
    category: 'Cẩm nang dinh dưỡng',
    readTime: '4 phút đọc',
    excerpt: '',
    content: '',
    coverImage: '/src/assets/images/cashew_pure_hero_1790904772656.jpg',
    published: true,
  });

  // Settings form
  const [settingsForm, setSettingsForm] = useState({ ...settings });

  // Initialize Auth state listener
  useEffect(() => {
    const unsubscribe = initAuth(
      (user, token) => {
        setGoogleUser(user);
        setGoogleToken(token);
        loadSheetsList(token);
      },
      () => {
        setGoogleUser(null);
        setGoogleToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setGoogleUser(res.user);
        setGoogleToken(res.accessToken);
        showToast(`Đã kết nối với tài khoản Google: ${res.user.email}`, 'success');
        loadSheetsList(res.accessToken);
      }
    } catch (err: any) {
      showToast(err.message || 'Lỗi đăng nhập Google', 'error');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleGoogleLogout = async () => {
    await logoutGoogle();
    setGoogleUser(null);
    setGoogleToken(null);
    showToast('Đã đăng xuất Google', 'info');
  };

  const loadSheetsList = async (token: string) => {
    try {
      const files = await listSpreadsheets(token);
      setUserSheets(files);
    } catch (err) {
      console.warn('Không thể tải danh sách Sheets:', err);
    }
  };

  const handleCreateNewSheet = async () => {
    if (!googleToken) {
      showToast('Vui lòng kết nối tài khoản Google trước', 'warning');
      return;
    }
    setIsSyncing(true);
    try {
      const { spreadsheetId, spreadsheetUrl } = await createMocDieuSpreadsheet(googleToken);
      setActiveSheetId(spreadsheetId);
      setActiveSheetUrl(spreadsheetUrl);
      localStorage.setItem('moc_dieu_active_sheet_id', spreadsheetId);
      localStorage.setItem('moc_dieu_active_sheet_url', spreadsheetUrl);

      // Populate current orders and products immediately
      await syncAllOrdersToSheet(googleToken, spreadsheetId, orders);
      await syncProductsToSheet(googleToken, spreadsheetId, products);

      showToast('Đã tạo và đồng bộ bảng tính Mộc Điều mới thành công!', 'success');
      loadSheetsList(googleToken);
    } catch (err: any) {
      showToast(err.message || 'Lỗi khi tạo Google Sheets', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSelectExistingSheet = async (id: string, url?: string) => {
    setActiveSheetId(id);
    const fullUrl = url || `https://docs.google.com/spreadsheets/d/${id}`;
    setActiveSheetUrl(fullUrl);
    localStorage.setItem('moc_dieu_active_sheet_id', id);
    localStorage.setItem('moc_dieu_active_sheet_url', fullUrl);
    showToast('Đã chọn bảng tính Google Sheets đang hoạt động', 'info');
  };

  const handleSyncOrdersNow = async () => {
    if (!googleToken || !activeSheetId) {
      showToast('Cần kết nối Google và chọn bảng tính trước', 'warning');
      return;
    }
    setIsSyncing(true);
    try {
      await syncAllOrdersToSheet(googleToken, activeSheetId, orders);
      showToast(`Đã đồng bộ ${orders.length} đơn hàng lên Google Sheets`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi đồng bộ đơn hàng', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSyncProductsNow = async () => {
    if (!googleToken || !activeSheetId) {
      showToast('Cần kết nối Google và chọn bảng tính trước', 'warning');
      return;
    }
    setIsSyncing(true);
    try {
      await syncProductsToSheet(googleToken, activeSheetId, products);
      showToast(`Đã xuất ${products.length} sản phẩm lên Google Sheets`, 'success');
    } catch (err: any) {
      showToast(err.message || 'Lỗi xuất sản phẩm', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Product Handlers
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const badgesArray = productForm.badges
      ? productForm.badges.split(',').map(b => b.trim()).filter(Boolean)
      : [];

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: productForm.name,
        slug: productForm.slug || slugify(productForm.name),
        shortDescription: productForm.shortDescription,
        description: productForm.description,
        price: Number(productForm.price),
        salePrice: productForm.salePrice ? Number(productForm.salePrice) : undefined,
        weight: productForm.weight,
        category: productForm.category,
        stock: Number(productForm.stock),
        image: productForm.image,
        featured: productForm.featured,
        ingredients: productForm.ingredients,
        usage: productForm.usage,
        storage: productForm.storage,
        badges: badgesArray,
      });
      setEditingProduct(null);
    } else {
      addProduct({
        name: productForm.name,
        slug: productForm.slug || slugify(productForm.name),
        shortDescription: productForm.shortDescription,
        description: productForm.description,
        price: Number(productForm.price),
        salePrice: productForm.salePrice ? Number(productForm.salePrice) : undefined,
        weight: productForm.weight,
        category: productForm.category,
        stock: Number(productForm.stock),
        image: productForm.image,
        gallery: [productForm.image, '/src/assets/images/cashew_pure_hero_1790904772656.jpg'],
        featured: productForm.featured,
        ingredients: productForm.ingredients,
        usage: productForm.usage,
        storage: productForm.storage,
        badges: badgesArray,
      });
      setIsNewProductModalOpen(false);
    }
  };

  const handleOpenEditProduct = (p: Product) => {
    setEditingProduct(p);
    setProductForm({
      name: p.name,
      slug: p.slug,
      shortDescription: p.shortDescription,
      description: p.description,
      price: p.price,
      salePrice: p.salePrice,
      weight: p.weight,
      category: p.category,
      stock: p.stock,
      image: p.image,
      featured: p.featured,
      ingredients: p.ingredients,
      usage: p.usage,
      storage: p.storage,
      badges: p.badges?.join(', ') || '',
    });
  };

  const handleDeleteProductConfirm = (id: string, name: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa sản phẩm "${name}" khỏi cửa hàng?`)) {
      deleteProduct(id);
    }
  };

  // Blog Handlers
  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingPost) {
      updatePost(editingPost.id, {
        title: postForm.title,
        slug: postForm.slug || slugify(postForm.title),
        category: postForm.category,
        readTime: postForm.readTime,
        excerpt: postForm.excerpt,
        content: postForm.content,
        coverImage: postForm.coverImage,
        published: postForm.published,
      });
      setEditingPost(null);
    } else {
      addPost({
        title: postForm.title,
        slug: postForm.slug || slugify(postForm.title),
        category: postForm.category,
        readTime: postForm.readTime,
        excerpt: postForm.excerpt,
        content: postForm.content,
        coverImage: postForm.coverImage,
        author: 'Mộc Điều',
        published: postForm.published,
        publishedAt: new Date().toISOString(),
      });
      setIsNewPostModalOpen(false);
    }
  };

  const handleOpenEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      category: post.category,
      readTime: post.readTime,
      excerpt: post.excerpt,
      content: post.content,
      coverImage: post.coverImage,
      published: post.published,
    });
  };

  const handleDeletePostConfirm = (id: string, title: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa bài viết "${title}"?`)) {
      deletePost(id);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#8A5A3B]/15 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-[#2F5D7E]/10 text-[#2F5D7E]">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#252525]">
              Quản trị Mộc Điều (CMS)
            </h1>
          </div>
          <p className="text-xs text-[#6B645C] mt-1">
            Hệ thống quản lý sản phẩm, đơn hàng, bài viết và đồng bộ Google Sheets thời gian thực.
          </p>
        </div>

        {/* Google Status Quick Badge */}
        <div className="flex items-center gap-3">
          {googleUser ? (
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 p-2 px-3 rounded-xl text-xs text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-semibold">{googleUser.email}</span>
              <button
                onClick={handleGoogleLogout}
                className="text-gray-500 hover:text-red-600 p-0.5"
                title="Đăng xuất Google"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleLogin}
              disabled={isLoggingIn}
              className="gsi-material-button inline-flex items-center gap-2 px-3.5 py-2 border border-gray-300 rounded-lg bg-white shadow-xs hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-colors"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
              </svg>
              <span>{isLoggingIn ? 'Đang kết nối...' : 'Kết nối Google Sheets'}</span>
            </button>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-[#8A5A3B]/15 overflow-x-auto gap-2 pb-1 scrollbar-none">
        {[
          { id: 'sheets', label: 'Google Sheets Sync', icon: FileSpreadsheet, badge: activeSheetId ? 'Đã kết nối' : 'Chưa bật' },
          { id: 'products', label: `Sản phẩm (${products.length})`, icon: Package },
          { id: 'orders', label: `Đơn hàng (${orders.length})`, icon: ShoppingBag },
          { id: 'blog', label: `Bài viết (${posts.length})`, icon: FileText },
          { id: 'reviews', label: `Đánh giá (${reviews.length})`, icon: Star },
          { id: 'feedbacks', label: `Phản hồi KH (${feedbacks.length})`, icon: Users },
          { id: 'settings', label: 'Cấu hình thương hiệu', icon: SettingsIcon },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-[#8A5A3B] text-white shadow-xs'
                  : 'bg-white text-[#252525] hover:bg-[#EFE9DC] border border-[#8A5A3B]/10'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded ${
                  isActive ? 'bg-white/20 text-white' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* ========================================================
          TAB 1: GOOGLE SHEETS INTEGRATION
          ======================================================== */}
      {activeTab === 'sheets' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8A5A3B]/10 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252525] flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span>Tích hợp Google Sheets</span>
                </h2>
                <p className="text-xs text-[#6B645C] mt-1">
                  Đồng bộ đơn hàng tự động và quản lý kho hàng hạt điều trực tiếp từ Google Sheets.
                </p>
              </div>

              {!googleUser && (
                <button
                  onClick={handleGoogleLogin}
                  disabled={isLoggingIn}
                  className="px-4 py-2.5 bg-[#2F5D7E] text-white rounded-lg text-xs font-semibold hover:bg-[#22455E] transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Đăng nhập cấp quyền Google</span>
                </button>
              )}
            </div>

            {/* Connection Status Box */}
            <div className="p-4 rounded-xl bg-[#F7F3EA] border border-[#8A5A3B]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B645C]">Trạng thái kết nối:</span>
                {googleUser ? (
                  <p className="text-sm font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Đã liên kết tài khoản Google: {googleUser.email}</span>
                  </p>
                ) : (
                  <p className="text-sm font-medium text-amber-800">
                    Chưa đăng nhập. Hãy bấm nút "Kết nối Google Sheets" ở góc trên để liên kết tài khoản của bạn.
                  </p>
                )}
              </div>

              {googleUser && (
                <div className="flex gap-2">
                  <button
                    onClick={handleCreateNewSheet}
                    disabled={isSyncing}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Tạo bảng tính Mộc Điều mới</span>
                  </button>
                </div>
              )}
            </div>

            {/* Active Sheet Card */}
            {activeSheetId ? (
              <div className="p-5 rounded-xl border border-emerald-300 bg-emerald-50/50 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
                      Bảng tính đang hoạt động:
                    </span>
                    <p className="font-mono text-xs text-gray-700 break-all">{activeSheetId}</p>
                  </div>
                  {activeSheetUrl && (
                    <a
                      href={activeSheetUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 underline"
                    >
                      <span>Mở bảng tính trong tab mới</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                {/* Actions on active sheet */}
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={handleSyncOrdersNow}
                    disabled={isSyncing}
                    className="px-4 py-2 bg-[#8A5A3B] hover:bg-[#6E442B] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
                    <span>Đồng bộ đơn hàng lên Sheets ({orders.length} đơn)</span>
                  </button>

                  <button
                    onClick={handleSyncProductsNow}
                    disabled={isSyncing}
                    className="px-4 py-2 bg-[#2F5D7E] hover:bg-[#22455E] text-white rounded-lg text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors"
                  >
                    <Package className="w-3.5 h-3.5" />
                    <span>Xuất danh mục sản phẩm sang Sheets ({products.length} SP)</span>
                  </button>
                </div>

                {/* Quy chuẩn Cột K: Trạng Thái */}
                <div className="mt-3 p-3.5 rounded-lg bg-white/80 border border-emerald-200 text-xs text-gray-700 space-y-1.5">
                  <div className="flex items-center gap-2 font-bold text-emerald-900">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Quy chuẩn Cột K = Trạng Thái (Dropdown):</span>
                  </div>
                  <ul className="list-disc pl-5 space-y-1 text-[11px] text-gray-600">
                    <li>
                      <strong>Tự động gán:</strong> Khi khách đặt hàng trên web, đơn mới tự động ghi vào Sheets với cột K = <span className="font-semibold text-amber-700 bg-amber-50 px-1 py-0.5 rounded border border-amber-200">Chưa thanh toán</span> (không để trống, không để "pending").
                    </li>
                    <li>
                      <strong>Chỉ 2 lựa chọn:</strong> Cột K có dropdown 2 giá trị: <em>"Chưa thanh toán"</em> và <em>"Đã thanh toán"</em>.
                    </li>
                    <li>
                      <strong>Xác nhận thủ công:</strong> Nhân viên sau khi kiểm tra tiền về tài khoản ngân hàng sẽ tự chọn thủ công sang <span className="font-semibold text-emerald-700 bg-emerald-50 px-1 py-0.5 rounded border border-emerald-200">Đã thanh toán</span>.
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="p-6 rounded-xl border border-dashed border-[#8A5A3B]/30 text-center space-y-2">
                <p className="text-xs sm:text-sm font-semibold text-[#252525]">
                  Chưa chọn bảng tính nào để đồng bộ dữ liệu.
                </p>
                <p className="text-xs text-[#6B645C]">
                  Bạn có thể tạo bảng tính chuẩn mới (gồm tab Đơn Hàng & Sản Phẩm) hoặc chọn từ danh sách bên dưới.
                </p>
              </div>
            )}

            {/* List of existing spreadsheets from Google Drive */}
            {googleUser && userSheets.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[#8A5A3B]/10">
                <h3 className="font-serif text-sm font-bold text-[#252525]">
                  Danh sách bảng tính trên Google Drive của bạn:
                </h3>

                <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                  {userSheets.map(sheet => {
                    const isSelected = activeSheetId === sheet.id;
                    return (
                      <div
                        key={sheet.id}
                        className={`p-3 rounded-lg border flex items-center justify-between text-xs transition-colors ${
                          isSelected
                            ? 'bg-emerald-50 border-emerald-300 font-semibold'
                            : 'bg-white border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span className="truncate">{sheet.name}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {isSelected ? (
                            <span className="text-[11px] text-emerald-700 font-bold">Đang dùng</span>
                          ) : (
                            <button
                              onClick={() => handleSelectExistingSheet(sheet.id, sheet.webViewLink)}
                              className="px-2.5 py-1 bg-[#8A5A3B] text-white rounded text-[11px] hover:bg-[#6E442B]"
                            >
                              Chọn bảng này
                            </button>
                          )}
                          {sheet.webViewLink && (
                            <a
                              href={sheet.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-gray-400 hover:text-gray-700 p-1"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 2: PRODUCTS MANAGEMENT (Thêm, Sửa, Xóa, Đổi giá, Tồn kho)
          ======================================================== */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8A5A3B]/10 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252525]">
                  Danh sách sản phẩm ({products.length})
                </h2>
                <p className="text-xs text-[#6B645C]">
                  Quản lý giá, tồn kho, hình ảnh và phân loại danh mục sản phẩm.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    slug: '',
                    shortDescription: '',
                    description: '',
                    price: 150000,
                    salePrice: undefined,
                    weight: '500g',
                    category: 'roasted_salt',
                    stock: 50,
                    image: '/src/assets/images/regenerated_image_1790907946473.png',
                    featured: true,
                    ingredients: 'Hạt điều chọn lọc (99%), muối biển tự nhiên (1%)',
                    usage: 'Ăn trực tiếp, thưởng thức cùng trà mộc.',
                    storage: 'Bảo quản nơi khô ráo, đậy kín nắp.',
                    badges: 'Mộc vị',
                  });
                  setIsNewProductModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#8A5A3B] hover:bg-[#6E442B] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Thêm sản phẩm mới</span>
              </button>
            </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#8A5A3B]/15 text-[#6B645C] bg-[#F7F3EA]/50">
                    <th className="p-3">Sản phẩm</th>
                    <th className="p-3">Quy cách</th>
                    <th className="p-3">Giá bán</th>
                    <th className="p-3">Giá ưu đãi</th>
                    <th className="p-3">Tồn kho</th>
                    <th className="p-3">Nổi bật</th>
                    <th className="p-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {products.map(p => (
                    <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-md bg-[#F7F3EA]" />
                        <div>
                          <span className="font-bold text-[#252525] block line-clamp-1">{p.name}</span>
                          <span className="text-[11px] text-[#6B645C]">{p.category}</span>
                        </div>
                      </td>
                      <td className="p-3 font-medium">{p.weight}</td>
                      <td className="p-3 font-bold text-[#8A5A3B]">{formatVND(p.price)}</td>
                      <td className="p-3 text-[#2F5D7E] font-medium">
                        {p.salePrice ? formatVND(p.salePrice) : '—'}
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          p.stock > 10 ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                        }`}>
                          {p.stock} hộp
                        </span>
                      </td>
                      <td className="p-3">
                        {p.featured ? (
                          <span className="text-amber-600 font-semibold">★ Có</span>
                        ) : (
                          <span className="text-gray-400">Không</span>
                        )}
                      </td>
                      <td className="p-3 text-right space-x-1">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 hover:bg-gray-100 rounded text-[#8A5A3B]"
                          title="Chỉnh sửa sản phẩm"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProductConfirm(p.id, p.name)}
                          className="p-1.5 hover:bg-red-50 rounded text-red-600"
                          title="Xóa sản phẩm"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 3: ORDERS MANAGEMENT
          ======================================================== */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8A5A3B]/10 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252525]">
                  Danh sách đơn đặt hàng ({orders.length})
                </h2>
                <p className="text-xs text-[#6B645C]">
                  Theo dõi trạng thái giao hàng và chi tiết khách hàng.
                </p>
              </div>

              {activeSheetId && (
                <button
                  onClick={handleSyncOrdersNow}
                  className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Đồng bộ sang Google Sheets</span>
                </button>
              )}
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-16 p-8 border border-dashed border-[#8A5A3B]/20 rounded-xl space-y-2">
                <ShoppingBag className="w-10 h-10 text-[#8A5A3B]/40 mx-auto" />
                <p className="font-serif text-base font-bold">Chưa có đơn hàng nào</p>
                <p className="text-xs text-[#6B645C]">Khi khách hàng đặt hàng trên web, đơn sẽ xuất hiện tại đây.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map(order => (
                  <div key={order.id} className="p-4 sm:p-5 rounded-xl border border-[#8A5A3B]/15 bg-[#F7F3EA]/30 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-black/5 pb-2 text-xs">
                      <div className="flex items-center gap-2">
                        <strong className="font-mono text-sm text-[#8A5A3B]">{order.orderCode}</strong>
                        <span>•</span>
                        <span className="text-[#6B645C]">{formatDate(order.createdAt)}</span>
                      </div>

                      {/* Status Selector */}
                      <div className="flex items-center gap-2">
                        <span className="text-[#6B645C]">Trạng thái:</span>
                        <select
                          value={order.status === 'Đã thanh toán' || order.status === 'completed' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                          onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className={`p-1.5 px-3 rounded-lg border font-semibold text-xs focus:outline-none transition-colors ${
                            order.status === 'Đã thanh toán' || order.status === 'completed'
                              ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                              : 'border-amber-400 bg-amber-50 text-amber-800'
                          }`}
                        >
                          <option value="Chưa thanh toán">Chưa thanh toán</option>
                          <option value="Đã thanh toán">Đã thanh toán</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-[#6B645C] block">Khách hàng:</span>
                        <strong className="text-sm">{order.customerName}</strong>
                        <p className="text-[#6B645C]">{order.phone}</p>
                      </div>

                      <div>
                        <span className="text-[#6B645C] block">Địa chỉ nhận hàng:</span>
                        <p className="text-gray-800">{order.address}{order.province ? `, ${order.province}` : ''}</p>
                        {order.note && <p className="italic text-[#8A5A3B]">"{order.note}"</p>}
                      </div>

                      <div className="text-right sm:text-right">
                        <span className="text-[#6B645C] block">Tổng thanh toán ({order.paymentMethod === 'cod' ? 'COD' : 'VietQR'}):</span>
                        <strong className="text-base text-[#8A5A3B]">{formatVND(order.total)}</strong>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-black/5 text-xs text-[#6B645C]">
                      <span>Chi tiết: </span>
                      {order.items.map((it, i) => (
                        <span key={i} className="inline-block mr-2 bg-white px-2 py-0.5 rounded border border-black/5 text-[#252525]">
                          {it.productName} ({it.weight}) x{it.quantity}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 4: BLOG POSTS MANAGEMENT
          ======================================================== */}
      {activeTab === 'blog' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8A5A3B]/10 pb-4">
              <div>
                <h2 className="font-serif text-xl font-bold text-[#252525]">
                  Quản lý bài viết ({posts.length})
                </h2>
                <p className="text-xs text-[#6B645C]">
                  Thêm mới hoặc chỉnh sửa các bài viết cẩm nang, mẹo bảo quản hạt điều.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPost(null);
                  setPostForm({
                    title: '',
                    slug: '',
                    category: 'Mẹo bảo quản',
                    readTime: '4 phút đọc',
                    excerpt: '',
                    content: '',
                    coverImage: '/src/assets/images/cashew_pure_hero_1790904772656.jpg',
                    published: true,
                  });
                  setIsNewPostModalOpen(true);
                }}
                className="px-4 py-2.5 bg-[#8A5A3B] hover:bg-[#6E442B] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Viết bài mới</span>
              </button>
            </div>

            <div className="space-y-3">
              {posts.map(p => (
                <div key={p.id} className="p-4 rounded-xl border border-[#8A5A3B]/15 flex items-center justify-between gap-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <img src={p.coverImage} alt={p.title} className="w-14 h-14 object-cover rounded-lg bg-[#F7F3EA]" />
                    <div>
                      <h3 className="font-bold text-xs sm:text-sm text-[#252525] line-clamp-1">{p.title}</h3>
                      <p className="text-[11px] text-[#6B645C]">{p.category} • {formatDate(p.publishedAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updatePost(p.id, { published: !p.published })}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                        p.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                      }`}
                    >
                      {p.published ? 'Đã xuất bản' : 'Bản nháp'}
                    </button>
                    <button
                      onClick={() => handleOpenEditPost(p)}
                      className="p-1.5 hover:bg-gray-200 rounded text-[#8A5A3B]"
                      title="Sửa bài"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeletePostConfirm(p.id, p.title)}
                      className="p-1.5 hover:bg-red-50 rounded text-red-600"
                      title="Xóa bài"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 5: REVIEWS MODERATION
          ======================================================== */}
      {activeTab === 'reviews' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252525]">
                Đánh giá khách hàng ({reviews.length})
              </h2>
              <p className="text-xs text-[#6B645C]">
                Kiểm duyệt cảm nhận thực tế từ khách hàng gửi về website.
              </p>
            </div>

            {reviews.length === 0 ? (
              <div className="text-center py-12 p-6 border border-dashed border-[#8A5A3B]/20 rounded-xl space-y-2">
                <Star className="w-8 h-8 text-amber-500/40 mx-auto" />
                <p className="font-serif text-base font-bold">Chưa có đánh giá nào</p>
                <p className="text-xs text-[#6B645C]">Tuân thủ nguyên tắc không tạo đánh giá ảo. Khi khách hàng gửi đánh giá, bạn có thể duyệt tại đây.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map(r => (
                  <div key={r.id} className="p-4 rounded-xl border border-[#8A5A3B]/15 flex items-start justify-between gap-4">
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center gap-2">
                        <strong className="text-[#252525]">{r.customerName}</strong>
                        <span className="text-amber-500">{'★'.repeat(r.rating)}</span>
                        <span className="text-[#6B645C]">• {formatDate(r.createdAt)}</span>
                      </div>
                      <p className="italic text-[#252525]">"{r.content}"</p>
                      {r.productName && <p className="text-[11px] text-[#8A5A3B]">{r.productName}</p>}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateReview(r.id, { published: !r.published })}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold ${
                          r.published ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-200 text-gray-700'
                        }`}
                      >
                        {r.published ? 'Hiển thị' : 'Ẩn'}
                      </button>
                      <button
                        onClick={() => deleteReview(r.id)}
                        className="p-1 hover:bg-red-50 text-red-600 rounded"
                        title="Xóa đánh giá"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 6: FEEDBACKS / CUSTOMER INQUIRIES
          ======================================================== */}
      {activeTab === 'feedbacks' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252525]">
                Tin nhắn & Góp ý từ khách hàng ({feedbacks.length})
              </h2>
              <p className="text-xs text-[#6B645C]">
                Tin nhắn gửi từ trang Liên hệ và trang Quét QR chăm sóc khách hàng.
              </p>
            </div>

            {feedbacks.length === 0 ? (
              <div className="text-center py-12 p-6 border border-dashed border-[#8A5A3B]/20 rounded-xl space-y-2">
                <Users className="w-8 h-8 text-[#2F5D7E]/40 mx-auto" />
                <p className="font-serif text-base font-bold">Chưa có tin nhắn nào</p>
                <p className="text-xs text-[#6B645C]">Tin nhắn từ form liên hệ và QR Care sẽ hiển thị tại đây.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {feedbacks.map(fb => (
                  <div key={fb.id} className="p-4 rounded-xl border border-[#8A5A3B]/15 bg-[#F7F3EA]/30 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <strong className="text-sm text-[#252525]">{fb.name}</strong>
                        <span className="text-[#6B645C]">• SĐT: {fb.phone}</span>
                        {fb.email && <span className="text-[#6B645C]">• Email: {fb.email}</span>}
                      </div>
                      <span className="text-[11px] text-[#6B645C]">{formatDate(fb.createdAt)}</span>
                    </div>

                    <div className="p-3 bg-white rounded-lg border border-black/5">
                      <p className="text-gray-800 leading-relaxed">{fb.message}</p>
                    </div>

                    <div className="flex justify-between items-center text-[11px] text-[#6B645C]">
                      <span>Nguồn: {fb.type === 'qr_care' ? 'Quét mã QR trên hộp hạt điều' : 'Form Liên hệ website'}</span>
                      {fb.productPurchased && <span>Sản phẩm: {fb.productPurchased}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================
          TAB 7: SETTINGS & BRAND PLACEHOLDERS
          ======================================================== */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-6">
            <div>
              <h2 className="font-serif text-xl font-bold text-[#252525]">
                Cấu hình thương hiệu & Placeholder (Rule 30 & 36)
              </h2>
              <p className="text-xs text-[#6B645C]">
                Bạn có thể cập nhật thông tin liên hệ và các mã theo dõi Analytics tại đây mà không cần sửa code.
              </p>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                updateSettings(settingsForm);
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Hotline hiển thị *
                  </label>
                  <input
                    type="text"
                    value={settingsForm.hotlinePlaceholder}
                    onChange={e => setSettingsForm({ ...settingsForm, hotlinePlaceholder: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Email liên hệ *
                  </label>
                  <input
                    type="text"
                    value={settingsForm.emailPlaceholder}
                    onChange={e => setSettingsForm({ ...settingsForm, emailPlaceholder: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#252525] mb-1">
                  Địa chỉ showroom / văn phòng *
                </label>
                <input
                  type="text"
                  value={settingsForm.addressPlaceholder}
                  onChange={e => setSettingsForm({ ...settingsForm, addressPlaceholder: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Kênh TikTok
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tiktokPlaceholder}
                    onChange={e => setSettingsForm({ ...settingsForm, tiktokPlaceholder: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Kênh Facebook
                  </label>
                  <input
                    type="text"
                    value={settingsForm.facebookPlaceholder}
                    onChange={e => setSettingsForm({ ...settingsForm, facebookPlaceholder: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Kênh Zalo
                  </label>
                  <input
                    type="text"
                    value={settingsForm.zaloPlaceholder}
                    onChange={e => setSettingsForm({ ...settingsForm, zaloPlaceholder: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Google Analytics ID
                  </label>
                  <input
                    type="text"
                    value={settingsForm.googleAnalyticsId}
                    onChange={e => setSettingsForm({ ...settingsForm, googleAnalyticsId: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    TikTok Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tiktokPixelId}
                    onChange={e => setSettingsForm({ ...settingsForm, tiktokPixelId: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 font-mono text-[11px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#252525] mb-1">
                    Meta Pixel ID
                  </label>
                  <input
                    type="text"
                    value={settingsForm.metaPixelId}
                    onChange={e => setSettingsForm({ ...settingsForm, metaPixelId: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 font-mono text-[11px]"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#8A5A3B] hover:bg-[#6E442B] text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu thay đổi cài đặt</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Khôi phục toàn bộ dữ liệu gốc của Mộc Điều?')) {
                      resetAllToDefault();
                    }
                  }}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Khôi phục dữ liệu gốc</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT PRODUCT
          ======================================================== */}
      {(isNewProductModalOpen || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#8A5A3B]/20 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => {
                setIsNewProductModalOpen(false);
                setEditingProduct(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#252525] mb-1">
              {editingProduct ? `Sửa sản phẩm: ${editingProduct.name}` : 'Thêm sản phẩm hạt điều mới'}
            </h3>
            <p className="text-xs text-[#6B645C] mb-4">
              Điền thông tin quy cách, giá và mô tả của hạt điều.
            </p>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Tên sản phẩm *</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Giá bán (VND) *</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={e => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Giá khuyến mãi (VND)</label>
                  <input
                    type="number"
                    value={productForm.salePrice || ''}
                    onChange={e => setProductForm({ 
                      ...productForm, 
                      salePrice: e.target.value ? Number(e.target.value) : undefined 
                    })}
                    placeholder="Để trống nếu không giảm"
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Quy cách (Khối lượng) *</label>
                  <input
                    type="text"
                    required
                    value={productForm.weight}
                    onChange={e => setProductForm({ ...productForm, weight: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Tồn kho *</label>
                  <input
                    type="number"
                    required
                    value={productForm.stock}
                    onChange={e => setProductForm({ ...productForm, stock: Number(e.target.value) })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Danh mục *</label>
                  <select
                    value={productForm.category}
                    onChange={e => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300 bg-white"
                  >
                    <option value="roasted_salt">Rang muối vỏ lụa</option>
                    <option value="plain">Rang mộc không muối</option>
                    <option value="gift">Hộp quà biếu</option>
                    <option value="specialty">Đặc sản</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Đường dẫn hình ảnh *</label>
                <input
                  type="text"
                  required
                  value={productForm.image}
                  onChange={e => setProductForm({ ...productForm, image: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Mô tả ngắn *</label>
                <textarea
                  rows={2}
                  required
                  value={productForm.shortDescription}
                  onChange={e => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Mô tả chi tiết *</label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={e => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-check"
                  checked={productForm.featured}
                  onChange={e => setProductForm({ ...productForm, featured: e.target.checked })}
                  className="rounded text-[#8A5A3B] focus:ring-[#8A5A3B]"
                />
                <label htmlFor="featured-check" className="text-xs font-semibold text-[#252525]">
                  Đặt làm sản phẩm nổi bật ở Trang chủ
                </label>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewProductModalOpen(false);
                    setEditingProduct(null);
                  }}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#8A5A3B] text-white rounded-lg text-xs font-semibold shadow hover:bg-[#6E442B]"
                >
                  {editingProduct ? 'Lưu cập nhật' : 'Thêm sản phẩm'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: ADD / EDIT BLOG POST
          ======================================================== */}
      {(isNewPostModalOpen || editingPost) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#8A5A3B]/20 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => {
                setIsNewPostModalOpen(false);
                setEditingPost(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-xl font-bold text-[#252525] mb-1">
              {editingPost ? 'Chỉnh sửa bài viết' : 'Viết bài mới cho Góc Mộc Điều'}
            </h3>

            <form onSubmit={handleSavePost} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Tiêu đề bài viết *</label>
                <input
                  type="text"
                  required
                  value={postForm.title}
                  onChange={e => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 focus:border-[#8A5A3B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1">Chuyên mục *</label>
                  <input
                    type="text"
                    required
                    value={postForm.category}
                    onChange={e => setPostForm({ ...postForm, category: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1">Thời gian đọc</label>
                  <input
                    type="text"
                    value={postForm.readTime}
                    onChange={e => setPostForm({ ...postForm, readTime: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-lg border border-gray-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Hình ảnh bìa</label>
                <input
                  type="text"
                  value={postForm.coverImage}
                  onChange={e => setPostForm({ ...postForm, coverImage: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Đoạn trích tóm tắt (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  value={postForm.excerpt}
                  onChange={e => setPostForm({ ...postForm, excerpt: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Nội dung chi tiết (hỗ trợ Markdown) *</label>
                <textarea
                  rows={6}
                  required
                  value={postForm.content}
                  onChange={e => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-lg border border-gray-300 font-mono"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="post-published-check"
                  checked={postForm.published}
                  onChange={e => setPostForm({ ...postForm, published: e.target.checked })}
                  className="rounded text-[#8A5A3B]"
                />
                <label htmlFor="post-published-check" className="text-xs font-semibold text-[#252525]">
                  Xuất bản công khai lên website
                </label>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsNewPostModalOpen(false);
                    setEditingPost(null);
                  }}
                  className="flex-1 py-2.5 border border-gray-300 rounded-lg text-xs font-semibold"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#8A5A3B] text-white rounded-lg text-xs font-semibold shadow hover:bg-[#6E442B]"
                >
                  {editingPost ? 'Lưu bài viết' : 'Đăng bài viết'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
