import { useRef, useState, useCallback } from 'react'
import { IconCircleMediaPlayFill24 } from 'nucleo-core-fill-24'

export default function VideoPlayer({
  src = '/assets/video/promo.webm',
  poster = '/assets/video/promo-poster.webp',
  title = '企业宣传片',
}) {
  const videoRef = useRef(null)
  const [state, setState] = useState({
    playing: false,
    loading: false,
    buffering: false,
    progress: 0,
    duration: 0,
    showCover: true,
  })

  const handlePlay = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    setState((s) => ({ ...s, showCover: false, loading: true }))
    video.play().catch(() => {})
  }, [])

  const handleCanPlay = useCallback(() => {
    setState((s) => ({ ...s, loading: false, buffering: false }))
  }, [])

  const handleWaiting = useCallback(() => {
    setState((s) => ({ ...s, buffering: true }))
  }, [])

  const handlePlaying = useCallback(() => {
    setState((s) => ({ ...s, playing: true, loading: false, buffering: false }))
  }, [])

  const handlePause = useCallback(() => {
    setState((s) => ({ ...s, playing: false }))
  }, [])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !video.duration) return
    setState((s) => ({ ...s, progress: (video.currentTime / video.duration) * 100 }))
  }, [])

  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    setState((s) => ({ ...s, duration: video.duration }))
  }, [])

  const handleEnded = useCallback(() => {
    setState((s) => ({ ...s, playing: false, showCover: true, progress: 0 }))
    if (videoRef.current) videoRef.current.currentTime = 0
  }, [])

  const handleSeek = useCallback((e) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    video.currentTime = ratio * video.duration
  }, [])

  const togglePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  }, [])

  const fmt = (s) => {
    const m = Math.floor(s / 60)
    const sec = Math.floor(s % 60)
    return `${m}:${sec.toString().padStart(2, '0')}`
  }

  const currentTime = videoRef.current ? videoRef.current.currentTime : 0

  return (
    <div className="vp-wrap">
      {/* 封面遮罩 */}
      {state.showCover && (
        <div className="vp-cover" onClick={handlePlay}>
          <img src={poster} alt={title} className="vp-poster" />
          <div className="vp-cover-overlay" />
          <button className="vp-play-btn" aria-label="播放宣传片">
            <IconCircleMediaPlayFill24 size={36} />
          </button>
        </div>
      )}

      {/* 视频元素 */}
      <video
        ref={videoRef}
        className="vp-video"
        src={src}
        poster={poster}
        preload="metadata"
        playsInline
        onCanPlay={handleCanPlay}
        onWaiting={handleWaiting}
        onPlaying={handlePlaying}
        onPause={handlePause}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        onClick={togglePlayPause}
      />

      {/* 加载/缓冲 spinner */}
      {(state.loading || state.buffering) && !state.showCover && (
        <div className="vp-spinner-wrap">
          <div className="vp-spinner" />
        </div>
      )}

      {/* 底部控制栏 */}
      {!state.showCover && (
        <div className="vp-controls">
          <button className="vp-ctrl-btn" onClick={togglePlayPause} aria-label={state.playing ? '暂停' : '播放'}>
            {state.playing ? (
              <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                <rect x="5" y="4" width="4" height="16" rx="1" />
                <rect x="15" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="white" width="18" height="18">
                <path d="M6 4L20 12L6 20V4Z" />
              </svg>
            )}
          </button>

          <span className="vp-time">{fmt(currentTime)}</span>

          <div className="vp-progress" onClick={handleSeek} role="slider" aria-label="播放进度">
            <div className="vp-progress-track">
              <div className="vp-progress-fill" style={{ width: `${state.progress}%` }} />
              <div className="vp-progress-thumb" style={{ left: `${state.progress}%` }} />
            </div>
          </div>

          <span className="vp-time">{fmt(state.duration)}</span>
        </div>
      )}
    </div>
  )
}
