import { Link } from 'react-router-dom'
import { IconEnvelopeOutline24 } from 'nucleo-core-outline-24'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">
          {/* Logo Column */}
          <div className="footer-logo-col">
            <img src="/assets/images/hy-logo-ch-v.svg" alt="红运机械" className="footer-logo" />
          </div>

          {/* Navigation Columns */}
          <div className="footer-nav">
            {/* About Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">关于红运</h4>
              <ul className="footer-links">
                <li><Link to="/about#company-intro">公司简介</Link></li>
                <li><Link to="/about#promo-video">企业宣传片</Link></li>
                <li><Link to="/about#culture">企业文化</Link></li>
                <li><Link to="/about#history">发展历程</Link></li>
                <li><Link to="/about#production">生产实力</Link></li>
                <li><Link to="/about#rnd">研发实力</Link></li>
                <li><Link to="/about#global">全球化布局</Link></li>
                <li><Link to="/about#honors">资质/荣誉</Link></li>
                <li><Link to="/about#partners-page">合作伙伴</Link></li>
              </ul>
            </div>

            {/* Solutions Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">行业解决方案</h4>
              <ul className="footer-links">
                <li><Link to="/solutions#new-energy">新能源</Link></li>
                <li><Link to="/solutions#solid-state-battery">固态电池</Link></li>
                <li><Link to="/solutions#chemical">化工</Link></li>
                <li><Link to="/solutions#adhesive">制胶</Link></li>
                <li><Link to="/solutions#pyrotechnics">火工药剂</Link></li>
                <li><Link to="/solutions#food">食品</Link></li>
                <li><Link to="/solutions#pharma">医药</Link></li>
                <li><Link to="/solutions#cosmetics">化妆品</Link></li>
                <li><Link to="/solutions#electronics">电子材料</Link></li>
              </ul>
            </div>

            {/* Products Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">产品中心</h4>
              <ul className="footer-links">
                <li><Link to="/products#products-new-energy">新能源</Link></li>
                <li><Link to="/products#products-solid-state-battery">固态电池</Link></li>
                <li><Link to="/products#products-chemical">化工</Link></li>
                <li><Link to="/products#products-adhesive">制胶</Link></li>
                <li><Link to="/products#products-pyrotechnics">火工药剂</Link></li>
                <li><Link to="/products#products-food">食品</Link></li>
                <li><Link to="/products#products-cosmetics">化妆品</Link></li>
                <li><Link to="/products#products-electronics">电子材料</Link></li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="footer-col footer-contact">
              <h4 className="footer-col-title">联系我们</h4>
              <p className="footer-hotline-label">全国统一商务热线</p>
              <p className="footer-hotline">400 915 3366</p>
              <a href="mailto:hy@gzhy.cn" className="footer-email">
                <IconEnvelopeOutline24 size={16} aria-hidden={true} />
                <span>hy@gzhy.cn</span>
              </a>
              <div className="footer-social">
                <a href="#" className="social-icon social-wechat" aria-label="微信">
                  <img src="/assets/icons/re/wechat-fill 2.svg" alt="微信" />
                  <div className="wechat-qrcode">
                    <img src="/assets/images/qrcode_HY34881055_1.jpg" alt="微信公众号" />
                    <p>扫一扫关注微信公众号</p>
                  </div>
                </a>
                <a href="#" className="social-icon" aria-label="抖音">
                  <img src="/assets/icons/re/tiktok 2.svg" alt="抖音" />
                </a>
                <a href="#" className="social-icon" aria-label="LinkedIn">
                  <img src="/assets/icons/re/linkedin-box-fill 2.svg" alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="footer-copyright">Copyright © 2025 红运机械 All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">版权声明</a>
            <span className="legal-divider">|</span>
            <a href="#">隐私政策</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
