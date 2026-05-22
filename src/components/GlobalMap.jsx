import { useMemo, useState, useRef, useEffect } from 'react'
import { geoEquirectangular, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import worldTopo from 'world-atlas/countries-110m.json'
import { HQ, countries } from '../data/globalPresenceCountries'

const FALLBACK_WIDTH = 1280
const FALLBACK_HEIGHT = 520
const MAP_PADDING_X = 76
const MAP_PADDING_Y = 38

// 过滤南极洲（id 10 / "010"）
const worldFeatures = feature(worldTopo, worldTopo.objects.countries).features
  .filter((f) => f.id !== 10 && String(f.id) !== '010')

const worldFeatureCollection = {
  type: 'FeatureCollection',
  features: worldFeatures,
}

const regionLabelCoords = [
  { label: '北美洲', lng: -95, lat: 47, dy: -16 },
  { label: '南美洲', lng: -62, lat: -18, dy: -12 },
  { label: '欧  洲', lng: 18,  lat: 56, dy: -34 },
  { label: '非  洲', lng: 20,  lat: 5, dy: -10 },
  { label: '亚  洲', lng: 88,  lat: 46, dy: -18 },
  { label: '大洋洲', lng: 135, lat: -25, dy: -12 },
]

function createProjection(width, height) {
  const safeWidth = Math.max(width, 320)
  const safeHeight = Math.max(height, 180)
  const paddingX = Math.min(MAP_PADDING_X, safeWidth * 0.08)
  const paddingY = Math.min(MAP_PADDING_Y, safeHeight * 0.1)

  return geoEquirectangular()
    .rotate([-12, 0])
    .fitExtent(
      [[paddingX, paddingY], [safeWidth - paddingX, safeHeight - paddingY]],
      worldFeatureCollection,
    )
}

function buildArcPath(start, end) {
  if (!start || !end) return ''
  const [x1, y1] = start
  const [x2, y2] = end
  const dist = Math.hypot(x2 - x1, y2 - y1)
  const mx = (x1 + x2) / 2
  const my = (y1 + y2) / 2
  return `M ${x1} ${y1} Q ${mx} ${my - Math.min(dist * 0.28, 120)} ${x2} ${y2}`
}

// HQ 常驻气泡 tooltip（正方形 + 下箭头，单一 path 统一形状）
function HQTooltip({ x, y }) {
  const W = 46   // 正方形边长
  const R = 8    // 圆角
  const AW = 7   // 箭头底边宽
  const AH = 5   // 箭头高度
  const P = 7    // logo 内边距
  const logoVisualOffsetX = 1.4
  // 箭头尖端在 (0,0)，气泡主体向上，整体上移以避开周边标记点
  const offsetY = -22

  // 统一 path：箭头尖 → 箭头右肩 → 盒子底右 → 右上角(圆角) → 右 → 顶右角 → 顶 → 顶左角 → 左 → 底左角 → 盒子底左 → 箭头左肩 → 闭合
  const hw = W / 2
  const top = -(AH + W)
  const bot = -AH
  const d = [
    `M 0 0`,
    `L ${AW / 2} ${bot}`,
    `L ${hw - R} ${bot}`,
    `Q ${hw} ${bot} ${hw} ${bot - R}`,
    `L ${hw} ${top + R}`,
    `Q ${hw} ${top} ${hw - R} ${top}`,
    `L ${-hw + R} ${top}`,
    `Q ${-hw} ${top} ${-hw} ${top + R}`,
    `L ${-hw} ${bot - R}`,
    `Q ${-hw} ${bot} ${-hw + R} ${bot}`,
    `L ${-(AW / 2)} ${bot}`,
    `Z`,
  ].join(' ')

  return (
    <g
      className="hq-tooltip-permanent"
      transform={`translate(${x}, ${y + offsetY})`}
      style={{ pointerEvents: 'none' }}
    >
      {/* 阴影 */}
      <path d={d} fill="rgba(0,0,0,0.18)" transform="translate(1.5, 2)" style={{ filter: 'blur(3px)' }} />
      {/* 气泡主体 */}
      <path d={d} fill="#FFFFFF" />
      {/* Logo */}
      <image
        href="/assets/logo-symbol.svg"
        x={-hw + P + logoVisualOffsetX}
        y={top + P}
        width={W - P * 2}
        height={W - P * 2}
        preserveAspectRatio="xMidYMid meet"
      />
    </g>
  )
}

// 大洲 Tag（常驻），背景加深以提高辨识度
function RegionTag({ x, y, label }) {
  const PX = 16
  const PY = 6
  const FONT_SIZE = 12
  const textW = [...label].reduce((sum, ch) => sum + (ch.trim() ? FONT_SIZE : FONT_SIZE * 0.45), 0)
  const tagW = textW + PX * 2
  const tagH = FONT_SIZE + PY * 2

  return (
    <g className="region-tag" transform={`translate(${x}, ${y})`} style={{ pointerEvents: 'none' }}>
      <rect
        x={-tagW / 2} y={-tagH / 2}
        width={tagW} height={tagH}
        rx={tagH / 2}
        fill="rgba(0,0,0,0.45)"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth={1}
      />
      <text
        x={0} y={0}
        textAnchor="middle"
        dominantBaseline="central"
        fill="rgba(255,255,255,0.95)"
        fontSize={FONT_SIZE}
        fontWeight={600}
        fontFamily="'IBM Plex Sans SC', -apple-system, sans-serif"
        letterSpacing="0.06em"
      >
        {label}
      </text>
    </g>
  )
}

export default function GlobalMap() {
  const [hovered, setHovered] = useState(null)
  const containerRef = useRef(null)
  const [mapSize, setMapSize] = useState({
    width: FALLBACK_WIDTH,
    height: FALLBACK_HEIGHT,
  })
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function syncSize() {
      const rect = container.getBoundingClientRect()
      if (!rect.width || !rect.height) return
      setMapSize((prev) => {
        const width = Math.round(rect.width)
        const height = Math.round(rect.height)
        if (prev.width === width && prev.height === height) return prev
        return { width, height }
      })
    }

    syncSize()

    const ro = new ResizeObserver(syncSize)
    ro.observe(container)
    return () => ro.disconnect()
  }, [])

  const { hqPoint, points, countryPaths, regionLabels } = useMemo(() => {
    const projection = createProjection(mapSize.width, mapSize.height)
    const pathGen = geoPath(projection)
    const hq = projection([HQ.lng, HQ.lat])
    const pts = countries.map((c) => {
      const p = projection([c.lng, c.lat])
      return { ...c, sx: p?.[0], sy: p?.[1], arc: buildArcPath(hq, p) }
    })
    const labels = regionLabelCoords.map((r) => {
      const p = projection([r.lng, r.lat])
      return { ...r, x: p?.[0] ?? 0, y: (p?.[1] ?? 0) + r.dy }
    })
    const paths = worldFeatures.map((f, i) => ({ id: `${f.id ?? 'na'}-${i}`, d: pathGen(f) }))

    return {
      hqPoint: hq,
      points: pts,
      countryPaths: paths,
      regionLabels: labels,
    }
  }, [mapSize.width, mapSize.height])

  const [visibleCount, setVisibleCount] = useState(0)
  useEffect(() => {
    if (!containerRef.current) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && visibleCount === 0) {
          let i = 0
          const timer = setInterval(() => {
            i += 1
            setVisibleCount(i)
            if (i >= points.length) clearInterval(timer)
          }, 90)
          io.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(containerRef.current)
    return () => io.disconnect()
  }, [points.length, visibleCount])

  function handlePointEnter(e, point) {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    setHovered(point)
    setTooltipPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div className="global-map-container" ref={containerRef}>
      <svg
        className="global-map-svg"
        viewBox={`0 0 ${mapSize.width} ${mapSize.height}`}
        preserveAspectRatio="none"
        style={{ overflow: 'hidden' }}
        role="img"
        aria-label="红运机械全球客户分布地图"
      >
        <defs>
          <linearGradient id="hy-arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="16%" stopColor="rgba(255,255,255,0.34)" />
            <stop offset="58%" stopColor="rgba(255,255,255,0.78)" />
            <stop offset="100%" stopColor="rgba(255,214,214,0.18)" />
          </linearGradient>
          <radialGradient id="hy-marker-glow">
            <stop offset="0%" stopColor="rgba(255,255,255,1)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.6)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
          <radialGradient id="hy-hq-spread-glow">
            <stop offset="0%" stopColor="rgba(255,255,255,0.62)" />
            <stop offset="36%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="72%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* 陆地（去南极） */}
        <g className="global-map-land">
          {countryPaths.map((c) => (
            <path
              key={c.id}
              d={c.d}
              fill="rgba(255,255,255,0.18)"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth={0.4}
            />
          ))}
        </g>

        {/* 弧线 */}
        <g className="global-map-arcs">
          {points.map((p, i) => (
            <path
              key={`arc-${p.label}`}
              className="global-map-arc"
              d={p.arc}
              fill="none"
              stroke="url(#hy-arc-gradient)"
              strokeWidth={0.8}
              strokeDasharray="3 6"
              opacity={i < visibleCount ? 0.76 : 0}
              style={{
                transition: 'opacity 600ms ease-out',
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </g>

        {/* 大洲标签 */}
        {regionLabels.map((r) => (
          <RegionTag key={r.label} x={r.x} y={r.y} label={r.label} />
        ))}

        {/* HQ */}
        {hqPoint && (
          <>
            <HQTooltip x={hqPoint[0]} y={hqPoint[1]} />
            <g className="global-map-hq" transform={`translate(${hqPoint[0]}, ${hqPoint[1]})`}>
              <circle r={52} fill="url(#hy-hq-spread-glow)" opacity={0.85} />
              <circle r={28} fill="url(#hy-hq-spread-glow)" opacity={0.9} />
              <circle r={18} fill="url(#hy-marker-glow)" opacity={0.5} />
              <circle r={9} fill="#FFFFFF" />
              <circle r={5} fill="#E71F19" />
              <circle r={9} fill="none" stroke="#FFFFFF" strokeWidth={1.2}>
                <animate attributeName="r" from="9" to="24" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.9" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            </g>
          </>
        )}

        {/* 各国节点 */}
        <g className="global-map-points">
          {points.map((p, i) => {
            if (p.sx == null) return null
            return (
              <g
                key={p.label}
                transform={`translate(${p.sx}, ${p.sy})`}
                style={{ opacity: i < visibleCount ? 1 : 0, transition: 'opacity 400ms ease-out', cursor: 'pointer' }}
                onMouseEnter={(e) => handlePointEnter(e, p)}
                onMouseMove={(e) => handlePointEnter(e, p)}
                onMouseLeave={() => setHovered(null)}
              >
                <circle r={12} fill="url(#hy-marker-glow)" opacity={0.35} />
                <circle r={4.5} fill="#FFFFFF" stroke="#E71F19" strokeWidth={1.4} />
              </g>
            )
          })}
        </g>
      </svg>

      {/* 鼠标 Tooltip */}
      {hovered && (
        <div
          className="global-map-tooltip"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <span className="global-map-tooltip-dot" />
          {hovered.label}
        </div>
      )}
    </div>
  )
}
