import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IconArrowRightOutline24 } from 'nucleo-core-outline-24'
import { IconCircleMediaPlayFill24 } from 'nucleo-core-fill-24'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ImagePlaceholder from '../components/ImagePlaceholder'

/* ========== 产品数据映射 [AI生成描述] ========== */
const productMap = {
  'new-energy': {
    name: '新能源',
    products: {
      'dual-planetary-mixer': {
        name: '双行星动力混合机',
        intro: '专为锂电池浆料研发的核心搅拌设备，采用行星公转+自转+高速分散三重动力组合，实现高粘度正负极浆料的高效均匀混合。广泛应用于动力电池、储能电池等领域。',
        features: ['行星公转+自转+分散三重动力', '真空脱泡，残留气泡率<0.1%', '变频调速，工艺灵活可调', '液压升降，清洗维护便捷'],
        components: ['搅拌桨叶组', '高速分散盘', '真空密封系统', '液压升降机构'],
        params: [
          { model: 'HY-PDM-300', capacity: '300L', power: '55kW', speed: '0-60rpm / 0-3000rpm', size: '2200×1800×3500mm' },
          { model: 'HY-PDM-500', capacity: '500L', power: '90kW', speed: '0-60rpm / 0-3000rpm', size: '2600×2100×3800mm' },
          { model: 'HY-PDM-1000', capacity: '1000L', power: '160kW', speed: '0-50rpm / 0-2500rpm', size: '3200×2600×4200mm' },
          { model: 'HY-PDM-2000', capacity: '2000L', power: '280kW', speed: '0-40rpm / 0-2000rpm', size: '3800×3200×4800mm' },
        ],
      },
      'high-speed-disperser': { name: '高速分散机', intro: '适用于锂电池浆料预分散及中低粘度物料的高效分散设备，转速高、分散效果好。', features: ['最高转速可达4500rpm', '变频无级调速', '液压升降，换桶方便', '防爆型可选'], components: ['高速分散轴', '分散盘', '变频驱动', '升降机构'], params: [{ model: 'HY-HSD-22', capacity: '200L', power: '22kW', speed: '0-4500rpm', size: '800×600×2200mm' }] },
      'kneader': { name: '捏合机', intro: '针对高粘度物料的强力捏合混炼设备，适用于正极浆料的预混和捏合工序。', features: ['强力捏合，适用超高粘度', 'Σ型/Z型桨叶可选', '液压翻缸出料', '真空操作可选'], components: ['捏合桨叶', '搅拌缸体', '液压翻缸系统', '加热/冷却夹套'], params: [{ model: 'HY-KND-100', capacity: '100L', power: '45kW', speed: '0-80rpm', size: '1800×1200×1600mm' }] },
      'twin-screw-pulper': { name: '双螺杆制浆机', intro: '连续式双螺杆制浆核心设备，实现粉料的连续浸润、分散和输出，是大规模产线的关键装备。', features: ['连续化生产', '螺杆元件模块化组合', '自清洁功能', '产能可扩展'], components: ['双螺杆主机', '减速箱', '喂料口', '出料系统'], params: [{ model: 'HY-TSP-65', capacity: '-', power: '75kW', speed: '0-600rpm', size: '3200×800×1200mm' }] },
    },
  },
  'solid-state-battery': {
    name: '固态电池',
    products: {
      'wet-pd-mixer': { name: '湿法PD搅拌机', intro: '用于固态电池湿法工艺的行星搅拌设备，实现电解质浆料的均匀分散混合。', features: ['行星搅拌+分散双动力', '真空密封操作', '温控精准', '多规格可选'], components: ['搅拌桨叶', '分散盘', '真空系统', '温控夹套'], params: [{ model: 'HY-WPD-100', capacity: '100L', power: '30kW', speed: '0-60rpm / 0-2500rpm', size: '1600×1200×2800mm' }] },
      'dry-electrode-mixer': { name: '干法电极粉体高速混合机', intro: '高速干法混合设备，实现固态电池电极粉体的高效分散与均匀混合。', features: ['高速剪切混合', '干法无溶剂工艺', '混合均匀度>99%', '批次量灵活'], components: ['高速转子', '混合腔体', '出料阀', '控制系统'], params: [{ model: 'HY-DHM-50', capacity: '50L', power: '22kW', speed: '0-6000rpm', size: '1200×800×1800mm' }] },
      'twin-screw-dry-extruder': { name: '双螺杆干法电极连续挤出机', intro: '固态电池干法电极膜片制备的核心设备，通过连续挤出实现无溶剂电极成膜。', features: ['干法连续挤出成膜', '膜厚均匀可控', '无需干燥工序', '能耗低'], components: ['双螺杆主机', '喂料系统', '辊压单元', '测厚系统'], params: [{ model: 'HY-TDE-45', capacity: '-', power: '55kW', speed: '0-400rpm', size: '4200×1200×1600mm' }] },
      'solid-electrolyte-coater': { name: '固态电解质包覆机', intro: '实现固态电解质材料表面精密包覆的专用设备，涂层均匀、附着力强。', features: ['精密包覆工艺', '涂层厚度可控', '连续化生产', '多种工艺可选'], components: ['包覆反应腔', '粉体进料系统', '温控系统', '收集过滤系统'], params: [{ model: 'HY-SEC-20', capacity: '20kg/h', power: '15kW', speed: '-', size: '2400×1200×2000mm' }] },
    },
  },
  'chemical': {
    name: '化工',
    products: {
      'chem-dual-planetary': { name: '双行星动力混合机', intro: '化工行业专用双行星搅拌设备，适用于涂料、胶粘剂等高粘度物料的混合。', features: ['适用超高粘度物料', '真空脱泡', '变频调速', '多容量可选'], components: ['搅拌桨叶', '分散盘', '搅拌缸', '真空系统'], params: [{ model: 'HY-CPD-500', capacity: '500L', power: '75kW', speed: '0-60rpm', size: '2400×2000×3600mm' }] },
      'reciprocating-mixer': { name: '往复式混合搅拌机', intro: '独特的往复运动搅拌方式，适合中低粘度物料的温和混合。', features: ['往复运动搅拌', '低剪切温和混合', '适合热敏物料', '清洗方便'], components: ['往复搅拌臂', '搅拌容器', '驱动系统', '控制面板'], params: [{ model: 'HY-RCM-200', capacity: '200L', power: '15kW', speed: '0-120次/min', size: '1400×1000×2000mm' }] },
      'dual-planetary-stirrer': { name: '双行星混合搅拌机', intro: '经典双行星搅拌结构，适用于中高粘度化工产品的混合搅拌。', features: ['双行星运动轨迹', '无死角搅拌', '刮壁功能', '多桨叶可选'], components: ['行星搅拌桨', '刮壁器', '搅拌缸', '传动系统'], params: [{ model: 'HY-DPS-300', capacity: '300L', power: '45kW', speed: '0-80rpm', size: '2000×1600×3000mm' }] },
      'planetary-butterfly': { name: '行星蝶式混合搅拌机', intro: '行星运动+蝶式桨叶的组合，适用于触变性物料的高效混合。', features: ['蝶式桨叶设计', '适合触变性物料', '分散效果好', '出料方便'], components: ['蝶式桨叶', '搅拌缸', '升降系统', '变频控制'], params: [{ model: 'HY-PBM-500', capacity: '500L', power: '55kW', speed: '0-100rpm', size: '2200×1800×3200mm' }] },
      'vertical-kneader': { name: '立式捏合机', intro: '立式结构捏合设备，适合高粘度物料的强力混炼，出料方便。', features: ['立式结构', '强力捏合', '底部出料', '清洗便捷'], components: ['捏合桨叶', '立式缸体', '底阀出料', '驱动系统'], params: [{ model: 'HY-VKN-100', capacity: '100L', power: '30kW', speed: '0-60rpm', size: '1200×1000×2200mm' }] },
      'press-dumper': { name: '压料机、倾倒机', intro: '辅助出料设备，用于高粘度物料的压出和桶装物料的倾倒。', features: ['液压驱动', '压力可调', '多桶型适配', '安全防护'], components: ['液压缸', '压板/夹具', '安全护栏', '控制系统'], params: [{ model: 'HY-PD-200', capacity: '200L桶', power: '7.5kW', speed: '-', size: '1600×1200×2800mm' }] },
      'barrel-washer': { name: '洗桶机', intro: '专用搅拌桶清洗设备，高压清洗，确保换料无交叉污染。', features: ['高压喷淋清洗', '自动旋转', '多桶型兼容', '废液收集'], components: ['高压喷嘴', '旋转机构', '废液收集槽', 'PLC控制'], params: [{ model: 'HY-BW-01', capacity: '适用200-2000L桶', power: '11kW', speed: '-', size: '2400×2000×2600mm' }] },
      'reactor-tank': { name: '反应釜、储罐', intro: '化工反应及储存用容器，可配置搅拌、加热、冷却等功能。', features: ['多种材质可选', '搅拌/加热/冷却可配', '压力容器资质', '定制化设计'], components: ['釜体/罐体', '搅拌装置', '夹套系统', '安全附件'], params: [{ model: 'HY-RT-1000', capacity: '1000L', power: '按需配置', speed: '按需配置', size: '定制' }] },
      'polymer-dissolving': { name: '高分子材料溶解釜', intro: '专为高分子材料溶解设计的反应釜，配备高效搅拌和精准温控。', features: ['高效溶解搅拌', '精准温控', '真空脱泡', '观察窗可视'], components: ['溶解搅拌桨', '加热夹套', '真空系统', '温度传感器'], params: [{ model: 'HY-PDS-500', capacity: '500L', power: '22kW', speed: '0-200rpm', size: '1800×1400×2800mm' }] },
      'high-pressure-cleaning': { name: '高压清洗成套设备', intro: '工业级高压清洗系统，适用于设备、管道、容器的深度清洗。', features: ['超高压清洗', '自动化控制', '多喷头配置', '节水环保'], components: ['高压泵组', '喷头系统', '废液处理', '控制系统'], params: [{ model: 'HY-HPC-01', capacity: '-', power: '30kW', speed: '-', size: '按需定制' }] },
    },
  },
  'adhesive': { name: '制胶', products: { 'adhesive-core': { name: '制胶核心设备', intro: '真空行星搅拌制胶设备，适用于密封胶、结构胶等高粘度物料。', features: ['真空行星搅拌', '高粘度适用', '自动出料', '温控精准'], components: ['搅拌桨叶', '真空系统', '温控夹套', '出料装置'], params: [{ model: 'HY-ADH-300', capacity: '300L', power: '45kW', speed: '0-60rpm', size: '2000×1600×3200mm' }] } } },
  'pyrotechnics': { name: '火工药剂', products: { 'pyro-kneader': { name: '捏合机', intro: '防爆型捏合机，专为含能材料设计，全封闭远程操控。', features: ['防爆设计', '远程操控', '全密封', '符合军标'], components: ['防爆捏合桨', '密封缸体', '远程控制系统', '安全监控'], params: [{ model: 'HY-PKN-50', capacity: '50L', power: '22kW', speed: '0-40rpm', size: '1600×1200×1400mm' }] } } },
  'food': { name: '食品', products: { 'food-core': { name: '食品级混合设备', intro: '全不锈钢卫生级混合设备，符合食品安全标准。', features: ['SUS316L材质', 'CIP在线清洗', '镜面抛光', '符合FDA/GMP'], components: ['搅拌主机', 'CIP系统', '计量系统', '控制系统'], params: [{ model: 'HY-FMX-200', capacity: '200L', power: '15kW', speed: '0-120rpm', size: '1400×1000×2200mm' }] } } },
  'cosmetics': { name: '化妆品', products: { 'cosmetics-core': { name: '化妆品级混合设备', intro: '真空乳化均质设备，适用于乳液、膏霜等化妆品生产。', features: ['真空乳化', '均质细腻', '温控精准', '卫生设计'], components: ['乳化机', '均质机', '真空系统', '温控系统'], params: [{ model: 'HY-CMX-100', capacity: '100L', power: '22kW', speed: '0-3600rpm', size: '1200×1000×2000mm' }] } } },
  'electronics': { name: '电子材料', products: { 'electronics-core': { name: '电子材料混合设备', intro: '超细研磨分散设备，满足电子级材料纳米级粒径控制要求。', features: ['纳米级研磨', '真空脱泡', '高洁净度', '粒径在线检测'], components: ['纳米研磨机', '脱泡机', '过滤系统', '检测系统'], params: [{ model: 'HY-EMX-50', capacity: '50L', power: '30kW', speed: '0-4000rpm', size: '1600×1200×1800mm' }] } } },
}

export default function ProductDetailPage() {
  const { categoryId, productId } = useParams()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.15 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [categoryId, productId])

  const category = productMap[categoryId]
  const product = category?.products?.[productId]
  const productName = product?.name || '产品详情'
  const categoryName = category?.name || '行业'

  return (
    <>
      <PageHero
        title={productName}
        subtitle={categoryName}
        bgImage="https://images.unsplash.com/photo-1563968743333-044cef800494?auto=format&fit=crop&w=1920&q=80"
      />

      <div className="page-body">
        <div className="page-container">
          <Breadcrumb items={[
            { label: '产品中心', path: '/products' },
            { label: categoryName, path: `/products#products-${categoryId}` },
            { label: productName },
          ]} />
        </div>

        {/* ===== 产品展示 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading">产品展示</h2>
            <div className="product-detail-showcase">
              <ImagePlaceholder height="420px" label={`${productName} 产品展示图`} />
            </div>
          </div>
        </section>

        {/* ===== 产品介绍 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading">产品介绍</h2>
            <div className="detail-intro-grid">
              <div className="detail-intro-text">
                <p>
                  {product?.intro || `${productName}详细介绍内容待补充。`}
                  <span className="generated-tag">AI</span>
                </p>
                {product?.features && (
                  <>
                    <h3 className="detail-subtitle" style={{ marginTop: '24px' }}>产品特点</h3>
                    <div className="detail-features-grid">
                      {product.features.map((feat, i) => (
                        <div className="detail-feature-card" key={i}>
                          <div className="detail-feature-index">{String(i + 1).padStart(2, '0')}</div>
                          <p>{feat}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="detail-intro-image">
                <div className="detail-video-wrapper">
                  <ImagePlaceholder height="320px" label={`${productName} 视频介绍`} />
                  <button className="about-video-play" aria-label="播放视频">
                    <IconCircleMediaPlayFill24 size={36} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 核心部件组成 ===== */}
        {product?.components && (
          <section className="page-section">
            <div className="page-container">
              <h2 className="section-heading">核心部件组成</h2>
              <div className="detail-composition-grid">
                {product.components.map((comp, i) => (
                  <div className="detail-composition-card" key={i}>
                    <ImagePlaceholder height="180px" label={comp} />
                    <span className="detail-composition-name">{comp}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ===== 产品参数 ===== */}
        {product?.params && (
          <section className="page-section page-section--gray">
            <div className="page-container">
              <h2 className="section-heading">产品参数 <span className="generated-tag">AI</span></h2>
              <div className="detail-params-table">
                <table className="params-table">
                  <thead>
                    <tr>
                      <th>型号</th>
                      <th>容量</th>
                      <th>功率</th>
                      <th>转速</th>
                      <th>外形尺寸</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.params.map((row, i) => (
                      <tr key={i}>
                        <td>{row.model}</td>
                        <td>{row.capacity}</td>
                        <td>{row.power}</td>
                        <td>{row.speed}</td>
                        <td>{row.size}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* ===== 联系CTA - 全宽暗色 ===== */}
        <div className="detail-contact-cta">
          <div className="detail-contact-inner">
            <h2 className="detail-contact-title">需要了解更多？</h2>
            <p className="detail-contact-desc">我们的专业团队随时为您提供技术咨询和定制化解决方案，助力您的生产工艺升级。</p>
            <Link to="/contact" className="btn-primary">
              联系我们
              <IconArrowRightOutline24 size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
