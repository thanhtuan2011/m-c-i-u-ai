import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { formatDate } from '../utils/formatters';
import { Calendar, Clock, ArrowRight, Search, Sparkles } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { posts, navigateTo } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const publishedPosts = posts.filter(p => p.published);

  const categories = useMemo(() => {
    const cats = new Set(publishedPosts.map(p => p.category));
    return ['all', ...Array.from(cats)];
  }, [publishedPosts]);

  const filteredPosts = useMemo(() => {
    return publishedPosts.filter(p => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.content.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [publishedPosts, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8A5A3B] flex items-center justify-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Góc Mộc Điều</span>
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#252525]">
          Cẩm nang & Câu chuyện hạt điều
        </h1>
        <p className="text-sm sm:text-base text-[#6B645C] leading-relaxed">
          Chia sẻ kiến thức bổ ích về cách bảo quản, nhận biết hạt điều chất lượng và nghệ thuật thưởng thức món quà quý giá từ thiên nhiên.
        </p>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-[#8A5A3B]/15 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center">
        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#8A5A3B] text-white'
                  : 'bg-[#F7F3EA] text-[#252525] hover:bg-[#EFE9DC]'
              }`}
            >
              {cat === 'all' ? 'Tất cả bài viết' : cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6B645C]" />
          <input
            type="text"
            placeholder="Tìm bài viết..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-[#8A5A3B]/20 text-xs focus:outline-none focus:border-[#8A5A3B]"
          />
        </div>
      </div>

      {/* Posts Grid */}
      {filteredPosts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-[#8A5A3B]/20 p-8 space-y-3">
          <p className="font-serif text-lg font-bold text-[#252525]">Không tìm thấy bài viết</p>
          <p className="text-xs text-[#6B645C]">Vui lòng thử tìm kiếm với từ khóa khác.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <article
              key={post.id}
              onClick={() => navigateTo(`/blog/${post.slug}`)}
              className="bg-white rounded-xl overflow-hidden border border-[#8A5A3B]/10 hover:border-[#8A5A3B]/30 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="aspect-16/10 overflow-hidden bg-[#F7F3EA]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-[#6B645C]">
                    <span className="px-2 py-0.5 rounded bg-[#8A5A3B]/10 text-[#8A5A3B] font-medium">
                      {post.category}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                  </div>

                  <h2 className="font-serif text-base sm:text-lg font-bold text-[#252525] group-hover:text-[#8A5A3B] transition-colors line-clamp-2">
                    {post.title}
                  </h2>

                  <p className="text-xs text-[#6B645C] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#8A5A3B]/10 flex items-center text-xs font-semibold text-[#8A5A3B] group-hover:text-[#6E442B]">
                  <span>Đọc toàn bộ bài viết</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

    </div>
  );
};
