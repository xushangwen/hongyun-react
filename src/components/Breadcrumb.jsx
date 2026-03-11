import { Link } from 'react-router-dom'
import { IconChevronRightOutline24 } from 'nucleo-core-outline-24'

export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="面包屑导航">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link to="/" className="breadcrumb-link">首页</Link>
        </li>
        {items.map((item, index) => (
          <li className="breadcrumb-item" key={index}>
            <IconChevronRightOutline24 className="breadcrumb-separator" size={14} />
            {item.path ? (
              <Link to={item.path} className="breadcrumb-link">{item.label}</Link>
            ) : (
              <span className="breadcrumb-current">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
