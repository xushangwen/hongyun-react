import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'

export default function ContactSection() {
  return (
    <section className="contact">
      <div className="contact-container">
        {/* Left Content */}
        <div className="contact-left">
          <h2 className="contact-title">项目咨询/技术咨询</h2>
          <p className="contact-subtitle">让我们携手合作，为您量身打造混合设备的个性化解决方案。</p>
          <div className="contact-desc">
            <p>我们有义务并乐意随时回答您提出的任何问题</p>
            <p>给您拿出经济、且符合您实际的建议、或方案</p>
          </div>
          <a href="#" className="contact-btn">
            联系我们
            <IconArrowRightOutline24 className="contact-btn-arrow" size={18} />
          </a>
        </div>
        {/* Right Image */}
        <div className="contact-right">
          <img src="/assets/images/contact-right-bgimg.jpg" alt="项目咨询" />
        </div>
      </div>
    </section>
  )
}
