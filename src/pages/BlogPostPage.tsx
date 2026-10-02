import React from 'react';
import { useStore } from '../context/StoreContext';
import { formatDate } from '../utils/formatters';
import { Calendar, Clock, ChevronRight, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

export const BlogPostPage: React.FC = () => {
  const { currentPath, posts, getPostBySlug, navigateTo, showToast } = useStore();

  const slug = currentPath.replace('/blog/', '');
  const post = getPostBySlug(slug) || posts[0];

  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold">Không tìm thấy bài viết</h1>
        <button
          onClick={() => navigateTo('/blog')}
          className="px-6 py-2 bg-[#8A5A3B] text-white rounded-lg text-xs font-semibold"
        >
          Quay lại danh sách bài viết
        </button>
      </div>
    );
  }

  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.published)
    .slice(0, 2);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Đã sao chép liên kết bài viết!', 'info');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Breadcrumb */}
      <nav aria-label="Đường dẫn bài viết" className="flex items-center space-x-2 text-xs text-[#6B645C]">
        <button onClick={() => navigateTo('/')} className="hover:text-[#8A5A3B]">
          Trang chủ
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('/blog')} className="hover:text-[#8A5A3B]">
          Góc Mộc Điều
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#252525] font-medium truncate max-w-xs sm:max-w-sm">
          {post.title}
        </span>
      </nav>

      {/* Header Info */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-[#6B645C]">
          <span className="px-2.5 py-1 rounded bg-[#8A5A3B]/10 text-[#8A5A3B] font-semibold">
            {post.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(post.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </span>
          <span>• Tác giả: {post.author}</span>
        </div>

        <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold text-[#252525] leading-tight">
          {post.title}
        </h1>

        <p className="text-sm sm:text-base text-[#6B645C] italic border-l-3 border-[#8A5A3B] pl-4 py-1">
          {post.excerpt}
        </p>
      </div>

      {/* Cover Image */}
      <div className="aspect-16/9 rounded-2xl overflow-hidden shadow-md bg-[#F7F3EA] border border-[#8A5A3B]/15">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post Content */}
      <div className="bg-white rounded-2xl border border-[#8A5A3B]/15 p-6 sm:p-10 shadow-xs">
        <div className="prose max-w-none text-sm sm:text-base leading-relaxed text-[#252525] space-y-5">
          {post.content.split('\n\n').map((paragraph, index) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('# ')) {
              return null; // Heading 1 already displayed
            }
            if (trimmed.startsWith('### ')) {
              return (
                <h3 key={index} className="font-serif text-xl sm:text-2xl font-bold text-[#8A5A3B] pt-4 pb-1">
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('## ')) {
              return (
                <h2 key={index} className="font-serif text-2xl sm:text-3xl font-bold text-[#252525] pt-4 pb-1">
                  {trimmed.replace('## ', '')}
                </h2>
              );
            }
            if (trimmed.startsWith('- ')) {
              const items = trimmed.split('\n').filter(Boolean);
              return (
                <ul key={index} className="list-disc list-inside space-y-1.5 pl-2 text-[#252525]">
                  {items.map((it, i) => (
                    <li key={i}>{it.replace('- ', '')}</li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={index} className="text-[#252525] leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Share & Actions */}
        <div className="mt-10 pt-6 border-t border-[#8A5A3B]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => navigateTo('/blog')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#8A5A3B] hover:text-[#6E442B]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại Góc Mộc Điều</span>
          </button>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F7F3EA] text-xs font-semibold text-[#252525] hover:bg-[#EFE9DC] transition-colors border border-[#8A5A3B]/20"
          >
            <Share2 className="w-3.5 h-3.5 text-[#8A5A3B]" />
            <span>Chia sẻ bài viết</span>
          </button>
        </div>
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="space-y-6 pt-6">
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#252525]">
            Bài viết cùng chủ đề
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map(p => (
              <div
                key={p.id}
                onClick={() => navigateTo(`/blog/${p.slug}`)}
                className="bg-white p-5 rounded-xl border border-[#8A5A3B]/15 hover:border-[#8A5A3B]/30 cursor-pointer shadow-xs transition-all space-y-3 group"
              >
                <div className="aspect-16/9 rounded-lg overflow-hidden bg-[#F7F3EA]">
                  <img src={p.coverImage} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                </div>
                <h3 className="font-serif text-base font-bold text-[#252525] group-hover:text-[#8A5A3B] line-clamp-2">
                  {p.title}
                </h3>
                <p className="text-xs text-[#6B645C] line-clamp-2">{p.excerpt}</p>
                <div className="text-xs font-semibold text-[#8A5A3B] flex items-center gap-1">
                  <span>Đọc tiếp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </article>
  );
};
