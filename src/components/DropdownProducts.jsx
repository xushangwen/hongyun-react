import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IconXmarkOutline24,
  IconChevronRightOutline24,
  IconArrowRightOutline24,
} from 'nucleo-core-outline-24'
import { productCategories, getCategoryProducts } from '../data/productCategories'

export default function DropdownProducts({ active, onClose, cancelClose, scheduleClose }) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = productCategories[activeIdx]

  return (
    <div
      className={`dropdown-menu${active ? ' active' : ''}`}
      id="dropdownProducts"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button className="dropdown-close" aria-label="关闭" onClick={onClose}>
        <IconXmarkOutline24 size={24} aria-hidden={true} />
      </button>

      <div className="dropdown-container">
        {/* 左列：行业分类 */}
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

        {/* 中列：该行业产品列表（动态） */}
        <div className="dropdown-col dropdown-col-middle visible">
          {getCategoryProducts(current).map((product) => (
            <Link
              to={`/products/${current.id}/${product.slug}`}
              key={product.slug}
              className="dropdown-item"
              onClick={onClose}
            >
              <span className="dropdown-item-content">
                <span>{product.name}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </Link>
          ))}
        </div>

        {/* 右列：预览 */}
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
            <img src="/assets/images/hy-dropmenu-product-img.jpg" alt="产品中心" />
          </div>
        </div>
      </div>
    </div>
  )
}
