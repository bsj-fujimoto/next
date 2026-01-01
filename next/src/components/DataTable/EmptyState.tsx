export default function EmptyState() {
  return (
    <div className="px-6 py-12 text-center">
      <svg className="mx-auto h-12 w-12 text-white/50 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p className="text-white/70 text-sm">検索結果が見つかりませんでした</p>
    </div>
  );
}

