import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
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
  IconUserHeartOutline24,
  IconBooksOutline24,
  IconHandshakeOutline24,
} from 'nucleo-core-outline-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'
import MapboxMap from '../components/MapboxMap'
import contactHeroImg from '../assets/img/DJI_20250418104522_0160_D-copy.webp'
import brandPanelBg from '../assets/img/IMG_4784.webp'
import inquiryBrandPanelBg from '../assets/img/CleanShot 2026-03-13 at 12.57.12@2x.webp'
import talentBg01 from '../assets/img/talent-value-01.webp'
import talentBg02 from '../assets/img/talent-value-02.webp'
import talentBg03 from '../assets/img/talent-value-03.webp'
import { submitInquiry, submitResume } from '../services/formsApi'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { useCmsDetail } from '../context/useCmsDetail'

/* ========== 联系方式数据 ========== */
const contactCards = [
  {
    Icon: IconPhoneOutline24,
    title: '服务热线',
    items: [
      { label: '全国客服', value: '400 915 3366', isPhone: true },
      { label: '常州基地', value: '0519-86886896', isPhone: true },
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
  '新能源行业 / 锂电池', '固态电池', '化工行业 / 涂料', '制胶 / 密封胶',
  '食品', '医药', '化妆品', '电子材料', '其他行业',
]

/* ========== 人才理念 ========== */
const talentValues = [
  {
    Icon: IconUserHeartOutline24,
    title: '以人为本，尊重个体',
    desc: '员工是企业最宝贵的财富。我们致力于为每一位成员创造公平、尊重的成长环境，倾听每份声音，释放每种个性与创造力。',
    bg: talentBg01,
  },
  {
    Icon: IconBooksOutline24,
    title: '持续学习，共同成长',
    desc: '构建完善的人才培育体系，提供多维度的培训与发展机会，鼓励员工持续学习、勇于创新，与企业同频共振，携手成长。',
    bg: talentBg02,
  },
  {
    Icon: IconHandshakeOutline24,
    title: '利他原则，协作共赢',
    desc: '秉承"利他"工作理念，以团队整体利益为先，相互支持、协作共赢，在开放包容的组织氛围中激发每个人的潜能，共同成就更好的红运。',
    bg: talentBg03,
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
  email: 'recruit@gzhy.cn',
}

const contactIconByKey = {
  phone: IconPhoneOutline24,
  address: IconMapPinOutline24,
  email: IconEnvelopeContentOutline24,
  time: IconTimer3Outline24,
}

const talentIconByKey = {
  people: IconUserHeartOutline24,
  learning: IconBooksOutline24,
  collaboration: IconHandshakeOutline24,
}

const fallbackOffices = [
  {
    label: '常州基地',
    name: '江苏红运智能装备有限公司',
    address: '江苏省常州市武进高新区<br/>南湖西路8-8号',
    longitude: 119.959147,
    latitude: 31.617021,
  },
  {
    label: '广州基地',
    name: '广州红尚机械制造有限公司',
    address: '广州市南沙区东涌镇<br/>同裕街40号',
    longitude: 113.449059,
    latitude: 22.843914,
  },
]

const fallbackInquiryPanel = {
  tagline: '专注混合工艺\n三十年技术积淀',
  background: inquiryBrandPanelBg,
  items: [
    { label: '响应时效', value: '24小时内技术团队回复' },
    { label: '服务热线', value: '400 915 3366' },
    { label: '商务邮箱', value: 'hy@gzhy.cn' },
  ],
}

const fallbackRecruitmentPanel = {
  tagline: '加入红运\n共创装备制造未来',
  background: brandPanelBg,
  items: [
    { label: '招聘邮箱', value: hrContact.email },
    { label: '响应时效', value: '3 个工作日内回复' },
    { label: '工作时间', value: '周一至周五 09:00 – 17:30' },
  ],
}

function RichTextChildren({ children = [] }) {
  return children.map((node, index) => {
    const key = `${node.type || 'text'}-${index}`
    if (node.type === 'link') {
      return (
        <a key={key} href={node.url} target={node.url?.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          <RichTextChildren children={node.children} />
        </a>
      )
    }
    if (node.type !== 'text') {
      return <RichTextChildren key={key} children={node.children} />
    }

    let content = node.text
    if (node.code) content = <code>{content}</code>
    if (node.bold) content = <strong>{content}</strong>
    if (node.italic) content = <em>{content}</em>
    if (node.underline) content = <u>{content}</u>
    if (node.strikethrough) content = <s>{content}</s>
    return <span key={key}>{content}</span>
  })
}

function JobRichText({ value }) {
  if (!Array.isArray(value) || value.length === 0) return null
  if (typeof value[0] === 'string') {
    return (
      <ul className="job-modal-list">
        {value.map((item) => <li key={item}>{item}</li>)}
      </ul>
    )
  }

  const renderBlock = (block, index) => {
    const key = `${block.type}-${index}`
    if (block.type === 'list') {
      const List = block.format === 'ordered' ? 'ol' : 'ul'
      return (
        <List className="job-modal-rich-list" key={key}>
          {(block.children || []).map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`}>
              <RichTextChildren children={item.children} />
            </li>
          ))}
        </List>
      )
    }
    if (block.type === 'heading') {
      const level = Math.min(Math.max(Number(block.level) || 4, 4), 6)
      const Heading = `h${level}`
      return <Heading key={key}><RichTextChildren children={block.children} /></Heading>
    }
    if (block.type === 'quote') {
      return <blockquote key={key}><RichTextChildren children={block.children} /></blockquote>
    }
    return <p key={key}><RichTextChildren children={block.children} /></p>
  }

  return <div className="job-modal-richtext">{value.map(renderBlock)}</div>
}

function useContactContent() {
  const { detail } = useCmsDetail()

  return useMemo(() => {
    const remoteJobs = detail?.jobListings?.map((job) => ({
      id: job.legacyKey,
      title: job.title,
      dept: job.department,
      location: job.location,
      type: job.employmentType,
      tag: job.tag,
      responsibilities: job.responsibilities || [],
      requirements: job.requirements || [],
      salary: job.salary,
      headcount: job.headcount,
    }))
    const remoteCards = detail?.contactCards?.map((card) => ({
      ...card,
      Icon: contactIconByKey[card.iconKey] || IconMessageBubbleUserOutline24,
      items: (card.items || []).map((item) => ({
        ...item,
        isPhone: item.valueType === 'phone',
        isEmail: item.valueType === 'email',
      })),
    }))
    const remoteTalentValues = detail?.talentValues?.map((item) => ({
      Icon: talentIconByKey[item.iconKey] || IconUserHeartOutline24,
      title: item.title,
      desc: item.description,
      bg: item.image?.url,
    }))
    const panel = (remote, fallback) => ({
      tagline: remote?.tagline || fallback.tagline,
      background: remote?.background?.url || fallback.background,
      items: remote?.items?.length ? remote.items : fallback.items,
    })

    return {
      title: detail?.title || '联系我们',
      subtitle: detail?.hero?.subtitle || '专业团队随时为您提供技术支持与商务咨询',
      heroImage: detail?.hero?.desktopMedia?.url || contactHeroImg,
      heroPosition: detail?.hero?.imagePosition === 'top'
        ? 'center top'
        : detail?.hero?.imagePosition === 'bottom'
          ? 'center bottom'
          : 'center 35%',
      tabs: [
        { key: 'inquiry', label: detail?.inquiryTabLabel || '技术咨询' },
        { key: 'join', label: detail?.joinTabLabel || '加入我们' },
        { key: 'info', label: detail?.infoTabLabel || '联系方式' },
      ],
      inquiryPanel: panel(detail?.inquiryPanel, fallbackInquiryPanel),
      recruitmentPanel: panel(detail?.recruitmentPanel, fallbackRecruitmentPanel),
      industryOptions: detail?.industryOptions?.length
        ? detail.industryOptions.map((item) => item.label || item.value).filter(Boolean)
        : industryOptions,
      contactCards: remoteCards?.length ? remoteCards : contactCards,
      offices: detail?.offices?.length ? detail.offices : fallbackOffices,
      talentTitle: detail?.talentTitle || '人才理念',
      talentDescription: detail?.talentDescription || '人才是红运机械最核心的竞争优势。我们广纳贤才、培育匠心，以开放包容的文化激发每位员工的无限潜能，共同书写高端装备制造的新篇章。',
      talentValues: remoteTalentValues?.length ? remoteTalentValues : talentValues,
      jobsTitle: detail?.jobsTitle || '开放职位',
      jobsDescription: detail?.jobsDescription || '加入红运，与顶尖团队共同推动全球高端装备制造的技术革新。',
      jobListings: remoteJobs?.length ? remoteJobs : jobListings,
      resumeTitle: detail?.resumeTitle || '简历投递',
      resumeDescription: detail?.resumeDescription || '填写以下信息直接提交您的申请，HR 团队将在 3 个工作日内与您联系。',
    }
  }, [detail])
}

/* ========== 简历上传弹窗 ========== */
const ACCEPT_TYPES = '.pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png'
const MAX_SIZE_MB = 10

function ResumeUploadModal({ job, onClose }) {
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)
  const modalRef = useRef(null)
  useFocusTrap(modalRef, true)

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    if (!file) { setError('请先上传简历文件'); return }
    setSubmitting(true)
    setError('')
    try {
      await submitResume({ file, position: job.title })
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const onKeyDown = (e) => { if (e.key === 'Escape') onClose() }
    const previousBodyOverflow = document.body.style.overflow
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousBodyOverflow
    }
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div ref={modalRef} className="modal-panel job-modal" role="dialog" aria-modal="true" aria-labelledby="job-modal-title">
        <button className="modal-close-btn" onClick={onClose} aria-label="关闭">
          <IconXmarkOutline24 size={20} />
        </button>

        {/* JD 内容 */}
        <div className="job-modal-content">
          <div className="job-modal-header">
            <div>
              <h2 className="job-modal-title" id="job-modal-title">{job.title}</h2>
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
            <JobRichText value={job.responsibilities} />
          </div>

          <div className="job-modal-section">
            <h3 className="job-modal-section-title">任职要求</h3>
            <JobRichText value={job.requirements} />
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
              <button type="submit" className="btn-primary" disabled={submitting}>
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

/* ========== 简历投递模块 ========== */
function ResumeSubmitSection({ jobs, panel }) {
  const [formData, setFormData] = useState({ name: '', phone: '', position: '', email: '' })
  const [file, setFile] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

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

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    if (!file) { setError('请先上传简历文件'); return }
    setSubmitting(true)
    setError('')
    try {
      await submitResume({ file, ...formData })
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="contact-submit-success">
        <IconCircleCheckOutline24 size={56} className="contact-success-icon" />
        <h3>简历投递成功！</h3>
        <p>感谢您对红运机械的关注，我们的 HR 团队将在 3 个工作日内与您联系。</p>
        <button className="btn-primary" onClick={() => setSubmitted(false)}>继续投递</button>
      </div>
    )
  }

  return (
    <div className="contact-form-wrapper">
      <div className="contact-brand-panel" style={{ backgroundImage: `url(${panel.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <p className="contact-brand-tagline" style={{ whiteSpace: 'pre-line' }}>{panel.tagline}</p>
        <div className="contact-brand-divider" />
        <div className="contact-brand-items">
          {panel.items.map((item) => (
            <div className="contact-brand-item" key={`${item.label}-${item.value}`}>
              <span className="contact-brand-item-label">{item.label}</span>
              <span className="contact-brand-item-value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="apply-name">应聘者姓名 *</label>
            <input type="text" id="apply-name" name="name" className="contact-form-input" placeholder="您的姓名" value={formData.name} onChange={handleChange} required />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="apply-phone">联系电话 *</label>
            <input type="tel" id="apply-phone" name="phone" className="contact-form-input" placeholder="您的手机号码" value={formData.phone} onChange={handleChange} required />
          </div>
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="apply-email">电子邮箱</label>
            <input type="email" id="apply-email" name="email" className="contact-form-input" placeholder="您的邮箱（选填）" value={formData.email} onChange={handleChange} />
          </div>
        </div>
        <div className="contact-form-row">
          <div className="contact-form-field">
            <label className="contact-form-label" htmlFor="apply-position">应聘岗位 *</label>
            <select id="apply-position" name="position" className="contact-form-select" value={formData.position} onChange={handleChange} required>
              <option value="">请选择岗位</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.title}>{job.title}</option>
              ))}
              <option value="其他岗位">其他岗位（请在简历中说明）</option>
            </select>
          </div>
          <div className="contact-form-field" />
          <div className="contact-form-field" />
        </div>
        <div className="contact-form-field">
          <label className="contact-form-label">上传简历 *</label>
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
            <input ref={inputRef} type="file" accept={ACCEPT_TYPES} className="resume-file-input" onChange={(e) => handleFile(e.target.files[0])} />
            {file ? (
              <>
                <IconCircleCheckOutline24 size={32} className="resume-dropzone-icon resume-dropzone-icon--ok" />
                <p className="resume-file-name">{file.name}</p>
                <span className="resume-file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                <button type="button" className="resume-remove-btn" onClick={(e) => { e.stopPropagation(); setFile(null); setError('') }}>重新选择</button>
              </>
            ) : (
              <>
                <IconCloudUploadOutline24 size={36} className="resume-dropzone-icon" />
                <p className="resume-dropzone-text">点击或拖拽简历到此处</p>
                <span className="resume-dropzone-hint">支持 PDF / Word / PPT / JPG，最大 {MAX_SIZE_MB}MB</span>
              </>
            )}
          </div>
        </div>
        {error && <p className="resume-error">{error}</p>}
        <button type="submit" className="btn-primary" disabled={submitting}>
          提交申请
          <IconArrowRightOutline24 size={18} />
        </button>
      </form>
    </div>
  )
}

/* ========== 技术咨询 Tab ========== */
function InquiryTab({ options, panel }) {
  const [formData, setFormData] = useState({
    name: '', phone: '', company: '', email: '', industry: '', needs: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (submitting) return
    setSubmitting(true)
    setError('')
    try {
      await submitInquiry(formData, 'contact-page')
      setSubmitted(true)
    } catch (submitError) {
      setError(submitError.message)
    } finally {
      setSubmitting(false)
    }
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
      <div className="contact-brand-panel" style={{ backgroundImage: `url(${panel.background})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <p className="contact-brand-tagline" style={{ whiteSpace: 'pre-line' }}>{panel.tagline}</p>
        <div className="contact-brand-divider" />
        <div className="contact-brand-items">
          {panel.items.map((item) => (
            <div className="contact-brand-item" key={`${item.label}-${item.value}`}>
              <span className="contact-brand-item-label">{item.label}</span>
              <span className="contact-brand-item-value">{item.value}</span>
            </div>
          ))}
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
              {options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
            </select>
          </div>
          <div className="contact-form-field" />
        </div>
        <div className="contact-form-field">
          <label className="contact-form-label" htmlFor="contact-needs">需求描述 *</label>
          <textarea id="contact-needs" name="needs" className="contact-form-textarea" placeholder="请简要描述您的工艺需求、物料类型、产能要求等信息" rows={6} value={formData.needs} onChange={handleChange} required />
        </div>
        {error && <p className="resume-error" role="alert">{error}</p>}
        <button type="submit" className="btn-primary" disabled={submitting}>
          提交咨询
          <IconArrowRightOutline24 size={18} />
        </button>
      </form>
    </div>
  )
}

/* ========== 联系方式 Tab ========== */
function ContactInfoTab({ cards, offices }) {
  return (
    <>
      <div className="contact-info-grid">
        {cards.map((card, index) => (
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
                      : item.isEmail
                        ? <a href={`mailto:${item.value}`}>{item.value}</a>
                        : item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="contact-map-section">
        <div className="contact-map-grid">
          {offices.map((office) => (
            <div className="contact-map-card" key={office.label}>
              <div className="contact-map-card-label">{office.label}</div>
              <MapboxMap
                lng={Number(office.longitude)}
                lat={Number(office.latitude)}
                name={office.name}
                address={office.address}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

/* ========== 加入我们 Tab ========== */
function JoinUsTab({ content }) {
  const [selectedJob, setSelectedJob] = useState(null)

  return (
    <>
      {/* 人才理念 */}
      <section className="join-section">
        <h2 className="section-heading">{content.talentTitle}</h2>
        <p className="section-desc">{content.talentDescription}</p>
        <div className="talent-values-grid">
          {content.talentValues.map((item) => (
            <div
              className="talent-value-card"
              key={item.title}
              style={{ '--talent-bg': `url(${item.bg})` }}
            >
              <div className="talent-value-icon">
                <item.Icon size={24} />
              </div>
              <h3 className="talent-value-title">{item.title}</h3>
              <p className="talent-value-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 岗位信息 */}
      <section className="join-section join-section--gray">
        <h2 className="section-heading">{content.jobsTitle}</h2>
        <p className="section-desc">{content.jobsDescription}</p>
        <div className="job-cards-grid">
          {content.jobListings.map((job) => (
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

      {/* 简历投递 */}
      <section className="join-section resume-submit-section">
        <h2 className="section-heading">{content.resumeTitle}</h2>
        <p className="section-desc">{content.resumeDescription}</p>
        <ResumeSubmitSection jobs={content.jobListings} panel={content.recruitmentPanel} />
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

/* ========== 主页面 ========== */
export default function ContactPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get('tab') || 'inquiry'
  const content = useContactContent()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [activeTab])

  const currentTab = content.tabs.find((t) => t.key === activeTab) || content.tabs[0]

  return (
    <>
      <PageHero
        title={content.title}
        subtitle={content.subtitle}
        bgImage={content.heroImage}
        bgPosition={content.heroPosition}
      />

      <div className="page-body">
        <Breadcrumb items={[{ label: content.title }, { label: currentTab.label }]} />

        {/* ===== 子页面 Tab 导航 ===== */}
        <div className="contact-tab-nav-wrap">
          <div className="page-container">
            <nav className="contact-tab-nav">
              {content.tabs.map((tab) => (
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
              <JoinUsTab content={content} />
            </div>
          </div>
        ) : (
          <section className="contact-page-section">
            <div className="page-container">
              {activeTab === 'inquiry' && <InquiryTab options={content.industryOptions} panel={content.inquiryPanel} />}
              {activeTab === 'info' && <ContactInfoTab cards={content.contactCards} offices={content.offices} />}
            </div>
          </section>
        )}
      </div>
    </>
  )
}
