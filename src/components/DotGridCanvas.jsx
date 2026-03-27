import { useEffect, useRef } from 'react'

/**
 * 点阵画布 — 鼠标靠近时点向外散开，离开后弹簧复位
 * 挂在有 position:relative 的父容器内，自动铺满
 */
export default function DotGridCanvas({ dotColor = 'rgba(30,30,30,0.08)', spacing = 14 }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    const mouse = { x: -9999, y: -9999 }
    let dots = []

    /* ── 初始化点阵 ── */
    function init() {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * window.devicePixelRatio
      canvas.height = h * window.devicePixelRatio
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

      dots = []
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          dots.push({ ox: i * spacing, oy: j * spacing, x: i * spacing, y: j * spacing, vx: 0, vy: 0 })
        }
      }
    }

    /* ── 每帧绘制 ── */
    function draw() {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

      for (const d of dots) {
        const dx = d.x - mouse.x
        const dy = d.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const repulseR = 90

        if (dist < repulseR && dist > 0) {
          const force = ((repulseR - dist) / repulseR) ** 2
          d.vx += (dx / dist) * force * 5
          d.vy += (dy / dist) * force * 5
        }

        // 弹簧复位
        d.vx += (d.ox - d.x) * 0.1
        d.vy += (d.oy - d.y) * 0.1
        // 阻尼
        d.vx *= 0.75
        d.vy *= 0.75

        d.x += d.vx
        d.y += d.vy

        ctx.beginPath()
        ctx.arc(d.x, d.y, 1.0, 0, Math.PI * 2)
        ctx.fillStyle = dotColor
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    /* ── 事件：用 section 捕获，避免 pointer-events:none 时拿不到坐标 ── */
    function onMouseMove(e) {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }
    function onMouseLeave() {
      mouse.x = -9999
      mouse.y = -9999
    }

    const section = canvas.closest('section') || canvas.parentElement
    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    window.addEventListener('resize', init)

    init()
    draw()

    return () => {
      cancelAnimationFrame(animId)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('resize', init)
    }
  }, [dotColor, spacing])

  return <canvas ref={canvasRef} className="dot-grid-canvas" aria-hidden="true" />
}
