import { Link } from 'react-router-dom'
import {
  IconMessageBubbleUserOutline24,
  IconPhoneOutline24,
  IconUsersChatOutline24,
} from 'nucleo-core-outline-24'

const contactItems = [
  {
    icon: IconMessageBubbleUserOutline24,
    title: '技术咨询',
    desc: '专业团队为您提供技术支持',
    link: '/contact?tab=inquiry',
  },
  {
    icon: IconPhoneOutline24,
    title: '联系方式',
    desc: '全国服务热线及公司地址',
    link: '/contact?tab=info',
  },
  {
    icon: IconUsersChatOutline24,
    title: '加入我们',
    desc: '查看招聘岗位，投递简历',
    link: '/contact?tab=join',
  },
]

export default function DropdownContact({ isActive, onMouseEnter, onMouseLeave }) {
  return (
    <div 
      className={`dropdown-contact${isActive ? ' active' : ''}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="dropdown-contact-container">
        <div className="dropdown-contact-grid">
          {contactItems.map((item, i) => (
            <Link
              key={i}
              to={item.link}
              className="dropdown-contact-item"
            >
              <div className="dropdown-contact-icon">
                <item.icon size={24} />
              </div>
              <div className="dropdown-contact-info">
                <h3 className="dropdown-contact-title">{item.title}</h3>
                <p className="dropdown-contact-desc">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
