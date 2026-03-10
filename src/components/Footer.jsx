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
                <li className="level-1">
                  <a href="#">公司介绍</a>
                  <ul className="footer-sublinks">
                    <li><a href="#">简介</a></li>
                    <li><a href="#">企业使命</a></li>
                    <li><a href="#">企业愿景</a></li>
                    <li><a href="#">企业价值观</a></li>
                    <li><a href="#">合作伙伴</a></li>
                  </ul>
                </li>
                <li className="level-1"><a href="#">发展历程</a></li>
                <li className="level-1"><a href="#">荣誉资质</a></li>
                <li className="level-1"><a href="#">联系我们</a></li>
                <li className="level-1"><a href="#">加入我们</a></li>
                <li className="level-1"><a href="#">新闻中心</a></li>
              </ul>
            </div>

            {/* Products Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">产品中心</h4>
              <ul className="footer-links">
                <li><a href="#">计量输送系统</a></li>
                <li><a href="#">核心设备</a></li>
                <li><a href="#">集成系统</a></li>
              </ul>
            </div>

            {/* Solutions Column */}
            <div className="footer-col">
              <h4 className="footer-col-title">解决方案</h4>
              <ul className="footer-links">
                <li><a href="#">新能源行业</a></li>
                <li><a href="#">化工行业</a></li>
                <li><a href="#">制胶行业</a></li>
                <li><a href="#">火工药剂</a></li>
                <li><a href="#">食品行业</a></li>
                <li><a href="#">医药行业</a></li>
                <li><a href="#">化妆品行业</a></li>
                <li><a href="#">电子材料行业</a></li>
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
