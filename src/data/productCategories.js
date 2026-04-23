import {
  IconCarBatteryOutline24,
  IconBatteryChargingOutline24,
  IconFlaskOutline24,
  IconTestTubeOutline24,
  IconFireFlameOutline24,
  IconCutleryOutline24,
  IconSoapDispenserOutline24,
  IconMicrochipOutline24,
} from 'nucleo-core-outline-24'

export const productCategories = [
  {
    id: 'new-energy',
    Icon: IconCarBatteryOutline24,
    name: '新能源行业',
    desc: '面向锂电池正负极浆料制备的核心装备，覆盖搅拌、分散、捏合、制浆全工艺环节。',
    products: [
      { name: '双行星动力混合机', slug: 'dual-planetary-mixer', image: '/assets/images/solutions/pd-pulping/main-product.webp', imgContain: true },
      { name: '高速分散机',       slug: 'high-speed-disperser', image: '/assets/images/solutions/pipeline-pulping/disperser-view.webp', imgContain: true },
      { name: '管线捏合罐',       slug: 'kneader',               image: '/assets/images/solutions/pipeline-pulping/tank-main.webp', imgContain: true },
      { name: '管线分散罐',       slug: 'pipeline-disperser', image: '/assets/images/solutions/pipeline-pulping/disperser-single.svg', imgContain: true },
      { name: '高速分散机（循环制浆）', slug: 'cp-disperser', image: '/assets/images/solutions/circulation-pulping/高速分散机-svg.svg', imgContain: true, imgSm: true },
      { name: '循环罐 A',          slug: 'cp-tank-a',    image: '/assets/images/solutions/circulation-pulping/循环罐-A-svg.svg',   imgContain: true, imgSm: true },
      { name: '循环罐 B',          slug: 'cp-tank-b',    image: '/assets/images/solutions/circulation-pulping/循环罐-B-svg.svg',   imgContain: true, imgSm: true },
      { name: '双螺杆制浆机',     slug: 'twin-screw-pulper' },
    ],
  },
  {
    id: 'solid-state-battery',
    Icon: IconBatteryChargingOutline24,
    name: '固态电池',
    desc: '面向下一代固态电池干法电极制备工艺的前沿装备，涵盖包覆、混合、挤出等关键工序。',
    products: [
      { name: '双行星动力混合机',           slug: 'dual-planetary-mixer',      image: '/assets/images/solutions/pd-pulping/main-product.webp',              imgContain: true },
      { name: '干法电极粉体高速混合机',   slug: 'dry-electrode-mixer',      image: '/assets/images/solutions/dry-powder-mixer/product-main.png',      imgContain: true },
      { name: '电磁给料机',               slug: 'electromagnetic-feeder',    image: '/assets/images/solutions/dry-powder-mixer/core-device-01.webp',   imgContain: true },
      { name: '双螺杆干法电极连续挤出机', slug: 'twin-screw-dry-extruder',   image: '/assets/images/solutions/dry-powder-mixer/core-device-02.webp',   imgContain: true },
      { name: '固态电解质包覆机',         slug: 'solid-electrolyte-coater',  image: '/assets/images/solutions/dry-powder-mixer/core-device-03.webp',   imgContain: true },
      { name: '管线式混合机',             slug: 'ssb-pipeline-mixer',        image: '/assets/images/solutions/wet-electrode-system/pipeline-mixer.webp', imgContain: true },
      { name: '多功能混合机',             slug: 'ssb-multi-mixer',           image: '/assets/images/solutions/wet-electrode-system/multi-mixer.webp',    imgContain: true },
      { name: '高压清洗机',               slug: 'ssb-high-pressure-washer',  image: '/assets/images/solutions/wet-electrode-system/high-pressure-washer.webp', imgContain: true },
      { name: '湿法PD搅拌机',             slug: 'wet-pd-mixer' },
    ],
  },
  {
    id: 'chemical',
    Icon: IconFlaskOutline24,
    name: '化工行业',
    desc: '适用于涂料、胶粘剂、密封胶等高粘度多组分物料的专业混合搅拌设备。',
    products: [
      { name: '双行星动力混合机',   slug: 'chem-dual-planetary' },
      { name: '往复式混合搅拌机',   slug: 'reciprocating-mixer' },
      { name: '双行星混合搅拌机',   slug: 'dual-planetary-stirrer' },
      { name: '行星蝶式混合搅拌机', slug: 'planetary-butterfly' },
      { name: '立式捏合机',         slug: 'vertical-kneader' },
      { name: '压料机、倾倒机',     slug: 'press-dumper' },
      { name: '洗桶机',             slug: 'barrel-washer' },
      { name: '反应釜、储罐',       slug: 'reactor-tank' },
      { name: '高分子材料溶解釜',   slug: 'polymer-dissolving' },
      { name: '高压清洗成套设备',   slug: 'high-pressure-cleaning' },
    ],
  },
  {
    id: 'adhesive',
    Icon: IconTestTubeOutline24,
    name: '制胶',
    desc: '针对密封胶、结构胶、硅胶等高粘度物料的真空搅拌与脱泡专用装备。',
    products: [
      { name: '制胶核心设备', slug: 'adhesive-core' },
    ],
  },
  {
    id: 'pyrotechnics',
    Icon: IconFireFlameOutline24,
    name: '火工药剂',
    desc: '符合国防安全标准的防爆型混合搅拌设备，适用于含能材料安全生产。',
    products: [
      { name: '捏合机', slug: 'pyro-kneader' },
    ],
  },
  {
    id: 'food',
    Icon: IconCutleryOutline24,
    name: '食品',
    desc: '符合食品安全标准的卫生级混合设备，全不锈钢设计，支持CIP在线清洗。',
    products: [
      { name: '食品级混合设备', slug: 'food-core' },
    ],
  },
  {
    id: 'cosmetics',
    Icon: IconSoapDispenserOutline24,
    name: '化妆品',
    desc: '适用于乳液、膏霜等化妆品生产的真空乳化均质混合设备。',
    products: [
      { name: '化妆品级混合设备', slug: 'cosmetics-core' },
    ],
  },
  {
    id: 'electronics',
    Icon: IconMicrochipOutline24,
    name: '电子材料',
    desc: '满足电子级材料纳米级粒径要求的超细研磨与真空脱泡混合装备。',
    products: [
      { name: '电子材料混合设备', slug: 'electronics-core' },
    ],
  },
]

export function getCategoryById(id) {
  return productCategories.find((c) => c.id === id) ?? null
}
