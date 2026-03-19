import { useState, useEffect, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  IconPhoneOutline24,
  IconMapPinOutline24,
  IconEnvelopeContentOutline24,
  IconMessageBubbleUserOutline24,
  IconTimer3Outline24,
  IconUsersShakingHandsOutline24,
  IconArrowRightOutline24,
  IconXmarkOutline24,
  IconCloudUploadOutline24,
  IconCircleCheckOutline24,
} from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import contactHeroImg from '../assets/img/DJI_20250418104522_0160_D 拷贝.jpg'
import brandPanelBg from '../assets/img/CleanShot 2026-03-13 at 12.57.12@2x.png'
import mapImage from '../assets/img/高德地图 - 精准专业的手机地图 拷贝.jpg'

/* ========== 联系方式数据 ========== */
const contactCards = [
  {
    Icon: IconPhoneOutline24,
    title: '全国服务热线',
    items: [
      { label: '全国客服', value: '400 915 3366', isPhone: true },
      { label: '常州总部', value: '0519-86886896', isPhone: true },
      { label: '广州基地', value: '020-34881055', isPhone: true },
    ],
  },
  {
    Icon: IconMapPinOutline24,
    title: '公司地址',
    items: [
      { label: '江苏红运智能装备有限公司', value: '江苏省常州市武进高新区南湖西路8-8号' },
      { label: '广州红尚机械制造有限公司', value: '广州市南沙区东涌镇同裕街40号' },
    ],
  },
  {
    Icon: IconEnvelopeContentOutline24,
    title: '商务邮箱',
    items: [{ label: '商务合作', value: 'hy@gzhy.cn' }],
  },
    {
    Icon: IconTimer3Outline24,
    title: '工作时间',
    items: [
      { label: '周一至周五', value: '08:30 - 17:30' },
      { label: '周末/节假日', value: '技术支持热线照常服务' },
    ],
  },
]

/* ========== 行业选项 ========== */
const industryOptions = [
  '新能源 / 锂电池', '固态电池', '化工 / 涂料', '制胶 / 密封胶',
  '食品', '医药', '化妆品', '电子材料', '其他行业',
]

/* ========== 人才理念 ========== */
const talentValues = [
  {
    index: '01',
    title: '以人为本，尊重个体',
    desc: '员工是企业最宝贵的财富。我们致力于为每一位成员创造公平、尊重的成长环境，倾听每份声音，释放每种个性与创造力。',
    ref: '参考：谷歌"以人为本"文化 / 华为"以客户为中心、以奋斗者为本"',
  },
  {
    index: '02',
    title: '以奋斗者为本',
    desc: '让实干者出彩，让有为者有位。奋斗精神是企业最宝贵的文化资产，我们为勇于担当、积极进取的员工提供充分的发展空间与激励机制。',
    ref: '参考：华为核心价值观',
  },
  {
    index: '03',
    title: '持续学习，共同成长',
    desc: '构建完善的人才培育体系，提供多维度的培训与发展机会，鼓励员工持续学习、勇于创新，与企业同频共振，携手成长。',
    ref: '参考：通用电气 / IBM 学习文化',
  },
  {
    index: '04',
    title: '利他原则，协作共赢',
    desc: '秉承"利他"工作理念，以团队整体利益为先，相互支持、协作共赢，在开放包容的组织氛围中激发每个人的潜能，共同成就更好的红运。',
    ref: '参考：阿里巴巴价值观 / 稻盛和夫利他经营哲学',
  },
]

/* ========== 岗位数据 ========== */
const jobListings = [
  {
    id: 'job-01',
    title: '固态电池工艺工程师',
    dept: '工艺研发部',
    location: '常州',
    type: '全职',
    tag: '核心岗位',
    responsibilities: [
      '负责固态电池制造工艺的研究、开发与优化，包括硫化物系、氧化物系等多种物系',
      '主导固态电解质材料混合、涂布、压制等核心工艺的参数设计与验证',
      '与装备研发团队协同，推进固态电池专用装备的工艺适配与性能提升',
      '建立工艺知识库，撰写技术报告和工艺规程文件',
      '配合客户进行工艺技术支持与现场调试',
    ],
    requirements: [
      '化学工程、材料科学、电化学等相关专业本科及以上学历',
      '具备固态电池或锂电池工艺研发经验者优先，经验3年以上',
      '熟悉干法/湿法电极制备工艺，了解固态电解质特性',
      '具备良好的数据分析能力和实验设计能力（DOE）',
      '有较强的团队协作精神和沟通能力',
    ],
    salary: '面议',
    headcount: '2名',
  },
  {
    id: 'job-02',
    title: '机械设计工程师',
    dept: '产品研发部',
    location: '常州 / 广州',
    type: '全职',
    tag: '急招',
    responsibilities: [
      '负责混合设备、分散设备等高端装备的机械结构设计与开发',
      '使用SolidWorks / CATIA等三维设计软件完成产品零部件及装配设计',
      '配合工艺团队进行方案评审，确保机械结构满足工艺需求',
      '主导关键零部件的选型与供应商技术对接',
      '参与样机制造、测试及技术问题的分析解决',
    ],
    requirements: [
      '机械设计制造及其自动化、机械工程等相关专业本科以上学历',
      '熟练使用SolidWorks、AutoCAD等设计软件，具备GD&T基础知识',
      '具有工业装备行业设计经验3年以上，有大型非标设备设计经验者优先',
      '了解常用金属材料及加工工艺，具备有限元分析基础者优先',
      '工作认真细致，具备良好的文档编写能力',
    ],
    salary: '面议',
    headcount: '3名',
  },
  {
    id: 'job-03',
    title: '电气自动化工程师',
    dept: '工程部',
    location: '常州',
    type: '全职',
    tag: '',
    responsibilities: [
      '负责自动化控制系统的电气方案设计、PLC程序开发及调试',
      '完成电气柜设计、电气图纸绘制（EPLAN）及BOM清单编制',
      '主导设备电气系统的现场安装、调试与验收工作',
      '为客户提供设备操作培训及售后技术支持',
      '持续优化控制程序，提升设备稳定性与运行效率',
    ],
    requirements: [
      '自动化、电气工程及其自动化等相关专业本科以上学历',
      '熟练掌握西门子/三菱/欧姆龙等品牌PLC编程及HMI组态',
      '具备变频器、伺服驱动等电气元件的选型与应用经验',
      '有非标自动化设备电气设计经验2年以上',
      '具备良好的现场工作能力，愿意接受短期出差安排',
    ],
    salary: '面议',
    headcount: '2名',
  },
  {
    id: 'job-04',
    title: '销售工程师（新能源方向）',
    dept: '市场拓展部',
    location: '全国（多地）',
    type: '全职',
    tag: '多名招募',
    responsibilities: [
      '负责新能源（锂电池/固态电池）行业客户的开拓与维护',
      '深入了解客户工艺需求，提供专业的装备解决方案',
      '配合技术团队完成技术交流、方案汇报及项目推进',
      '完成销售目标，及时跟进客户采购流程及合同谈判',
      '定期收集市场信息，反馈竞品动态及客户需求变化',
    ],
    requirements: [
      '化工、材料、机械或相关工科专业本科以上学历',
      '具有工业装备（锂电/新能源方向）销售经验2年以上者优先',
      '具备良好的沟通表达能力和客户关系管理能力',
      '能接受较频繁的出差安排（全国范围）',
      '有责任心，抗压能力强，目标导向明确',
    ],
    salary: '底薪+高提成',
    headcount: '若干',
  },
  {
    id: 'job-05',
    title: '品质工程师',
    dept: '质量管理部',
    location: '广州',
    type: '全职',
    tag: '',
    responsibilities: [
      '负责产品质量过程控制，制定并执行检验标准与规程',
      '开展来料检验、过程巡检和成品检验，出具质量报告',
      '主导质量问题的分析与改善（8D、FMEA、SPC等工具应用）',
      '协助供应商质量评审及不合格品处理',
      '推动ISO 9001质量体系的日常维护与持续改善',
    ],
    requirements: [
      '机械、材料或相关专业本科以上学历',
      '熟悉ISO 9001质量管理体系，持有内审员证书者优先',
      '具备机加工零件/焊接件的检验经验，能熟练使用各类测量工具',
      '有非标设备行业品控经验2年以上者优先',
      '数据分析能力强，工作细心负责',
    ],
    salary: '面议',
    headcount: '1名',
  },
  {
    id: 'job-06',
    title: '采购工程师',
    dept: '采购中心',
    location: '常州',
    type: '全职',
    tag: '',
    responsibilities: [
      '负责机械零部件、电气元件等生产物料的询价、比价及采购',
      '维护并开发供应商资源，建立合格供应商名录',
      '跟进采购订单进度，确保物料按时到货，协调异常处理',
      '参与供应商评审与年度考核，推动供应链降本增效',
      '建立采购数据台账，定期输出采购报表与分析报告',
    ],
    requirements: [
      '机械、工业工程、供应链管理等相关专业本科以上学历',
      '具有机械制造行业采购工作经验2年以上',
      '熟悉机械零部件及电气元件市场，有丰富的供应商资源者优先',
      '熟练使用ERP系统及Office办公软件',
      '具备较强的谈判能力和成本意识',
    ],
    salary: '面议',
    headcount: '1名',
  },
]

/* ========== HR 信息 ========== */
const hrContact = {
  name: '李晓华',
  title: '人力资源负责人',
  phone: '0519-86886896',
  email: 'hr@gzhy.cn',
  wechat: '请致电获取',
  workTime: '周一至周五 09:00 - 17:30',
}

/* ========== 简历上传弹窗 ========== */
const ACCEPT_TYPES = '.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png'
const MAX_SIZE_MB = 10

function ResumeUploadModal({ job, onClose }) {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const validateFile = useCallback((f) => {
    if (!f) return ''
    const ext = f.name.split('.').pop().toLowerCase()
    const allowed = ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'jpg', 'jpeg', 'png']
    if (!allowed.includes(ext)) return '仅支持 PDF / Word / PPT / JPG 格式'
    if (f.size > MAX_SIZE_MB * 1024 * 1024) return `文件大小不超过 ${MAX_SIZE_MB}MB`
    return ''
  }, [])

  const handleFile = useCallback((f) => {
    const err = validateFile(f)
    setError(err)
    if (!err) setFile(f)
  }, [validateFile])

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!file) { setError('请先上传简历文件'); return }
    setSubmitted(true)
  }

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-panel job-modal" role="dialog" aria-modal="true">
        <button className="modal-close-btn" onClick={onClose} aria-label="关闭">
          <IconXmarkOutline24 size={20} />
        </button>

        {/* JD 内容 */}
        <div className="job-modal-content">
          <div className="job-modal-header">
            <div>
              <h2 className="job-modal-title">{job.title}</h2>
              <div className="job-modal-meta">
                <span>{job.dept}</span>
                <span>·</span>
                <span>{job.location}</span>
                <span>·</span>
                <span>{job.type}</span>
                {job.headcount && <><span>·</span><span>招募 {job.headcount}</span></>}
              </div>
            </div>
            <div className="job-modal-salary">{job.salary}</div>
          </div>

          <div className="job-modal-section">
            <h3 className="job-modal-section-title">岗位职责</h3>
            <ul className="job-modal-list">
              {job.responsibilities.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="job-modal-section">
            <h3 className="job-modal-section-title">任职要求</h3>
            <ul className="job-modal-list">
              {job.requirements.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* 分割线 */}
        <div className="job-modal-divider" />

        {/* 简历上传区 */}
        {submitted ? (
          <div className="resume-success">
            <IconCircleCheckOutline24 size={48} className="resume-success-icon" />
            <h3>简历投递成功！</h3>
            <p>感谢您对红运机械的关注，我们的HR团队将在3个工作日内与您联系。</p>
            <button className="btn-primary" onClick={onClose}>
              关闭
            </button>
          </div>
        ) : (
          <form className="resume-upload-area" onSubmit={handleSubmit}>
            <h3 className="resume-upload-title">投递简历 · {job.title}</h3>

            <div
              className={`resume-dropzone${dragOver ? ' dragover' : ''}${file ? ' has-file' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPT_TYPES}
                className="resume-file-input"
                onChange={(e) => handleFile(e.target.files[0])}
              />
              {file ? (
                <>
                  <IconCircleCheckOutline24 size={32} className="resume-dropzone-icon resume-dropzone-icon--ok" />
                  <p className="resume-file-name">{file.name}</p>
                  <span className="resume-file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  <button
                    type="button"
                    className="resume-remove-btn"
                    onClick={(e) => { e.stopPropagation(); setFile(null); setError('') }}
                  >
                    重新选择
                  </button>
                </>
              ) : (
                <>
                  <IconCloudUploadOutline24 size={36} className="resume-dropzone-icon" />
                  <p className="resume-dropzone-text">点击或拖拽文件到此处</p>
                  <span className="resume-dropzone-hint">支持 PDF / Word / PPT / JPG，最大 {MAX_SIZE_MB}MB</span>
                </>
              )}
            </div>

            {error && <p className="resume-error">{error}</p>}

            <div className="resume-upload-actions">
              <button type="button" className="btn-outline" onClick={onClose}>取消</button>
              <button type="submit" className="btn-primary">
                提交简历
                <IconArrowRightOutline24 size={16} />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/* ========== 技术咨询 Tab ========== */
function InquiryTab() {
  const [formData, setFormData] = useState({
    name: '', phone: '', company: '', email: '', industry: '', needs: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="contact-submit-success">
        <IconCircleCheckOutline24 size={56} className="contact-success-icon" />
        <h3>咨询已提交！</h3>
        <p>感谢您的咨询，我们的技术团队将在24小时内与您联系。</p>
        <button className="btn-primary" onClick={() => setSubmitted(false)}>继续咨询</button>
      </div>
    )
  }

  return (
    <div className="contact-form-wrapper">
      <div className="contact-brand-panel" style={{ backgroundImage: `url(${brandPanelBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <p className="contact-brand-tagline">专注混合工艺<br />三十年技术积淀</p>
        <div className="contact-brand-divider" />
        <div className="contact-brand-items">
          <div className="contact-brand-item">
            <span className="contact-brand-item-label">响应时效</span>
            <span className="contact-brand-item-value">24小时内技术团队回复</span>
          </div>
          <div className="contact-brand-item">
            <span className="contact-brand-item-label">服务热线</span>
            <span className="contact-brand-item-value">400 915 3366</span>
          </div>
          <div className="contact-brand-item">
            <span className="contact-brand-item-label">商务邮箱</span>
            <span className="contact-brand-item-value">hy@gzhy.cn</span>
          </div>
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="contact-name">姓名 *</label>
            <input type="text" id="contact-name" name="name" className="contact-form-input" placeholder="您的姓名" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="contact-phone">联系电话 *</label>
            <input type="tel" id="contact-phone" name="phone" className="contact-form-input" placeholder="您的电话号码" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="contact-email">电子邮箱</label>
            <input type="email" id="contact-email" name="email" className="contact-form-input" placeholder="您的邮箱（选填）" value={formData.email} onChange={handleChange} />
          </div>
        </div>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="contact-company">公司名称 *</label>
            <input type="text" id="contact-company" name="company" className="contact-form-input" placeholder="您所在的公司" value={formData.company} onChange={handleChange} required />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="contact-industry">所属行业</label>
            <select id="contact-industry" name="industry" className="contact-form-select" value={formData.industry} onChange={handleChange}>
              <option value="">请选择行业</option>
              {industryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="contact-form-field" />
        </div>
        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-needs">需求描述 *</label>
          <textarea id="contact-needs" name="needs" className="contact-form-textarea" placeholder="请简要描述您的工艺需求、物料类型、产能要求等信息" rows={6} value={formData.needs} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn-primary">
          提交咨询
          <IconArrowRightOutline24 size={18} />
        </button>
      </form>
    </div>
  )
}

/* ========== 联系方式 Tab ========== */
function ContactInfoTab() {
  return (
    <>
      <div className="contact-info-grid">
        {contactCards.map((card, index) => (
          <div className="contact-info-card" key={index}>
            <div className="contact-info-card-icon">
              <card.Icon size={24} />
            </div>
            <h3 className="contact-info-card-title">{card.title}</h3>
            <div className="contact-info-card-items">
              {card.items.map((item, i) => (
                <div className="contact-info-item" key={i}>
                  {item.label && <span className="contact-info-label">{item.label}</span>}
                  <span className="contact-info-value">
                    {item.isPhone
                      ? <a href={`tel:${item.value.replace(/\s/g, '')}`}>{item.value}</a>
                      : item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="contact-map-section">
        <img 
          src={mapImage} 
          alt="公司位置地图" 
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
    </>
  )
}

/* ========== 加入我们 Tab ========== */
function JoinUsTab() {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <>
      {/* 人才理念 */}
      <section className="join-section">
        <h2 className="section-heading">人才理念</h2>
        <p className="section-desc">
          人才是红运机械最核心的竞争优势。我们广纳贤才、培育匠心，以开放包容的文化激发每位员工的无限潜能，共同书写高端装备制造的新篇章。
        </p>
        <div className="talent-values-grid">
          {talentValues.map((item) => (
            <div className="talent-value-card" key={item.index}>
              <span className="talent-value-index">{item.index}</span>
              <h3 className="talent-value-title">{item.title}</h3>
              <p className="talent-value-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 岗位信息 */}
      <section className="join-section join-section--gray">
        <h2 className="section-heading">开放职位</h2>
        <p className="section-desc">加入红运，与顶尖团队共同推动全球高端装备制造的技术革新。</p>
        <div className="job-cards-grid">
          {jobListings.map((job) => (
            <div className="job-card" key={job.id}>
              <h3 className="job-card-title">{job.title}</h3>
              <div className="job-card-meta">
                <span className="job-card-meta-item">{job.dept}</span>
                <span className="job-card-meta-divider">|</span>
                <span className="job-card-meta-item">{job.location}</span>
                <span className="job-card-meta-divider">|</span>
                <span className="job-card-meta-item">薪资：面议</span>
              </div>
              <div className="job-card-footer">
                <button
                  className="btn-primary job-card-apply-btn"
                  onClick={() => setSelectedJob(job)}
                >
                  了解详情
                  <IconArrowRightOutline24 size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* HR 联系信息 */}
      <section className="join-section">
        <h2 className="section-heading">HR 联系方式</h2>
        <p className="section-desc">有意向的候选人可直接联系我们的HR，快速开启您的红运之旅。</p>
        <div className="hr-contact-card">
          <div className="hr-contact-info">
            <h3 className="hr-contact-name">{hrContact.name}</h3>
            <span className="hr-contact-title">{hrContact.title}</span>
            <div className="hr-contact-items">
              <div className="hr-contact-item">
                <IconPhoneOutline24 size={16} />
                <a href={`tel:${hrContact.phone.replace(/-/g, '')}`}>{hrContact.phone}</a>
              </div>
              <div className="hr-contact-item">
                <IconMessageBubbleUserOutline24 size={16} />
                <a href={`mailto:${hrContact.email}`}>{hrContact.email}</a>
              </div>
              <div className="hr-contact-item">
                <IconUsersShakingHandsOutline24 size={16} />
                <span>工作时间：{hrContact.workTime}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 岗位详情弹窗 */}
      {selectedJob && (
        <ResumeUploadModal
          job={selectedJob}
          onClose={() => setSelectedJob(null)}
        />
      )}
    </>
  )
}

/* ========== 子页面 Tab 配置 ========== */
const TABS = [
  { key: 'inquiry', label: '技术咨询' },
  { key: 'info',    label: '联系方式' },
  { key: 'join',    label: '加入我们' },
]

/* ========== 主页面 ========== */
export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'inquiry'

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeTab])

  const currentTab = TABS.find((t) => t.key === activeTab) || TABS[0]

  return (
    <>
      <PageHero
        title="联系我们"
        subtitle="专业团队随时为您提供技术支持与商务咨询"
        bgImage={contactHeroImg}
        bgPosition="center 35%"
      />

      <div className="page-body">
        <Breadcrumb items={[{ label: '联系我们' }, { label: currentTab.label }]} />

        {/* ===== 子页面 Tab 导航 ===== */}
        <div className="contact-tab-nav-wrap">
          <div className="page-container">
            <nav className="contact-tab-nav">
              {TABS.map((tab) => (
                <button
                  key={tab.key}
                  className={`contact-tab-btn${activeTab === tab.key ? ' active' : ''}`}
                  onClick={() => setSearchParams({ tab: tab.key })}
                >
                  {tab.icon && <tab.icon style={{ marginRight: '8px' }} />}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* ===== Tab 内容 ===== */}
        {activeTab === 'join' ? (
          <div className="join-tab-container">
            <div className="page-container">
              <JoinUsTab />
            </div>
          </div>
        ) : (
          <section className="contact-page-section">
            <div className="page-container">
              {activeTab === 'inquiry' && <InquiryTab />}
              {activeTab === 'info' && <ContactInfoTab />}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
