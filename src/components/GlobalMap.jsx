import { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN

const locations = [
  {
    name: '江苏红运智能装备有限公司',
    role: '集团总部 · 研发中心',
    coordinates: [119.959147, 31.617021],
    color: '#D32F2F',
    index: '01',
  },
  {
    name: '广州红尚机械制造有限公司',
    role: '华南生产基地',
    coordinates: [113.537788, 22.768388], // 广州南沙区东涌镇
    color: '#D32F2F',
    index: '02',
  },
]

export default function GlobalMap() {
  const mapContainer = useRef(null)
  const map = useRef(null)

  useEffect(() => {
    if (map.current) return
    if (!mapContainer.current) return

    console.log('🗺️ GlobalMap: 初始化地图...')
    console.log('Mapbox Token:', mapboxgl.accessToken ? '已配置' : '未配置')

    try {
      // 初始化地图，中心点设置在中国中部
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [113, 30], // 中国中部
        zoom: 4.5,
        pitch: 0,
        bearing: 0,
        attributionControl: false,
      })

      console.log('🗺️ GlobalMap: 地图实例创建成功')

      // 添加导航控件
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')

      // 错误处理
      map.current.on('error', (e) => {
        console.error('🗺️ GlobalMap 错误:', e)
      })

      // 地图加载完成后添加标记
      map.current.on('load', () => {
        console.log('🗺️ GlobalMap: 地图加载完成，添加标记...')
        
        locations.forEach((location) => {
          // 创建自定义标记元素
          const el = document.createElement('div')
          el.className = 'global-map-marker'
          el.innerHTML = `
            <div class="global-map-marker-pin">
              <div class="global-map-marker-dot"></div>
              <div class="global-map-marker-stem"></div>
            </div>
            <div class="global-map-marker-label">${location.index}</div>
          `

          // 创建弹窗
          const popup = new mapboxgl.Popup({
            offset: 25,
            closeButton: false,
            className: 'global-map-popup',
          }).setHTML(`
            <div class="global-map-popup-content">
              <div class="global-map-popup-index">${location.index}</div>
              <h4 class="global-map-popup-name">${location.name}</h4>
              <p class="global-map-popup-role">${location.role}</p>
            </div>
          `)

          // 添加标记到地图
          new mapboxgl.Marker(el)
            .setLngLat(location.coordinates)
            .setPopup(popup)
            .addTo(map.current)
          
          console.log(`🗺️ 已添加标记: ${location.name}`)
        })

        // 添加连接线（可选）
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: locations.map((loc) => loc.coordinates),
            },
          },
        })

        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': '#D32F2F',
            'line-width': 2,
            'line-opacity': 0.3,
            'line-dasharray': [2, 2],
          },
        })
        
        console.log('🗺️ GlobalMap: 所有标记和连接线已添加')
      })
    } catch (error) {
      console.error('🗺️ GlobalMap 初始化失败:', error)
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [])

  return <div ref={mapContainer} className="global-map-container" />
}
