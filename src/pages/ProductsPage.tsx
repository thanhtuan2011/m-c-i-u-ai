import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';
import { Search, Filter, Sparkles } from 'lucide-react';

export const ProductsPage: React.FC = () => {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    { id: 'all', label: 'Tất cả sản phẩm' },
    { id: 'roasted_salt', label: 'Rang muối vỏ lụa' },
    { id: 'plain', label: 'Rang mộc nguyên vị' },
    { id: 'gift', label: 'Hộp quà biếu tặng' },
  ];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
        const matchesSearch = 
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.ingredients.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        const priceA = a.salePrice ?? a.price;
        const priceB = b.salePrice ?? b.price;
        if (sortBy === 'price-asc') return priceA - priceB;
        if (sortBy === 'price-desc') return priceB - priceA;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Danh mục tuyển chọn</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#252525]">
          Sản phẩm Mộc Điều
        </h1>
        <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed">
          Từng hạt điều được tuyển chọn kỹ lưỡng, rang mộc tự nhiên, mang trọn vị bùi béo và hương thơm thanh lành đến gia đình bạn.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#8A5A3B]/15 shadow-xs space-y-4">
        
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-[#8A5A3B] text-white shadow-xs'
                  : 'bg-[#F7F3EA] text-[#252525] hover:bg-[#EFE9DC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-[#8A5A3B]/10 justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B645C]" />
            <input
              type="text"
              placeholder="Tìm kiếm hạt điều rang muối, không muối, hộp quà..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[#8A5A3B]/20 text-xs sm:text-sm focus:outline-none focus:border-[#8A5A3B] bg-[#F7F3EA]/30"
            />
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto text-xs">
            <Filter className="w-3.5 h-3.5 text-[#6B645C]" />
            <span className="text-[#6B645C]">Sắp xếp:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="py-2 px-3 rounded-lg border border-[#8A5A3B]/20 bg-white font-medium text-[#252525] focus:outline-none focus:border-[#8A5A3B]"
            >
              <option value="featured">Nổi bật nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
            </select>
          </div>
        </div>

      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-[#8A5A3B]/20 p-8 space-y-4">
          <p className="font-serif text-xl font-bold text-[#252525]">
            Không tìm thấy sản phẩm phù hợp
          </p>
          <p className="text-xs sm:text-sm text-[#6B645C]">
            Vui lòng thử tìm với từ khóa khác hoặc xóa bộ lọc để xem toàn bộ danh mục.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            className="px-5 py-2.5 bg-[#8A5A3B] text-white rounded-lg text-xs font-semibold hover:bg-[#6E442B]"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

    </div>
  );
};
