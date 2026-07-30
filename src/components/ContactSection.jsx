import { Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

export default function ContactSection({ content }) {
  const descriptionLines = content?.descriptionLines?.length
    ? content.descriptionLines
    : [
        { text: '我们有义务并乐意随时回答您提出的任何问题' },
        { text: '给您拿出经济、且符合您实际的建议、或方案' },
      ]
  return (
    <section className="contact">
      <div className="contact-container">
        {/* Left Content */}
        <div className="contact-left">
          <h2 className="contact-title">{content?.title || '项目咨询/技术咨询'}</h2>
          <p className="contact-subtitle">{content?.subtitle || '让我们携手合作，为您量身打造混合设备的个性化解决方案。'}</p>
          <div className="contact-desc">
            {descriptionLines.map((item, index) => <p key={item.id || index}>{item.text}</p>)}
          </div>
          <Link to={content?.buttonPath || '/contact'} className="contact-btn">
            {content?.buttonLabel || '联系我们'}
            <IconArrowRightOutline24 className="contact-btn-arrow" size={18} />
          </Link>
        </div>
        {/* Right Image */}
        <div className="contact-right">
          <img src={content?.image?.url || '/assets/images/contact-right-bgimg.webp'} alt={content?.image?.alt || '项目咨询'} />
        </div>
      </div>
    </section>
  )
}
