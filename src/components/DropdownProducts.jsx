import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IconXmarkOutline24,
  IconChevronRightOutline24,
  IconArrowRightOutline24,
} from 'nucleo-core-outline-24'
import { productCategories } from '../data/productCategories'

/* 每个一级行业对应的预览图：取自"行业解决方案"该行业下第一张卡片图 */
const PREVIEW_IMG = {
  'new-energy': '/assets/images/solutions/pd-pulping/system.webp',
  'solid-state-battery': '/assets/images/solutions/dry-powder-mixer/dry-electrode-system-01.webp',
  'chemical': '/assets/images/solutions/chemical/main-product.webp',
}

export default function DropdownProducts({ active, onClose, cancelClose, scheduleClose }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = productCategories[activeIdx]

  return (
    <div
      className={`dropdown-menu dropdown-menu--two-col${active ? ' active' : ''}`}
      id="dropdownProducts"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button className="dropdown-close" aria-label="关闭" onClick={onClose}>
        <IconXmarkOutline24 size={24} aria-hidden={true} />
      </button>

      <div className="dropdown-container">
        {/* 左列：行业分类（一级，去掉二级产品列表） */}
        <div className="dropdown-col dropdown-col-left">
          {productCategories.map((cat, index) => (
            <Link
              to={`/products/${cat.id}`}
              key={cat.id}
              className={`dropdown-item${activeIdx === index ? ' active' : ''}`}
              onMouseEnter={() => setActiveIdx(index)}
              onClick={onClose}
            >
              <span className="dropdown-item-content">
                <cat.Icon className="dropdown-icon-svg" size={20} />
                <span>{cat.name}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </Link>
          ))}
        </div>

        {/* 右列：预览 — 图随当前 hover 的行业切换 */}
        <div className="dropdown-col dropdown-col-right">
          <div className="dropdown-preview">
            <h3 className="dropdown-preview-title">{current.name}</h3>
            <p className="dropdown-preview-desc">{current.desc}</p>
            <Link to={`/products/${current.id}`} className="dropdown-preview-btn" onClick={onClose}>
              查看全部
              <IconArrowRightOutline24 className="dropdown-preview-btn-icon" size={18} />
            </Link>
          </div>
          <div className="dropdown-preview-image">
            <img
              src={PREVIEW_IMG[current.id] ?? '/assets/images/hy-dropmenu-product-img.webp'}
              alt={current.name}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
