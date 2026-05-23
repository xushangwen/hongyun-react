import {
  IconCarBatteryOutline24,
  IconBatteryChargingOutline24,
  IconFlaskOutline24,
} from 'nucleo-core-outline-24'

export const productCategories = [
  {
    id: 'new-energy',
    Icon: IconCarBatteryOutline24,
    name: '新能源行业',
    desc: '面向锂电池正负极浆料制备的核心装备，覆盖搅拌、分散、捏合、制浆全工艺环节。',
    systems: [
      {
        name: '双行星动力制浆系统',
        slug: 'pd-pulping',
        products: [
          { name: '量产型双行星动力混合机',   slug: 'dual-planetary-mixer',     image: '/assets/images/solutions/pd-pulping/main-product.webp',           imgContain: true },
          { name: '中型双行星动力混合机',     slug: 'dual-planetary-mixer-mid', image: '/assets/images/products/pd-mixer/dual-planetary-mixer-mid.webp', imgContain: true },
          { name: '实验室型双行星动力混合机', slug: 'dual-planetary-mixer-lab', image: '/assets/images/products/pd-mixer/dual-planetary-mixer-lab.webp', imgContain: true },
        ],
      },
      {
        name: '高效管线式制浆系统',
        slug: 'pipeline-pulping',
        products: [
          { name: '管线捏合罐',         slug: 'kneader',              image: '/assets/images/solutions/pipeline-pulping/tank-main.webp',          imgContain: true },
          { name: '管线分散罐',         slug: 'pipeline-disperser',   image: '/assets/images/solutions/pipeline-pulping/pipeline-disperser.webp', imgContain: true },
          { name: '管线式高速分散机',   slug: 'high-speed-disperser', image: '/assets/images/solutions/pipeline-pulping/disperser-view.webp',    imgContain: true },
        ],
      },
      {
        name: '高效循环制浆系统',
        slug: 'circulation-pulping',
        products: [
          { name: '高速分散机（循环制浆）', slug: 'cp-disperser', image: '/assets/images/solutions/circulation-pulping/高速分散机-svg.svg', imgContain: true, imgSm: true },
          { name: '循环罐 A',                slug: 'cp-tank-a',    image: '/assets/images/solutions/circulation-pulping/循环罐-A-svg.svg',   imgContain: true, imgSm: true },
          { name: '循环罐 B',                slug: 'cp-tank-b',    image: '/assets/images/solutions/circulation-pulping/循环罐-B-svg.svg',   imgContain: true, imgSm: true },
        ],
      },
      {
        name: '双螺杆连续制浆系统',
        slug: 'twin-screw-pulping',
        products: [
          { name: '双螺杆制浆机', slug: 'twin-screw-pulper' },
        ],
      },
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
      { name: '双行星动力混合机',   slug: 'dual-planetary-mixer',   image: '/assets/images/solutions/pd-pulping/main-product.webp',                 imgContain: true, customPath: '/products/new-energy/dual-planetary-mixer' },
      { name: '往复式混合搅拌机',   slug: 'reciprocating-mixer',    image: '/assets/images/solutions/chemical/equipment/02-reciprocating-mixer.png',   imgContain: true },
      { name: '双立柱行星搅拌机',   slug: 'dual-column-planetary',  image: '/assets/images/solutions/chemical/equipment/03-dual-column-planetary-01.jpg', imgContain: true },
      { name: '行星蝶式混合搅拌机', slug: 'butterfly-mixer',         image: '/assets/images/solutions/chemical/equipment/05-butterfly-mixer.jpg',       imgContain: true },
      { name: '行星动力混合搅拌机', slug: 'planetary-power-mixer',   image: '/assets/images/solutions/chemical/equipment/06-planetary-power-mixer.png', imgContain: true },
      { name: '立式捏合机',         slug: 'vertical-kneader',        image: '/assets/images/solutions/chemical/equipment/07-vertical-kneader-01.png',      imgContain: true },
      { name: '压料机',             slug: 'press-machine',           image: '/assets/images/solutions/chemical/equipment/08-material-press.png',        imgContain: true },
      { name: '倾倒机',             slug: 'tilting-machine',         image: '/assets/images/solutions/chemical/equipment/09-tilting-machine-01.png',       imgContain: true },
      { name: '洗桶机',             slug: 'barrel-washer',           image: '/assets/images/solutions/chemical/equipment/10-barrel-washer.jpg',         imgContain: true },
      { name: '反应釜',             slug: 'reactor',                 image: '/assets/images/solutions/chemical/equipment/11-reactor.png',               imgContain: true },
      { name: '储罐',               slug: 'storage-tank',            image: '/assets/images/solutions/chemical/equipment/12-storage-tank.jpg',          imgContain: true },
    ],
  },
]

export function getCategoryById(id) {
  return productCategories.find((c) => c.id === id) ?? null
}

// 派生：拿到分类下所有产品的扁平列表（兼容 systems 嵌套 / products 平铺两种结构）
export function getCategoryProducts(category) {
  if (!category) return []
  if (category.systems) return category.systems.flatMap((s) => s.products)
  return category.products ?? []
}
