import React, { useEffect } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import ProductThreeView from '../components/ProductThreeView'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import CoreEquipmentSection from '../components/CoreEquipmentSection'
import TechInquirySection from '../components/TechInquirySection'
import VideoPlayer from '../components/VideoPlayer'
const HERO_IMG = '/assets/images/solutions/battery-manufacturing.webp'
const PRODUCT_IMG = '/assets/images/solutions/pd-pulping/system.webp'
const IMG = '/assets/images/products/pd-mixer'

/* ========== 系统特点 SVG 图标（内联，品牌色处理）========== */

/* development.svg — 高效混合：内圆改品牌红 */
function IconDevelopment() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        d="M464.758,135.498C485.264,170.947,497,212.103,497,256c0,133.101-107.899,241-241,241
           c-71.929,0-136.498-31.511-180.655-81.482" />
      <polyline stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        points="135.5,415.408 75.25,415.408 75.25,475.658" />
      <path stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        d="M47.242,376.501C26.736,341.053,15,299.897,15,256C15,122.899,122.899,15,256,15
           c71.929,0,136.498,31.511,180.655,81.482" />
      <polyline stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        points="376.5,96.592 436.75,96.592 436.75,36.342" />
      <path stroke="#1E1E1E" strokeWidth="26" strokeMiterlimit="10"
        d="M416.607,286.12c1.69-9.79,2.57-19.85,2.57-30.12s-0.88-20.33-2.57-30.12h-29.123
           c-3.41-14.947-9.306-28.944-17.225-41.543l20.605-20.605c-5.728-8.118-12.219-15.853-19.481-23.115
           s-14.998-13.753-23.115-19.481l-20.605,20.605c-12.599-7.919-26.597-13.816-41.543-17.225V95.393
           c-9.79-1.69-19.85-2.57-30.12-2.57s-20.33,0.88-30.12,2.57v29.123c-14.947,3.41-28.944,9.307-41.543,17.225
           l-20.605-20.605c-8.118,5.728-15.853,12.219-23.115,19.481s-13.753,14.998-19.481,23.115l20.605,20.605
           c-7.919,12.599-13.816,26.597-17.225,41.543H95.393c-1.69,9.79-2.57,19.85-2.57,30.12s0.88,20.33,2.57,30.12h29.123
           c3.41,14.947,9.307,28.944,17.225,41.543l-20.605,20.605c5.728,8.118,12.219,15.853,19.481,23.115
           s14.998,13.753,23.115,19.481l20.605-20.605c12.599,7.919,26.597,13.816,41.543,17.225v29.123
           c9.79,1.69,19.85,2.57,30.12,2.57s20.33-0.88,30.12-2.57v-29.123c14.947-3.41,28.944-9.307,41.543-17.225
           l20.605,20.605c8.118-5.728,15.853-12.219,23.115-19.481s13.753-14.998,19.481-23.115l-20.605-20.605
           c7.919-12.599,13.816-26.597,17.225-41.543H416.607z" />
      <circle stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" cx="256" cy="256" r="73.342" />
    </svg>
  )
}

/* target.svg — 精准控制：内圆4段弧线 + 中心点改品牌红 */
function IconTarget() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 外圆 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(470.1377,256)"
          d="m 0,0 c 0,-118.265 -95.873,-214.138 -214.138,-214.138 -118.265,0 -214.137,95.873 -214.137,214.138
             0,118.265 95.872,214.138 214.137,214.138 C -95.873,214.138 0,118.265 0,0 Z" />
        {/* 内圆 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(407.3745,256)"
          d="m 0,0 c 0,-83.602 -67.772,-151.375 -151.375,-151.375 -83.602,0 -151.374,67.773 -151.374,151.375
             0,83.602 67.772,151.375 151.374,151.375 C -67.772,151.375 0,83.602 0,0 Z" />
        {/* 内圆四段弧线（品牌红）*/}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(297.5889,179.4053)"
          d="m 0,0 c -12.359,-6.726 -26.528,-10.546 -41.589,-10.546 -15.06,0 -29.228,3.82 -41.588,10.545" />
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(214.4111,332.5947)"
          d="M 0,0 C 12.36,6.726 26.528,10.546 41.589,10.546 56.649,10.546 70.818,6.726 83.178,0" />
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(179.4053,214.4111)"
          d="m 0,0 c -6.725,12.359 -10.546,26.528 -10.546,41.589 0,15.06 3.82,29.228 10.546,41.588" />
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(332.5952,297.5889)"
          d="M 0,0 C 6.725,-12.359 10.546,-26.528 10.546,-41.589 10.546,-56.649 6.725,-70.817 0,-83.178" />
        {/* 四条准线 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,343.1406)" d="M 0,0 V 168.859" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,0)" d="M 0,0 V 168.859" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(343.1411,256)" d="M 0,0 H 168.859" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(0,256)" d="M 0,0 H 168.859" />
        {/* 中心点（品牌红）*/}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(241,256)" d="M 0,0 H 30" />
      </g>
    </svg>
  )
}

/* connect.svg — 强剪切分散：中心圆改品牌红 */
function IconConnect() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {[
          'translate(106,436)', 'translate(106,76)',
          'translate(466,436)', 'translate(466,76)',
        ].map((t, i) => (
          <path key={i} stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
            transform={t} d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        ))}
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,467)" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,45)" d="m 0,0 c 0,16.568 -13.432,30 -30,30 -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(45,286)" d="m 0,0 c 16.568,0 30,-13.432 30,-30 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(467,286)" d="m 0,0 c -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 C 30,-13.432 16.568,0 0,0 Z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,75)" d="M 0,0 V 121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,437)" d="M 0,0 V -121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(75,256)" d="M 0,0 H 121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(437,256)" d="M 0,0 H -121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(97.2129,414.7866)" d="M 0,0 116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(213.5908,213.5908)" d="M 0,0 -116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(298.4092,213.5908)" d="M 0,0 116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(414.7871,414.7866)" d="M 0,0 -116.378,-116.377" />
        <path stroke="#BA0C2F" strokeWidth="26" strokeMiterlimit="10"
          transform="translate(256,196)"
          d="m 0,0 c -33.091,0 -60,26.909 -60,60 0,33.091 26.909,60 60,60 C 33.091,120 60,93.091 60,60 60,26.909 33.091,0 0,0 Z" />
      </g>
    </svg>
  )
}

/* leaf.svg — 密封防污染：中轴茎线改品牌红 */
function IconLeaf() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(361.5459,234.5454)"
          d="m 0,0 c 0,-58.291 -47.255,-105.545 -105.546,-105.545 -58.291,0 -105.546,47.254 -105.546,105.545 0,107.018 105.546,164.455 105.546,164.455 C -105.546,164.455 0,107.018 0,0 Z" />
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,399)" d="M 0,0 V -270" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(154.8789,271.8809)" d="M 0,0 101.121,-78.732" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(187.5967,338.647)" d="M 0,0 68.403,-53.259" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(357.1211,271.8809)" d="M 0,0 -101.121,-78.732" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(324.4033,338.647)" d="M 0,0 -68.403,-53.259" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(44.1855,475.9243)" d="M 0,0 91.314,-11.212 80.103,-102.526" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(467.8145,36.0757)" d="m 0,0 -91.314,11.212 11.211,91.314" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(318.375,23.2119)"
          d="m 0,0 c -128.564,-34.449 -260.714,41.847 -295.163,170.413 -28.864,107.724 20.021,217.963 112.259,271.139" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(193.625,488.7881)"
          d="M 0,0 C 128.564,34.449 260.714,-41.847 295.163,-170.413 324.027,-278.137 275.142,-388.376 182.904,-441.552" />
      </g>
    </svg>
  )
}

/* ========== 系统特点数据（去掉 desc）========== */
const features = [
  { Icon: IconDevelopment, title: '高效混合' },
  { Icon: IconTarget,      title: '精准控制' },
  { Icon: IconConnect,     title: '强剪切分散' },
  { Icon: IconLeaf,        title: '密封防污染' },
]

/* ========== 核心设备数据 ========== */
const coreEquipment = [
  {
    name: '量产型双行星动力混合机',
    img: '/assets/images/solutions/pd-pulping/main-product.webp',
    imgStyle: { maxHeight: '320px' },
    features: [
      '面向中大批量产线设计，集成液压升降系统，工作容积 60L–3000L',
      '真空密封防污染设计，金属零污染，保障浆料品质',
      '行星公转 + 自转 + 高速分散三重动力，适用于正负极浆料批次量产',
    ],
  },
  {
    name: '中型双行星动力混合机',
    img: '/assets/images/products/pd-mixer/dual-planetary-mixer-mid.webp',
    features: [
      '面向中等批量生产与中试放大场景，结构紧凑、产能灵活',
      '工艺参数与量产机型保持一致，可平滑迁移至产线放大',
      '电动升降，容积范围 10L–30L，变频电机驱动',
    ],
  },
  {
    name: '实验室型双行星动力混合机',
    img: '/assets/images/products/pd-mixer/dual-planetary-mixer-lab.webp',
    features: [
      '适用于研发、小批量实验及工艺验证，紧凑轻便，操作简洁',
      '与量产机型保持工艺一致性，工艺参数可直接复用至量产',
      '手摇升降，容积范围 1L–5L，伺服电机驱动',
    ],
  },
]

/* ========== 参数表数据（全量 20 型号，与产品页完全一致）========== */
const allModels = [
  { model: 'HY-DLH1.5L',  liftType: '手摇升降', workVol: '1L',    designVol: '1.5L',  tankDim: 'Φ140×100',   mixerMotor: '0.75', revSpeed: '6-60',   ownSpeed: '17-170',  dissolverKW: '0.75', dissolverType: '伺服电机', dissolverRPM: '800-11000', dissolverLinear: '1-18m/s',  weight: '280kg',    dimension: '880×480×930'    },
  { model: 'HY-DLH3L',    liftType: '手摇升降', workVol: '2L',    designVol: '3L',    tankDim: 'Φ180×120',   mixerMotor: '0.75', revSpeed: '7-75',   ownSpeed: '18-250',  dissolverKW: '1.5',  dissolverType: '伺服电机', dissolverRPM: '800-11000', dissolverLinear: '1-18m/s',  weight: '303kg',    dimension: '920×520×1100'   },
  { model: 'HY-DLH4.5L',  liftType: '手摇升降', workVol: '3L',    designVol: '4.5L',  tankDim: 'Φ200×135',   mixerMotor: '1.0',  revSpeed: '6-63',   ownSpeed: '18-185',  dissolverKW: '1.5',  dissolverType: '伺服电机', dissolverRPM: '800-11000', dissolverLinear: '1-21m/s',  weight: '330kg',    dimension: '1100×520×1100'  },
  { model: 'HY-DLH7.4L',  liftType: '手摇升降', workVol: '5L',    designVol: '7.4L',  tankDim: 'Φ250×150',   mixerMotor: '1.5',  revSpeed: '6-69',   ownSpeed: '16-210',  dissolverKW: '2.2',  dissolverType: '伺服电机', dissolverRPM: '800-9000',  dissolverLinear: '1-22m/s',  weight: '415kg',    dimension: '1200×520×1100'  },
  { model: 'HY-DLH14L',   liftType: '电动升降', workVol: '10L',   designVol: '14L',   tankDim: 'Φ300×200',   mixerMotor: '2.2',  revSpeed: '0-48',   ownSpeed: '0-148',   dissolverKW: '2.2',  dissolverType: '变频电机', dissolverRPM: '0-7000',    dissolverLinear: '0-23m/s',  weight: '550kg',    dimension: '1300×800×1800'  },
  { model: 'HY-DLH24L',   liftType: '电动升降', workVol: '15L',   designVol: '24L',   tankDim: 'Φ350×250',   mixerMotor: '2.2',  revSpeed: '0-44',   ownSpeed: '0-142',   dissolverKW: '3',    dissolverType: '变频电机', dissolverRPM: '0-5900',    dissolverLinear: '0-23m/s',  weight: '770kg',    dimension: '1500×800×1750'  },
  { model: 'HY-DLH28L',   liftType: '电动升降', workVol: '20L',   designVol: '28L',   tankDim: 'Φ350×300',   mixerMotor: '2.2',  revSpeed: '0-45',   ownSpeed: '0-142',   dissolverKW: '3',    dissolverType: '变频电机', dissolverRPM: '0-5900',    dissolverLinear: '0-23m/s',  weight: '820kg',    dimension: '1500×800×2000'  },
  { model: 'HY-DLH43L',   liftType: '电动升降', workVol: '30L',   designVol: '43L',   tankDim: 'Φ420×320',   mixerMotor: '4',    revSpeed: '0-44',   ownSpeed: '0-108',   dissolverKW: '4',    dissolverType: '变频电机', dissolverRPM: '0-5500',    dissolverLinear: '0-23m/s',  weight: '900kg',    dimension: '1700×660×1750'  },
  { model: 'HY-DLH88L',   liftType: '液压升降', workVol: '60L',   designVol: '88L',   tankDim: 'Φ530×400',   mixerMotor: '5.5',  revSpeed: '0-41',   ownSpeed: '0-104',   dissolverKW: '7.5',  dissolverType: '变频电机', dissolverRPM: '0-4500',    dissolverLinear: '0-23m/s',  weight: '1700kg',   dimension: '1800×1100×2300' },
  { model: 'HY-DLH149L',  liftType: '液压升降', workVol: '100L',  designVol: '149L',  tankDim: 'Φ650×450',   mixerMotor: '7.5',  revSpeed: '0-35',   ownSpeed: '0-90',    dissolverKW: '11',   dissolverType: '变频电机', dissolverRPM: '0-3700',    dissolverLinear: '0-23m/s',  weight: '2700kg',   dimension: '2200×1300×2500' },
  { model: 'HY-DLH287L',  liftType: '液压升降', workVol: '200L',  designVol: '287L',  tankDim: 'Φ750×650',   mixerMotor: '15',   revSpeed: '0-25',   ownSpeed: '0-60',    dissolverKW: '22',   dissolverType: '变频电机', dissolverRPM: '0-2800',    dissolverLinear: '0-23m/s',  weight: '4200kg',   dimension: '2400×1600×3100' },
  { model: 'HY-DLH368L',  liftType: '液压升降', workVol: '300L',  designVol: '368L',  tankDim: 'Φ850×650',   mixerMotor: '30',   revSpeed: '0-32',   ownSpeed: '0-82',    dissolverKW: '30',   dissolverType: '变频电机', dissolverRPM: '0-2200',    dissolverLinear: '0-23m/s',  weight: '7200kg',   dimension: '3400×1300×3500' },
  { model: 'HY-DLH450L',  liftType: '液压升降', workVol: '350L',  designVol: '450L',  tankDim: 'Φ900×710',   mixerMotor: '30',   revSpeed: '0-26',   ownSpeed: '0-66',    dissolverKW: '37',   dissolverType: '变频电机', dissolverRPM: '0-2200',    dissolverLinear: '0-23m/s',  weight: '7200kg',   dimension: '2870×1800×3400' },
  { model: 'HY-DLH670L',  liftType: '液压升降', workVol: '500L',  designVol: '670L',  tankDim: 'Φ1000×850',  mixerMotor: '45',   revSpeed: '0-23',   ownSpeed: '0-59',    dissolverKW: '45',   dissolverType: '变频电机', dissolverRPM: '0-2000',    dissolverLinear: '0-23m/s',  weight: '10500kg',  dimension: '3500×1500×4000' },
  { model: 'HY-DLH820L',  liftType: '液压升降', workVol: '650L',  designVol: '820L',  tankDim: 'Φ1100×865',  mixerMotor: '45',   revSpeed: '0-23',   ownSpeed: '0-59',    dissolverKW: '45',   dissolverType: '变频电机', dissolverRPM: '0-2000',    dissolverLinear: '0-23m/s',  weight: '12500kg',  dimension: '3600×1600×4100' },
  { model: 'HY-DLH1327L', liftType: '液压升降', workVol: '1000L', designVol: '1327L', tankDim: 'Φ1300×1000', mixerMotor: '75',   revSpeed: '0-18',   ownSpeed: '0-45',    dissolverKW: '75',   dissolverType: '变频电机', dissolverRPM: '0-1700',    dissolverLinear: '0-23m/s',  weight: '25000kg',  dimension: '4170×1800×4780' },
  { model: 'HY-DLH1690L', liftType: '液压升降', workVol: '1200L', designVol: '1690L', tankDim: 'Φ1400×1100', mixerMotor: '75',   revSpeed: '0-18',   ownSpeed: '0-45',    dissolverKW: '75',   dissolverType: '变频电机', dissolverRPM: '0-1700',    dissolverLinear: '0-24m/s',  weight: '30000kg',  dimension: '5376×1874×5366' },
  { model: 'HY-DLH2100L', liftType: '液压升降', workVol: '1500L', designVol: '2100L', tankDim: 'Φ1500×1200', mixerMotor: '90',   revSpeed: '0-18',   ownSpeed: '0-45',    dissolverKW: '90',   dissolverType: '变频电机', dissolverRPM: '0-1700',    dissolverLinear: '0-24m/s',  weight: '33000kg',  dimension: '4726×1870×5500' },
  { model: 'HY-DLH2300L', liftType: '液压升降', workVol: '1600L', designVol: '2300L', tankDim: 'Φ1560×1210', mixerMotor: '110',  revSpeed: '0-19',   ownSpeed: '0-46',    dissolverKW: '110',  dissolverType: '变频电机', dissolverRPM: '0-1550',    dissolverLinear: '0-24m/s',  weight: '35000kg',  dimension: '5380×1930×5700' },
  { model: 'HY-DLH3400L', liftType: '液压升降', workVol: '3000L', designVol: '3400L', tankDim: 'Φ1700×1500', mixerMotor: '132',  revSpeed: '0-12',   ownSpeed: '0-30',    dissolverKW: '132',  dissolverType: '变频电机', dissolverRPM: '0-1000',    dissolverLinear: '0-23m/s',  weight: '42000kg',  dimension: '5800×2300×6000' },
]

/* ========== 参数表组件（严格复刻产品页双行结构）========== */
function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table">
        <thead>
          <tr>
            <th>型号<br /><span className="th-sub">Model</span></th>
            <th>工作容积<br />设计容积<br /><span className="th-sub">Work volume<br />Design volume</span></th>
            <th>桶体内尺寸<br /><span className="th-sub">Tank internal<br />dimension (mm)</span></th>
            <th>公转电机<br /><span className="th-sub">Mixer motor<br />(KW)</span></th>
            <th>公转转速<br />浆转速<br /><span className="th-sub">Revolution speed<br />Own speed (Rpm)</span></th>
            <th>分散电机<br /><span className="th-sub">Dissolver motor<br />(KW)</span></th>
            <th>分散转速<br /><span className="th-sub">Dissolver speed<br />(Rpm)</span></th>
            <th>重量<br />外形尺寸<br /><span className="th-sub">Weight<br />Dimension (mm)</span></th>
          </tr>
        </thead>
        <tbody>
          {allModels.map((row, i) => (
            <React.Fragment key={i}>
              <tr className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                <td className="td-model-code">{row.model}</td>
                <td>{row.workVol}</td>
                <td rowSpan={2} className="td-span">{row.tankDim}</td>
                <td rowSpan={2} className="td-span">{row.mixerMotor}</td>
                <td>{row.revSpeed}</td>
                <td>{row.dissolverKW}</td>
                <td>{row.dissolverRPM}</td>
                <td>{row.weight}</td>
              </tr>
              <tr className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
                <td className="td-lift-type">{row.liftType}</td>
                <td>{row.designVol}</td>
                <td>{row.ownSpeed}</td>
                <td>{row.dissolverType}</td>
                <td>{row.dissolverLinear}</td>
                <td>{row.dimension}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ========== 主页面 ========== */
export default function PDPulpingPage() {

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        title="行业解决方案"
        subtitle="Industry Solutions"
        bgImage={HERO_IMG}
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: 'PD制浆系统' },
        ]} />

        {/* ===== 系统介绍 + 视频模块 ===== */}
        <section className="page-section pdm-intro-section page-section--gray">
          <div className="page-container">
            <div className="pdm-intro-grid">
              <div className="pdm-intro-visual pdm-intro-visual--photo fade-up fade-up-delay-1">
                <img
                  src={PRODUCT_IMG}
                  alt="双行星动力™混合机（PD制浆系统）"
                  className="cp-intro-product-img"
                />
              </div>
              <div className="pdm-intro-content">
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">红运 PD 制浆系统</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  以双行星动力混合机（PD搅拌机）为核心，集成行星公转、自转与高速分散三重动力，实现高粘度浆料无死角均匀混合，适用于锂电池正负极浆料批次生产。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  系统覆盖从实验室级（1L）到工业量产级（3400L）全系列规格，搅拌桨与分散盘的行星运动使物料受到充分剪切和捏合，确保浆料均匀性与批次一致性。
                </p>
              </div>
            </div>

            {/* 视频模块 */}
            <div className="fade-up fade-up-delay-2" style={{ marginTop: '40px' }}>
              <VideoPlayer
                src="/assets/videos/hy-pd.webm"
                poster="/assets/videos/hy-pd-poster.jpg"
                title="红运 PD 制浆系统"
              />
            </div>
          </div>
        </section>

        {/* ===== 系统三视图 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Three Views</p>
            <h2 className="section-heading section-heading--center fade-up">三视图</h2>
            <ProductThreeView views={[
              { src: '/assets/images/solutions/pd-pulping/system-tv2.webp', label: '正视图' },
              { src: '/assets/images/solutions/pd-pulping/system-tv1.webp', label: '侧视图' },
              { src: '/assets/images/solutions/pd-pulping/system-tv3.webp', label: '俯视图' },
            ]} />
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={features} title="系统特点" enLabel="System Features" grayBg />

        {/* ===== 核心设备 ===== */}
        <CoreEquipmentSection devices={coreEquipment} />

        {/* ===== 参数汇总 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <p className="section-en-label fade-up">Parameters Overview</p>
            <h2 className="section-heading section-heading--center fade-up">参数汇总</h2>
            <div className="fade-up fade-up-delay-1">
              <ParamsTable />
            </div>
            <p className="cp-table-note fade-up fade-up-delay-3">
              * 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。
            </p>
          </div>
        </section>

        {/* ===== 客户案例（严格按照循环制浆页样式布局）===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Case</p>
            <h2 className="section-heading section-heading--center fade-up">客户案例</h2>

            {/* 01 全自动加投料系统 */}
            <div className="cp-verify-block fade-up fade-up-delay-1">
              <h3 className="cp-verify-subheading">全自动加投料系统解决方案</h3>
              <div className="cp-charts-grid-3">
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/case-system-1.webp`} alt="全自动加投料系统设备" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">全自动加投料系统设备</p>
                </div>
                <div className="cp-chart-card cp-chart-card--span2">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/case-system-2.jpg`} alt="全自动加投料系统现场" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">全自动加投料系统现场</p>
                </div>
              </div>
            </div>

            {/* 02 EV 电池匀浆车间 */}
            <div className="cp-verify-block fade-up fade-up-delay-2">
              <h3 className="cp-verify-subheading">EV 电池匀浆车间</h3>
              <div className="cp-charts-grid-3">
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/case-ev-equipment-01.webp`} alt="EV电池匀浆车间设备" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">EV 电池匀浆车间设备</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/case-ev-site-01.webp`} alt="EV电池匀浆车间现场照" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">EV 电池匀浆车间现场</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/case-ev-full-01.jpg`} alt="EV电池匀浆车间全套设备" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">全套匀浆系统</p>
                </div>
              </div>
            </div>

            {/* 03 3C 电池匀浆车间（2 张等宽卡片，第 3 格空位）*/}
            <div className="cp-verify-block fade-up fade-up-delay-3">
              <h3 className="cp-verify-subheading">3C 电池匀浆车间</h3>
              <div className="cp-charts-grid-3">
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/case-3c-equipment-01.jpg`} alt="3C电池匀浆车间设备" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">3C 电池匀浆车间半自动加投料系统设备</p>
                </div>
                <div className="cp-chart-card">
                  <div className="cp-chart-img-wrap">
                    <img src={`${IMG}/case-3c-site.webp`} alt="3C电池匀浆车间现场照" className="cp-chart-img" loading="lazy" />
                  </div>
                  <p className="cp-chart-caption">3C 电池匀浆车间现场</p>
                </div>
                {/* 第 3 格留空 */}
              </div>
            </div>

          </div>
        </section>

        {/* ===== 技术咨询 ===== */}
        <TechInquirySection />
      </div>
    </>
  )
}
