import { useState, useEffect, useRef, useCallback } from 'react'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const slides = [
  {
    video: '/assets/videos/01-electric-car- charge.webm',
    title: '30年的混合设备研发及<br>产线集成技术的积累与沉淀',
    desc: '红运为客户研发和定制上料、输送、除尘、排空、计量的个性化解决方案',
  },
  {
    video: '/assets/videos/02-chemical-plant_compressed.webm',
    title: '打造全球一流<br>混动装备制造基地',
    desc: '红运为客户研发和定制上料、输送、除尘、排空、计量的个性化解决方案',
  },
  {
    video: '/assets/videos/03-battery-manufacturing-yard_compressed.webm',
    title: '高效混合<br>助力新能源与智能制造',
    desc: '专注粉体、液体输送与混合设备，服务新能源、化工、食品等行业',
  },
]

const SLIDE_DURATION = 6000

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [textFading, setTextFading] = useState(false)
  const [displayText, setDisplayText] = useState({ title: slides[0].title, desc: slides[0].desc })
  const videoRefs = useRef([])
  const timerRef = useRef(null)
  const progressRef = useRef([])
  const prevIndexRef = useRef(0)

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length)
    }, SLIDE_DURATION)
  }, [])

  // 初始化自动播放
  useEffect(() => {
    if (progressRef.current[0]) {
      progressRef.current[0].classList.add('active')
    }
    resetTimer()
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [resetTimer])

  // 当 currentIndex 变化时处理视频切换、文字动画、进度条
  useEffect(() => {
    if (prevIndexRef.current === currentIndex) return

    // 停止旧视频
    const prevVideo = videoRefs.current[prevIndexRef.current]
    if (prevVideo) {
      prevVideo.pause()
      prevVideo.currentTime = 0
    }

    // 播放新视频
    const newVideo = videoRefs.current[currentIndex]
    if (newVideo) {
      newVideo.play().catch(() => {})
    }

    // 文字淡出 → 更新内容 → 淡入
    setTextFading(true)
    setTimeout(() => {
      setDisplayText({ title: slides[currentIndex].title, desc: slides[currentIndex].desc })
      setTextFading(false)
    }, 400)

    // 重置进度条
    progressRef.current.forEach((bar) => {
      if (bar) {
        bar.classList.remove('active')
        void bar.offsetWidth
      }
    })
    if (progressRef.current[currentIndex]) {
      progressRef.current[currentIndex].classList.add('active')
    }

    prevIndexRef.current = currentIndex
  }, [currentIndex])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => ((prev - 1) + slides.length) % slides.length)
    resetTimer()
  }, [resetTimer])

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length)
    resetTimer()
  }, [resetTimer])

  const handleProgressClick = useCallback((index) => {
    setCurrentIndex(index)
    resetTimer()
  }, [resetTimer])

  return (
    <section className="hero">
      <div className="hero-carousel">
        <div className="hero-slides">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`hero-slide${index === currentIndex ? ' active' : ''}`}
              data-index={index}
            >
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="hero-video"
                autoPlay={index === 0}
                muted
                loop
                playsInline
              >
                <source src={slide.video} type="video/webm" />
              </video>
            </div>
          ))}
        </div>

        <div className="hero-overlay" />

        <div className="hero-content">
          <h1
            className={`hero-title${textFading ? ' fade-out' : ' fade-in'}`}
            dangerouslySetInnerHTML={{ __html: displayText.title }}
          />
          <p className={`hero-desc${textFading ? ' fade-out' : ' fade-in'}`}>
            {displayText.desc}
          </p>
          <a href="#" className="hero-btn">
            进一步探索
            <IconArrowRightOutline24 size={18} />
          </a>
        </div>

        <button className="hero-arrow hero-arrow-prev" aria-label="上一个" onClick={handlePrev}>
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M42.666 56L18.666 32L42.666 8" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
          </svg>
        </button>
        <button className="hero-arrow hero-arrow-next" aria-label="下一个" onClick={handleNext}>
          <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21.334 56L45.334 32L21.334 8" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square" />
          </svg>
        </button>

        <div className="hero-pagination">
          <span className="hero-page-num font-din">
            {String(currentIndex + 1).padStart(2, '0')}
          </span>
          <div className="hero-progress">
            {slides.map((_, index) => (
              <div
                key={index}
                ref={(el) => (progressRef.current[index] = el)}
                className="hero-progress-bar"
                data-index={index}
                onClick={() => handleProgressClick(index)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
