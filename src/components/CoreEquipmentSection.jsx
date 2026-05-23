import React from 'react'

/**
 * devices: Array<{
 *   name: string
 *   img: string
 *   imgAlt?: string
 *   features?: string[]          // 要点列表
 *   paragraphs?: { title: string, text: string }[]  // 标题+段落
 *   tbd?: string                 // 待补充占位文字
 *   imgStyle?: object            // 单项图片内联样式覆盖（如 maxHeight）
 * }>
 */
export default function CoreEquipmentSection({ devices = [] }) {
  return (
    <section className="page-section">
      <div className="page-container">
        <p className="section-en-label fade-up">Core Equipment</p>
        <h2 className="section-heading section-heading--center fade-up">核心设备</h2>

        <div className="cp-core-section">
          {devices.map((device, i) => (
            <React.Fragment key={i}>
              {i > 0 && <hr className="cp-core-divider" />}
              <div className="cp-core-device-row fade-up fade-up-delay-1">
                <div className="cp-core-device-img-wrap">
                  <img
                    src={device.img}
                    alt={device.imgAlt ?? device.name}
                    className="cp-core-device-img"
                    style={device.imgStyle}
                    loading="lazy"
                  />
                </div>
                <div className="cp-core-device-info">
                  <div className="cp-core-device-badge">
                    <h3 className="cp-core-device-name">{device.name}</h3>
                  </div>
                  <div className="cp-core-device-divider" />

                  {device.features && (
                    <ul className="cp-core-device-features">
                      {device.features.map((f, j) => <li key={j}>{f}</li>)}
                    </ul>
                  )}

                  {device.paragraphs && device.paragraphs.map((p, j) => (
                    <div key={j}>
                      {p.title && <h4 className="cp-core-device-desc-title">{p.title}</h4>}
                      <p className="cp-core-device-desc-para">{p.text}</p>
                    </div>
                  ))}

                  {device.tbd && (
                    <p className="cp-core-device-tbd">{device.tbd}</p>
                  )}
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
