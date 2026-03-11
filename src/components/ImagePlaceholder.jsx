export default function ImagePlaceholder({ width = '100%', height = '200px', label = '图片占位', className = '' }) {
  return (
    <div
      className={`img-placeholder ${className}`}
      style={{ width, height }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <circle cx="8.5" cy="8.5" r="1.5" />
        <path d="M21 15l-5-5L5 21" />
      </svg>
      <span>{label}</span>
    </div>
  )
}
