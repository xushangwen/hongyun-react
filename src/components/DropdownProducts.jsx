import { useState, useCallback } from 'react'
import { IconXmarkOutline24 } from 'nucleo-core-outline-24'
import { IconScrollVerticalOutline24 } from 'nucleo-core-outline-24'
import { IconGearNodesOutline24 } from 'nucleo-core-outline-24'
import { IconAiOutline24 } from 'nucleo-core-outline-24'
import { IconChevronRightOutline24 } from 'nucleo-core-outline-24'
import { IconChevronLeftOutline24 } from 'nucleo-core-outline-24'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

const level1Items = [
  { Icon: IconScrollVerticalOutline24, label: '计量输送系统', category: 'metering' },
  { Icon: IconGearNodesOutline24, label: '核心设备', category: 'core' },
  { Icon: IconAiOutline24, label: '集成系统', category: 'integration' },
]

const level2Items = [
  { label: '投料设备', subcategory: 'feeding' },
  { label: '储存设备', subcategory: 'storage' },
  { label: '输送设备', subcategory: 'conveying' },
  { label: '辅助设备', subcategory: 'auxiliary' },
  { label: '过滤设备', subcategory: 'filter' },
]

const level3LeftItems = [
  { label: '投料设备', sub: 'feeding' },
  { label: '储存设备', sub: 'storage' },
  { label: '输送设备', sub: 'conveying' },
  { label: '辅助设备', sub: 'auxiliary' },
  { label: '过滤设备', sub: 'filter' },
]

const level3SubItems = [
  { label: '吨包投料站' },
  { label: '小包投料站' },
  { label: '方形吸粉装置' },
  { label: '圆形吸粉装置' },
]


export default function DropdownProducts({ active, onClose, cancelClose, scheduleClose }) {
  const [level3Active, setLevel3Active] = useState(false)
  const [activeLevel1, setActiveLevel1] = useState(0)
  const [activeLevel3Left, setActiveLevel3Left] = useState(0)
  const [level2Visible, setLevel2Visible] = useState(true)

  const handleClose = useCallback(() => {
    setLevel3Active(false)
    setActiveLevel1(0)
    setActiveLevel3Left(0)
    setLevel2Visible(true)
    onClose()
  }, [onClose])

  const enterLevel3 = useCallback((e) => {
    e.preventDefault()
    setLevel3Active(true)
    setActiveLevel3Left(0)
  }, [])

  const backToLevel2 = useCallback(() => {
    setLevel3Active(false)
  }, [])

  return (
    <div
      className={`dropdown-menu dropdown-products${active ? ' active' : ''}${level3Active ? ' level3-active' : ''}`}
      id="dropdownProducts"
      onMouseEnter={cancelClose}
      onMouseLeave={scheduleClose}
    >
      <button className="dropdown-close" aria-label="关闭" onClick={handleClose}>
        <IconXmarkOutline24 size={24} aria-hidden={true} />
      </button>

      {/* 返回上级按钮 */}
      <div
        className={`dropdown-back${level3Active ? ' visible' : ''}`}
        onClick={backToLevel2}
      >
        <IconChevronLeftOutline24 className="dropdown-back-icon" size={18} />
        <span>返回上级</span>
      </div>

      <div className="dropdown-container">
        {/* 第一级：产品大类 */}
        <div className="dropdown-col dropdown-col-left dropdown-products-level1" id="productsLevel1">
          {level1Items.map((item, index) => (
            <a
              href="#"
              key={item.category}
              className={`dropdown-item${activeLevel1 === index ? ' active' : ''}`}
              data-category={item.category}
              onMouseEnter={() => {
                setActiveLevel1(index)
                setLevel2Visible(true)
              }}
            >
              <span className="dropdown-item-content">
                <item.Icon className="dropdown-icon-svg" size={20} />
                <span>{item.label}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </a>
          ))}
        </div>

        {/* 第二级 */}
        <div
          className={`dropdown-col dropdown-col-middle dropdown-products-level2${level2Visible ? ' visible' : ''}`}
          id="productsLevel2Metering"
          data-parent="metering"
        >
          {level2Items.map((item) => (
            <a
              href="#"
              key={item.subcategory}
              className="dropdown-item"
              data-subcategory={item.subcategory}
              onClick={enterLevel3}
            >
              <span className="dropdown-item-content">
                <span>{item.label}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </a>
          ))}
        </div>

        {/* 第三级左列 */}
        <div
          className={`dropdown-col dropdown-col-left dropdown-products-level3${level3Active ? ' visible' : ''}`}
          id="productsLevel3Feeding"
          data-parent="feeding"
        >
          {level3LeftItems.map((item, index) => (
            <a
              href="#"
              key={item.sub}
              className={`dropdown-item${activeLevel3Left === index ? ' active' : ''}`}
              data-sub={item.sub}
              onMouseEnter={() => setActiveLevel3Left(index)}
            >
              <span className="dropdown-item-content">
                <span>{item.label}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </a>
          ))}
        </div>

        {/* 第三级中间列 */}
        <div
          className={`dropdown-col dropdown-col-middle dropdown-products-level3-sub${level3Active ? ' visible' : ''}`}
          id="productsLevel3FeedingSub"
        >
          {level3SubItems.map((item, index) => (
            <a
              href="#"
              key={item.label}
              className={`dropdown-item${index === 0 ? ' active' : ''}`}
            >
              <span className="dropdown-item-content">
                <span>{item.label}</span>
              </span>
              <span className="dropdown-arrow">
                <IconChevronRightOutline24 size={16} />
              </span>
            </a>
          ))}
        </div>

        {/* Right Column - Preview */}
        <div className="dropdown-col dropdown-col-right">
          <div className="dropdown-preview" id="productsPreview">
            <h3 className="dropdown-preview-title">计量输送系统</h3>
            <p className="dropdown-preview-desc">
              用于粉体、液体等物料的精准计量与高效输送，广泛应用于新能源、化工、食品等行业。系统稳定、精度高，适配多种复杂工艺。
            </p>
            <a href="#" className="dropdown-preview-btn">
              了解更多
              <IconArrowRightOutline24 className="dropdown-preview-btn-icon" size={18} />
            </a>
          </div>
          <div className="dropdown-preview-image">
            <img src="/assets/images/hy-dropmenu-product-img.jpg" alt="计量输送系统" id="productsPreviewImg" />
          </div>
        </div>
      </div>
    </div>
  )
}
