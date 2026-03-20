import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

export default function MapboxMap() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return

    // 公司坐标：江苏红运智能装备有限公司（用户点击获取的准确坐标）
    const lng = 119.959147
    const lat = 31.617021

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11', // 浅灰色地图主题
      center: [lng, lat],
      zoom: 15,
      pitch: 0,
      bearing: 0,
      attributionControl: false,
    })

    // 添加导航控制器
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

    // 添加点击事件获取准确坐标
    map.current.on('click', (e) => {
      const { lng, lat } = e.lngLat
      console.log('========== 点击位置坐标 ==========')
      console.log(`经度: ${lng}`)
      console.log(`纬度: ${lat}`)
      console.log(`完整坐标: ${lng}, ${lat}`)
      console.log('================================')
      
      // 在地图上显示临时标记
      const tempMarker = new mapboxgl.Marker({ color: '#00FF00' })
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div style="padding: 8px; font-family: monospace;">
                <strong>点击位置坐标：</strong><br/>
                经度: ${lng.toFixed(6)}<br/>
                纬度: ${lat.toFixed(6)}
              </div>
            `)
        )
        .addTo(map.current)
        .togglePopup()
      
      // 3秒后自动移除临时标记
      setTimeout(() => tempMarker.remove(), 3000)
    })

    // 创建自定义标记元素 - 使用正圆形，避免旋转
    const el = document.createElement('div')
    el.className = 'custom-marker'
    el.style.cssText = `
      width: 48px;
      height: 48px;
      position: relative;
      cursor: pointer;
    `
    
    // 外圈脉冲效果
    const pulse = document.createElement('div')
    pulse.style.cssText = `
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: rgba(211, 47, 47, 0.3);
      animation: pulse 2s ease-out infinite;
    `
    el.appendChild(pulse)

    // 主圆形标记
    const mainCircle = document.createElement('div')
    mainCircle.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 32px;
      height: 32px;
      background: linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%);
      border-radius: 50%;
      border: 4px solid #fff;
      box-shadow: 0 4px 12px rgba(211, 47, 47, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3);
    `
    el.appendChild(mainCircle)
    
    // 内部圆点
    const dot = document.createElement('div')
    dot.style.cssText = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 10px;
      height: 10px;
      background: #fff;
      border-radius: 50%;
    `
    mainCircle.appendChild(dot)

    // 创建高级 Popup
    const popupHTML = `
      <div style="
        font-family: 'IBM Plex Sans SC', -apple-system, BlinkMacSystemFont, sans-serif;
        padding: 0;
        min-width: 280px;
      ">
        <div style="
          background: linear-gradient(135deg, #D32F2F 0%, #B71C1C 100%);
          padding: 16px 20px;
          margin: -15px -15px 0 -15px;
          border-radius: 12px 12px 0 0;
        ">
          <h3 style="
            margin: 0;
            font-size: 16px;
            font-weight: 600;
            color: #fff;
            letter-spacing: 0.3px;
          ">江苏红运智能装备有限公司</h3>
          <p style="
            margin: 6px 0 0 0;
            font-size: 11px;
            color: rgba(255, 255, 255, 0.85);
            font-weight: 500;
          ">HONGYUN INTELLIGENT EQUIPMENT</p>
        </div>
        <div style="padding: 16px 4px 4px 4px;">
          <div style="
            display: flex;
            align-items: flex-start;
            gap: 10px;
          ">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style="flex-shrink: 0; margin-top: 2px;">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#D32F2F"/>
            </svg>
            <p style="
              margin: 0;
              font-size: 13px;
              line-height: 1.6;
              color: #333;
            ">江苏省常州市武进高新区<br/>南湖西路8-8号</p>
          </div>
        </div>
      </div>
    `

    const popup = new mapboxgl.Popup({
      offset: 30,
      closeButton: true,
      closeOnClick: false,
      maxWidth: '320px',
      className: 'custom-popup',
      anchor: 'bottom'
    }).setHTML(popupHTML)

    // 添加标记 - 禁用拖拽
    const marker = new mapboxgl.Marker({ 
      element: el,
      draggable: false,
      anchor: 'center'
    })
      .setLngLat([lng, lat])
      .setPopup(popup)
      .addTo(map.current)

    // 地图加载完成后自动打开弹窗
    map.current.on('load', () => {
      marker.togglePopup()
    })

    // 清理函数
    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(0.8);
            opacity: 0.8;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.4;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
        
        .custom-popup .mapboxgl-popup-content {
          padding: 15px;
          border-radius: 12px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), 0 2px 8px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #fff;
        }
        
        .custom-popup .mapboxgl-popup-close-button {
          font-size: 20px;
          color: #fff;
          padding: 8px 12px;
          opacity: 0.9;
          transition: opacity 0.2s;
        }
        
        .custom-popup .mapboxgl-popup-close-button:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }
        
        .custom-popup .mapboxgl-popup-tip {
          border-top-color: #D32F2F;
        }
        
        .mapboxgl-ctrl-group {
          background: rgba(255, 255, 255, 0.95) !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          border: 1px solid rgba(0, 0, 0, 0.1) !important;
        }
        
        .mapboxgl-ctrl-group button {
          background: transparent !important;
        }
        
        .mapboxgl-ctrl-group button + button {
          border-top: 1px solid rgba(0, 0, 0, 0.1) !important;
        }
        
        .mapboxgl-ctrl-group button:hover {
          background: rgba(0, 0, 0, 0.05) !important;
        }
      `}</style>
      <div
        ref={mapContainer}
        style={{
          width: '100%',
          height: '400px',
          borderRadius: '8px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 0, 0, 0.1)',
        }}
      />
    </>
  )
}
