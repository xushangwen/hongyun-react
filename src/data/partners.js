/*
 * 红运合作伙伴 — 5 个行业的客户 Logo 单一来源
 * 同时被首页 PartnersSection（滚动条）和 About 页 partnerGroups（grid）消费
 *
 * 每条记录字段：
 *   - logo:     图片路径（绝对路径，public/assets/...）
 *   - textOnly: true 时表示无 Logo 文件，用文字占位
 *   - name:     客户名称（用于副标签、文字占位、alt）
 *   - alt:      图片 alt（缺省时回落到 name）
 */

const P = '/assets/images/partner'
const C = `${P}/clients`

// 新能源（含客户提供的 50强汇总）
const newEnergy = [
  { logo: `${C}/ne-catl.svg`,        name: '宁德时代', alt: '宁德时代' },
  { logo: `${C}/ne-byd.svg`,         name: '比亚迪', alt: '比亚迪' },
  { logo: `${C}/ne-calb.svg`,        name: '中创新航', alt: '中创新航' },
  { logo: `${C}/ne-eve.webp`,        name: '亿纬锂能', alt: '亿纬锂能' },
  { logo: `${C}/ne-sunwoda.webp`,    name: '欣旺达', alt: '欣旺达' },
  { logo: `${C}/ne-svolt.webp`,      name: '蜂巢能源', alt: '蜂巢能源' },
  { logo: `${C}/ne-rept.svg`,        name: '瑞浦兰钧', alt: '瑞浦兰钧' },
  { logo: `${C}/ne-lg.svg`,          name: 'LG 新能源', alt: 'LG 新能源' },
  { logo: `${C}/ne-ibt.svg`,         name: '因湃电池 IBT', alt: '因湃电池' },
  { logo: `${C}/ne-cornex.svg`,      name: '楚能 cornex', alt: '楚能' },
  { logo: `${C}/ne-farasis.webp`,    name: '孚能科技', alt: '孚能科技' },
  { logo: `${C}/ne-dfd.svg`,         name: '多氟多 DFD', alt: '多氟多' },
  { logo: `${C}/ne-desay.svg`,       name: '德赛电池 DESAY', alt: '德赛电池' },
  { logo: `${C}/ne-cosmx.svg`,       name: '冠宇 COSMX', alt: '冠宇' },
  { logo: `${C}/ne-pylon.svg`,       name: '派能科技', alt: '派能科技' },
  { logo: `${C}/ne-ampace.svg`,      name: 'Ampace 新能安', alt: '新能安' },
  { logo: `${P}/par-logo-11.svg`,    name: '远景动力', alt: '远景动力' },
  { logo: `${C}/ne-hithium.webp`,    name: '海辰储能 HTHIUM', alt: '海辰储能' },
  { logo: `${C}/ne-ganfeng.webp`,    name: '赣锋锂电', alt: '赣锋锂电' },
  { logo: `${C}/ne-sungrow.svg`,     name: '阳光电源 SUNGROW', alt: '阳光电源' },
  { logo: `${C}/ne-hyperstrong.svg`, name: '海博思创', alt: '海博思创' },
  { logo: `${C}/ne-crrc.svg`,        name: '中车株洲电力机车', alt: '中车' },
  { logo: `${C}/ne-huawei.svg`,      name: 'HUAWEI', alt: '华为' },
  { logo: `${C}/ne-shoto.svg`,       name: '双登集团', alt: '双登集团' },
  { logo: `${C}/ne-nio.svg`,         name: '蔚来能源', alt: '蔚来能源' },
  { logo: `${C}/ne-hina.svg`,        name: '中科海钠 HiNa', alt: '中科海钠' },
  { logo: `${C}/ne-tianneng.svg`,    name: '天能股份', alt: '天能股份' },
  { logo: `${C}/ne-welion.svg`,      name: '卫蓝新能源', alt: '卫蓝新能源' },
  { logo: `${C}/ne-qingtao.svg`,     name: '清陶能源', alt: '清陶能源' },
  { logo: `${C}/ne-juwan.svg`,       name: '巨湾技研', alt: '巨湾技研' },
  { logo: `${C}/ne-atl.svg`,         name: 'ATL 新能源科技', alt: 'ATL' },
  { logo: `${C}/ne-zqxn.svg`,        name: '中汽新能', alt: '中汽新能' },
]

// 化工
const chemical = [
  { logo: `${P}/par-logo-02.svg`,   name: 'BASF 巴斯夫', alt: '巴斯夫' },
  { logo: `${P}/par-logo-04.svg`,   name: '陶氏化学', alt: '陶氏化学' },
  { logo: `${P}/par-logo-05.svg`,   name: '万华化学', alt: '万华化学' },
  { logo: `${P}/par-logo-06.svg`,   name: '汉高 Henkel', alt: '汉高' },
  { logo: `${P}/par-logo-01.svg`,   name: '埃肯 Elkem', alt: '埃肯' },
  { logo: `${C}/ad-honeywell.svg`,  name: '美国霍尼韦尔', alt: '霍尼韦尔' },
]

// 胶粘剂
const adhesive = [
  { logo: `${C}/ad-sika.svg`,       name: '西卡 Sika', alt: '西卡' },
  { logo: `${P}/par-logo-07.svg`,   name: '富乐 / 科梅林', alt: '富乐' },
  { logo: `${C}/ad-darbond.webp`,    name: '回天新材 Darbond', alt: '回天新材' },
  { logo: `${C}/ad-itw.webp`,        name: 'ITW', alt: 'ITW' },
  { logo: `${C}/ad-johnson.webp`,    name: 'Johnson Electric', alt: 'Johnson' },
  { logo: `${C}/ad-pochely.webp`,    name: '回天股份', alt: '回天' },
  { logo: `${C}/ad-silande.webp`,    name: '思蓝德', alt: '思蓝德' },
  { logo: `${C}/ad-hanstars.webp`,   name: '汉斯股份', alt: '汉斯' },
  { logo: `${C}/ad-seayu.webp`,      name: '思宇胶业', alt: '思宇' },
  { logo: `${C}/ad-aecc.webp`,       name: '中国航发', alt: '中国航发' },
  { logo: `${C}/ad-casic.webp`,      name: '航天科工', alt: '航天科工' },
]

// 银浆
const silverPaste = [
  { logo: `${C}/sp-heraeus.webp`,    name: '贺利氏 Heraeus', alt: '贺利氏' },
  { logo: `${C}/sp-fusion.webp`,     name: '聚和新材', alt: '聚和新材' },
  { logo: `${C}/sp-rutech.webp`,     name: '儒兴科技', alt: '儒兴科技' },
  { logo: `${C}/sp-ssp.webp`,        name: '上海银浆 SSP', alt: '上海银浆' },
  { logo: `${C}/sp-riyu.webp`,       name: '日御股份', alt: '日御股份' },
  { logo: `${C}/sp-dec.webp`,        name: '东方电气', alt: '东方电气' },
  { logo: `${C}/sp-johnson.webp`,    name: 'Johnson Matthey', alt: 'Johnson Matthey' },
]

// 医药
const pharma = [
  { logo: `${C}/ph-cr.webp`,        name: '华润医药', alt: '华润医药' },
  { logo: `${C}/ph-sirio.webp`,     name: '仙乐健康', alt: '仙乐健康' },
  { logo: `${C}/ph-yabao.webp`,     name: '亚宝药业集团', alt: '亚宝药业' },
  { logo: `${C}/ph-lingrui.webp`,   name: '羚锐制药', alt: '羚锐制药' },
  { logo: `${C}/ph-khb.webp`,       name: '科华生物', alt: '科华生物' },
  { logo: `${C}/ph-tianbang.webp`,  name: '天邦医疗', alt: '天邦医疗' },
  { logo: `${C}/ph-jiudian.webp`,   name: '九典制药', alt: '九典制药' },
  { logo: `${C}/ph-yifang.webp`,    name: '一方制药', alt: '一方制药' },
  { logo: `${C}/ph-yicheng.webp`,   name: '亿诚医药', alt: '亿诚医药' },
  { logo: `${C}/ph-amhwa.webp`,     name: '安美华制药', alt: '安美华' },
  { logo: `${C}/ph-yige.webp`,      name: '一格制药', alt: '一格制药' },
  { logo: `${C}/ph-yuchun.webp`,    name: '宇春药业', alt: '宇春药业' },
  { logo: `${C}/ph-xianju.webp`,    name: '仙居药业', alt: '仙居药业' },
  { logo: `${C}/ph-hengjian.webp`,  name: '亨健药业', alt: '亨健' },
  { logo: `${C}/ph-hongjou.webp`,   name: '弘洲制药', alt: '弘洲制药' },
]

/**
 * 按行业分组的完整客户清单
 * id 用于稳定 React key；category 用于副标签文案
 */
export const partnerGroupsData = [
  { id: 'new-energy', category: '新能源领域', label: '新能源行业', items: newEnergy   },
  { id: 'chemical',   category: '化工领域',   label: '化工行业',   items: chemical    },
  { id: 'adhesive',   category: '胶粘剂领域', label: '胶粘剂行业', items: adhesive    },
  { id: 'silver',     category: '银浆领域',   label: '银浆行业',   items: silverPaste },
  { id: 'pharma',     category: '医药领域',   label: '医药行业',   items: pharma      },
]
