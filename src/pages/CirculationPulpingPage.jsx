import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IconArrowRightOutline24,
  IconChevronLeftOutline24,
  IconChevronRightOutline24,
  IconCircleCheckOutline24,
} from 'nucleo-core-outline-24'
import Breadcrumb from '../components/Breadcrumb'
import inquiryBgImg from '../assets/img/CleanShot 2026-03-13 at 12.57.12@2x.png'

/* ──────────────────────────────────────────────────────────
   双色 SVG 图标组件
   主体: stroke="#1E1E1E"（深灰）  accent: stroke="#BA0C2F"（品牌红）
   ────────────────────────────────────────────────────────── */

/* 图标1：发展/工艺流程（development — 刷新+齿轮） */
function IconDevelopment() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      {/* 外圈循环箭头 */}
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
      {/* 齿轮外环路径 */}
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
      {/* 核心圆圈 — 品牌红 */}
      <circle stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" cx="256" cy="256" r="73.342" />
    </svg>
  )
}

/* 图标2：叶子（leaf.svg — 全过程无金属无尘化）
   叶片+茎+叶脉：深灰  |  循环弧线+角括号：品牌红 */
function IconLeaf() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 叶片主体 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(361.5459,234.5454)"
          d="m 0,0 c 0,-58.291 -47.255,-105.545 -105.546,-105.545 -58.291,0 -105.546,47.254 -105.546,105.545 0,107.018 105.546,164.455 105.546,164.455 C -105.546,164.455 0,107.018 0,0 Z" />
        {/* 中心茎 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,399)" d="M 0,0 V -270" />
        {/* 叶脉1 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(154.8789,271.8809)" d="M 0,0 101.121,-78.732" />
        {/* 叶脉2 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(187.5967,338.647)" d="M 0,0 68.403,-53.259" />
        {/* 叶脉3 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(357.1211,271.8809)" d="M 0,0 -101.121,-78.732" />
        {/* 叶脉4 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(324.4033,338.647)" d="M 0,0 -68.403,-53.259" />
        {/* 左下角括号 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(44.1855,475.9243)" d="M 0,0 91.314,-11.212 80.103,-102.526" />
        {/* 右上角括号 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(467.8145,36.0757)" d="m 0,0 -91.314,11.212 11.211,91.314" />
        {/* 循环大弧线1 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(318.375,23.2119)"
          d="m 0,0 c -128.564,-34.449 -260.714,41.847 -295.163,170.413 -28.864,107.724 20.021,217.963 112.259,271.139" />
        {/* 循环大弧线2 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(193.625,488.7881)"
          d="M 0,0 C 128.564,34.449 260.714,-41.847 295.163,-170.413 324.027,-278.137 275.142,-388.376 182.904,-441.552" />
      </g>
    </svg>
  )
}

/* 图标3：点赞（like — 成本优势）*/
function IconLike() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      {/* 主手形 */}
      <path stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        d="M105.721,467H161.7l59.723,30h174.399c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h11c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5h12c17.949,0,32.5-14.551,32.5-32.5
           c0-17.947-14.547-32.496-32.494-32.5h14.952c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h-99.458v-58.528c0-34.808-28.218-63.026-63.026-63.026l-12.793,83.414C252.05,240.933,215.856,272,173.29,272h-68.569" />
      {/* 竖向矩形 */}
      <rect x="45.721" y="242" stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10" width="60" height="255" />
      {/* 装饰短线 — 品牌红 */}
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="177.321" y1="31" x2="223.321" y2="77" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="409.321" y1="31" x2="363.321" y2="77" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="293.321" y1="0" x2="293.321" y2="59" />
    </svg>
  )
}

/* 图标4：洁净空气（clean-air — 无尘化）*/
function IconCleanAir() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 下方水平线 */}
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(0,105)" d="M 0,0 H 411.5" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,210)" d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(326,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45" />
        {/* 主云形 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="24" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,240)"
          d="m 0,0 c 38.66,0 70,31.34 70,70 0,38.66 -31.34,70 -70,70 -0.616,0 -1.226,-0.03 -1.838,-0.046
             C -8.907,179.762 -43.661,210 -85.5,210 c -41.839,0 -76.592,-30.238 -83.662,-70.046
             c -0.612,0.016 -1.221,0.046 -1.838,0.046 c -38.66,0 -70,-31.34 -70,-70 0,-38.66 31.34,-70 70,-70
             h 326.5 c 47.22,0 85.5,38.28 85.5,85.5 0,47.22 -38.28,85.5 -85.5,85.5
             c -0.687,0 -1.365,-0.036 -2.048,-0.052 C 144.948,219.832 102.316,257 51,257
             C 9.834,257 -25.724,233.07 -42.578,198.373" />
      </g>
    </svg>
  )
}

/* 图标5：连接/流动（connect — 系统互联）*/
function IconConnect() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 四角小圆 */}
        {[
          "translate(106,436)", "translate(106,76)",
          "translate(466,436)", "translate(466,76)",
        ].map((t, i) => (
          <path key={i} stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
            transform={t} d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        ))}
        {/* 四方向小端点圆 */}
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,467)" d="m 0,0 c 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.432,30 0,16.568 0,0 Z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(286,45)" d="m 0,0 c 0,16.568 -13.432,30 -30,30 -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(45,286)" d="m 0,0 c 16.568,0 30,-13.432 30,-30 0,-16.568 -13.432,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 z" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10"
          transform="translate(467,286)" d="m 0,0 c -16.568,0 -30,-13.432 -30,-30 0,-16.568 13.432,-30 30,-30 16.568,0 30,13.432 30,30 C 30,-13.432 16.568,0 0,0 Z" />
        {/* 连线 */}
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,75)" d="M 0,0 V 121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(256,437)" d="M 0,0 V -121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(75,256)" d="M 0,0 H 121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(437,256)" d="M 0,0 H -121" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(97.2129,414.7866)" d="M 0,0 116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(213.5908,213.5908)" d="M 0,0 -116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(298.4092,213.5908)" d="M 0,0 116.378,-116.377" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeMiterlimit="10" transform="translate(414.7871,414.7866)" d="M 0,0 -116.378,-116.377" />
        {/* 中心圆 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="26" strokeMiterlimit="10"
          transform="translate(256,196)"
          d="m 0,0 c -33.091,0 -60,26.909 -60,60 0,33.091 26.909,60 60,60 C 33.091,120 60,93.091 60,60 60,26.909 33.091,0 0,0 Z" />
      </g>
    </svg>
  )
}

/* 图标6：笔记本/监控（laptop — 可视化）*/
function IconLaptop() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      {/* 屏幕框 */}
      <path fill="#1E1E1E" d="M509.297,432L472,245.516V0H40v245.516L2.703,432H0v80h512v-80H509.297z
        M70,30h372v202H70V30z M67.297,262h377.406l34,170H33.297L67.297,262z M482,482H30v-20h452V482z" />
      {/* 屏幕底部按钮 */}
      <rect fill="#1E1E1E" x="180" y="382" width="152" height="30" />
      <rect fill="#1E1E1E" x="352" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="402" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="80" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="130" y="382" width="30" height="30" />
      {/* 代码符号 — 品牌红 */}
      <rect fill="#BA0C2F" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -20.8368 223.4203)"
        x="193.735" y="121.863" width="131.079" height="30" />
      <polygon fill="#BA0C2F" points="176.292,96.87 155.467,75.274 98.391,130.313 155.467,185.352 176.292,163.756 141.609,130.313" />
      <polygon fill="#BA0C2F" points="356.533,75.274 335.708,96.87 370.391,130.313 335.708,163.756 356.533,185.352 413.609,130.313" />
    </svg>
  )
}

/* ──────────────────────────────────────────────────────────
   行业选项（技术咨询表单）
   ────────────────────────────────────────────────────────── */
const industryOptions = [
  '新能源行业 / 锂电池', '固态电池', '化工行业 / 涂料', '制胶 / 密封胶',
  '食品', '医药', '化妆品', '电子材料', '其他行业',
]

/* ──────────────────────────────────────────────────────────
   方案特点数据（对应上面6个图标组件）
   ────────────────────────────────────────────────────────── */
const features = [
  {
    Icon: IconDevelopment,
    title: '"必然式"制浆工艺',
    desc: '独特的分散腔体结构实现粉体与溶剂必然接触，分散效率倍增，显著缩短制浆周期，提升产出稳定性。',
  },
  {
    Icon: IconCleanAir,
    title: '占用高度小，灵活性提升',
    desc: '多层堆积设计大幅降低设备整体高度，适应不同厂房条件，产线布局更灵活，工艺扩展更便捷。',
  },
  {
    Icon: IconLike,
    title: '设备投资成本降低',
    desc: '单体零件轻量化设计，无需专用起吊工具即可完成拆装维护，显著降低运营与维护综合成本。',
  },
  {
    Icon: IconLeaf,
    title: '全过程无金属无尘化生产',
    desc: '密封结构防止粉尘外溢，全流程无磁性金属异物引入，保障高品质浆料生产，零批次污染。',
  },
  {
    Icon: IconConnect,
    title: '下粉顺畅，无堵料风险',
    desc: '侧面螺杆喂料结合液料下进上出结构，进料连续顺畅，彻底消除粉体堵料和过载隐患。',
  },
  {
    Icon: IconLaptop,
    title: '系统监控可视化管理',
    desc: '智能控制系统实时采集全流程工艺参数，生产数据可视化，远程监控与异常预警一体管控。',
  },
]

/* ──────────────────────────────────────────────────────────
   包含系统数据
   ────────────────────────────────────────────────────────── */
const subSystems = [
  { num: '01', name: '智能控制系统', img: '/ref-images/upfile_image_20221013_1665664862_757113.jpg', path: '/solutions/new-energy/smart-control' },
  { num: '02', name: '气力输送系统', img: '/ref-images/upfile_image_20221013_1665664953_94451.jpg', path: '/solutions/new-energy/pneumatic-conveying' },
  { num: '03', name: '计量配料系统', img: '/ref-images/upfile_image_20221013_1665664979_912303.jpg', path: '/solutions/new-energy/metering-dosing' },
  { num: '04', name: '搅拌制浆系统', img: '/ref-images/upfile_image_20221014_1665726401_879383.jpg', path: '/solutions/new-energy/agitation-pulping' },
  { num: '05', name: '解包投料系统', img: '/ref-images/upfile_image_20221013_1665664886_369791.jpg', path: '/solutions/new-energy/unpacking-feeding' },
  { num: '06', name: '除尘清洁系统', img: '/ref-images/upfile_image_20221013_1665665043_123976.jpg', path: '/solutions/new-energy/dust-cleaning' },
]

/* ──────────────────────────────────────────────────────────
   技术亮点数据
   ────────────────────────────────────────────────────────── */
const techHighlights = [
  {
    num: '01',
    title: '混料与分散功能分开',
    desc: '粉液预混后经循环罐稀释，再进入高速分散区。解决传统结构过载、卡机问题，提高成品固含量。',
    img: '/ref-images/upfile_image_20240117_1705475469_143.png',
  },
  {
    num: '02',
    title: '多层堆积设计，线性扩产',
    desc: '分散模块从100–3000 L/h线性扩展，突破传统叶轮放大瓶颈，工艺放大风险趋近于零。',
    img: '/ref-images/upfile_image_20240117_1705475545_286555.png',
  },
  {
    num: '03',
    title: '特定分散盘，效率倍增',
    desc: '8层以上剪切环，呈"必然式"浸润分散状态，每次通过均得到充分剪切，细度稳定≤6 μm。',
    img: '/ref-images/upfile_image_20230310_1678413091_736793.png',
  },
  {
    num: '04',
    title: '下进上出式，气泡风险降至最低',
    desc: '分散区位于混合区下方，循环泵驱动浆料100%填充，始终处于有效分散区，气泡引入极低。',
    img: '/ref-images/upfile_image_20230310_1678413047_337467.png',
  },
  {
    num: '05',
    title: '小型化设计，维护便利',
    desc: '外形尺寸缩小50%，单体零件＜25 kg，无需起吊工具即可完成拆装，换型快速，适配多配方。',
    img: '/ref-images/upfile_image_20240117_1705475693_803984.png',
  },
]

/* ──────────────────────────────────────────────────────────
   客户案例数据
   ────────────────────────────────────────────────────────── */
const customerCases = [
  {
    tag: '工程案例 · 新能源',
    client: '河南某知名集团锂电池公司',
    desc: '河南**新能源股份有限公司是中国化学与物理电源行业协会副理事长单位，设有国家级企业技术中心、博士后科研工作站等研发平台。公司为其提供高效循环制浆系统整体方案，涵盖六大子系统，实现全流程无尘自动化生产，产线良品率提升至99.6%以上。',
    img: '/ref-images/upfile_image_20221014_1665711961_98396.jpg',
    metrics: [
      { value: '99.6%', label: '浆料良品率' },
      { value: '6 μm', label: '细度稳定控制' },
      { value: '50%+', label: '制浆效率提升' },
    ],
  },
  {
    tag: '工程案例 · 锂电材料',
    client: '广东某新能源电池材料企业',
    desc: '专注于高性能锂电池正极材料研发与生产，年产能超过 20,000 吨。导入高效循环制浆系统后，实现了从实验室工艺到量产工艺的无缝切换，批次间浆料粘度标准差降低 42%，显著提升了产品的市场竞争力。',
    img: '/ref-images/upfile_image_20221014_1665711961_98396.jpg',
    metrics: [
      { value: '42%', label: '粘度偏差降低' },
      { value: '3×', label: '产能扩展能力' },
      { value: '24h', label: '全天候自动化运行' },
    ],
  },
  {
    tag: '工程案例 · 储能',
    client: '湖南某锂电材料制造商',
    desc: '湖南某储能材料企业承接大型储能电站配套材料订单，产线扩产需求迫切。高效循环制浆系统的模块化设计满足了其快速扩产需求，从立项到投产仅用时 45 天，创下同类项目最短交付纪录。',
    img: '/ref-images/upfile_image_20221014_1665711961_98396.jpg',
    metrics: [
      { value: '45天', label: '交付周期' },
      { value: '100%', label: '浆料填充率' },
      { value: '零停机', label: '连续运转记录' },
    ],
  },
]

/* ──────────────────────────────────────────────────────────
   主页面组件
   ────────────────────────────────────────────────────────── */
export default function CirculationPulpingPage() {
  const [videoPlayed, setVideoPlayed] = useState(false)
  const [caseIndex, setCaseIndex] = useState(0)
  const totalCases = customerCases.length
  const [formData, setFormData] = useState({ name: '', phone: '', company: '', email: '', industry: '', needs: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.08 }
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const prevCase = () => setCaseIndex((i) => (i - 1 + totalCases) % totalCases)
  const nextCase = () => setCaseIndex((i) => (i + 1) % totalCases)

  const currentCase = customerCases[caseIndex]

  const handleFormChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })
  const handleFormSubmit = (e) => { e.preventDefault(); setFormSubmitted(true) }

  return (
    <>
      {/* ═══════════════════════════════════════
          Hero：灰色背景 + 全宽产品图
          ═══════════════════════════════════════ */}
      <section className="cp-sol-hero">
        <div className="cp-sol-hero-img-full">
          <img
            src="/ref-images/upfile_image_20240117_1705474607_843293.png"
            alt="高效循环制浆系统"
            className="cp-sol-hero-product-img"
          />
        </div>
        <div className="cp-sol-hero-breadcrumb page-container">
          <Breadcrumb items={[
            { label: '行业解决方案', path: '/solutions' },
            { label: '新能源行业', path: '/solutions#new-energy' },
            { label: '高效循环制浆系统' },
          ]} />
        </div>
      </section>

      <div className="page-body">
        {/* ═══════════════════════════════════════
            方案简介：介绍文字 + 标签
            ═══════════════════════════════════════ */}
        <section className="page-section cp-intro-section">
          <div className="page-container">
            <div className="cp-sol-hero-tag-row fade-up">
              <span className="cp-sol-hero-industry">新能源行业</span>
            </div>
            <h1 className="cp-sol-hero-title fade-up fade-up-delay-1">高效循环制浆系统</h1>
            <p className="cp-intro-desc fade-up fade-up-delay-2">
              自主研发专利技术，采用独特分散模块实现粉体与溶剂的快速充分混合。其独立的自循环分散系统可高效完成浆料均匀混合，确保稳定性和一致性。
              系统采用简便传动结构，在保证高扭矩输出的同时显著降低故障率，极大提高了匀浆效率和设备稼动率。
            </p>
            <div className="cp-sol-hero-pills fade-up fade-up-delay-3">
              <span>高固含量浆料</span>
              <span>全流程自动化</span>
              <span>零堵料风险</span>
              <span>可视化管控</span>
              <span>无金属污染</span>
              <span>多型号可选</span>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            方案视频（模拟播放器）
            ═══════════════════════════════════════ */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">方案视频</h2>
            <p className="section-desc section-desc--center fade-up fade-up-delay-1">
              高效循环制浆系统由粉料上料、粉料混合、分散制浆、液体双循环四大模块组成，
              以"必然式"制浆工艺实现高固含量浆料的高效、稳定制备。
            </p>
            <div className="cp-video-mock fade-up fade-up-delay-2">
              <img
                src="/ref-images/upfile_image_20240117_1705474607_843293.png"
                alt="方案视频封面"
                className="cp-video-mock-poster"
              />
              <div className={`cp-video-mock-overlay ${videoPlayed ? 'cp-video-mock-overlay--played' : ''}`}>
                {!videoPlayed ? (
                  <button
                    className="cp-video-play-btn"
                    onClick={() => setVideoPlayed(true)}
                    aria-label="播放方案介绍视频"
                  >
                    <span className="cp-video-play-ring" />
                    <span className="cp-video-play-icon">▶</span>
                  </button>
                ) : (
                  <div className="cp-video-played-state">
                    <div className="cp-video-played-icon">
                      <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5"/>
                        <path d="M9 16l6-4-6-4v8z" fill="white"/>
                      </svg>
                    </div>
                    <p className="cp-video-played-text">视频制作中，敬请期待</p>
                    <button className="cp-video-played-reset" onClick={() => setVideoPlayed(false)}>返回</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            方案特点（双色图标卡片，3列）
            ═══════════════════════════════════════ */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">方案特点</h2>
            <div className="cp-feat-icon-grid">
              {features.map(({ Icon, title, desc }, i) => (
                <div key={i} className={`cp-feat-icon-card fade-up fade-up-delay-${(i % 3) + 1}`}>
                  <div className="cp-feat-icon-wrap">
                    <Icon />
                  </div>
                  <h3 className="cp-feat-icon-title">{title}</h3>
                  <p className="cp-feat-icon-desc">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            包含系统（6个子系统跳转卡片）
            ═══════════════════════════════════════ */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">包含系统</h2>
            <p className="section-desc section-desc--center fade-up fade-up-delay-1">
              高效循环制浆系统集成六大子系统，协同运作，实现从原料上料到浆料产出的全流程自动化。
            </p>
            <div className="cp-systems-grid">
              {subSystems.map((sys, i) => (
                <Link
                  key={i}
                  to={sys.path}
                  className={`cp-system-card fade-up fade-up-delay-${(i % 3) + 1}`}
                >
                  <div className="cp-system-img-wrap">
                    <img src={sys.img} alt={sys.name} className="cp-system-img" loading="lazy" />
                    <div className="cp-system-overlay">
                      <span className="cp-system-arrow"><IconArrowRightOutline24 size={20} /></span>
                    </div>
                  </div>
                  <div className="cp-system-info">
                    <span className="cp-system-num">{sys.num}</span>
                    <h3 className="cp-system-name">{sys.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            技术亮点（卡片格式，3列）
            ═══════════════════════════════════════ */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">技术亮点</h2>
            <div className="cp-tech-grid">
              {techHighlights.map((item, i) => (
                <div key={i} className={`cp-tech-card fade-up fade-up-delay-${(i % 3) + 1}`}>
                  <div className="cp-tech-card-img-outer">
                    <div className="cp-tech-card-img-ring">
                      <div className="cp-tech-card-img-wrap">
                        <img src={item.img} alt={item.title} className="cp-tech-card-img" loading="lazy" />
                      </div>
                    </div>
                  </div>
                  <div className="cp-tech-card-body">
                    <h3 className="cp-tech-card-title">{item.title}</h3>
                    <p className="cp-tech-card-desc">{item.desc}</p>
                  </div>
                  <span className="cp-tech-card-num">{item.num}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            客户案例（左右切换轮播）
            ═══════════════════════════════════════ */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <div className="cp-carousel-header fade-up">
              <h2 className="section-heading cp-carousel-heading">客户案例</h2>
              <div className="cp-carousel-nav">
                <span className="cp-carousel-count">
                  {String(caseIndex + 1).padStart(2, '0')} / {String(totalCases).padStart(2, '0')}
                </span>
                <button className="cp-carousel-btn" onClick={prevCase} aria-label="上一个案例">
                  <IconChevronLeftOutline24 size={20} />
                </button>
                <button className="cp-carousel-btn" onClick={nextCase} aria-label="下一个案例">
                  <IconChevronRightOutline24 size={20} />
                </button>
              </div>
            </div>

            <div className="cp-carousel-body" key={caseIndex}>
              <div className="cp-carousel-img-col">
                <img
                  src={currentCase.img}
                  alt={currentCase.client}
                  className="cp-carousel-img"
                  loading="lazy"
                />
              </div>
              <div className="cp-carousel-content-col">
                <span className="cp-carousel-tag">{currentCase.tag}</span>
                <h3 className="cp-carousel-client">{currentCase.client}</h3>
                <p className="cp-carousel-desc">{currentCase.desc}</p>
                <div className="cp-carousel-metrics">
                  {currentCase.metrics.map((m, i) => (
                    <div key={i} className="cp-carousel-metric">
                      <span className="cp-carousel-metric-value">{m.value}</span>
                      <span className="cp-carousel-metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="cp-carousel-dots fade-up fade-up-delay-2">
              {customerCases.map((_, i) => (
                <button
                  key={i}
                  className={`cp-carousel-dot ${i === caseIndex ? 'cp-carousel-dot--active' : ''}`}
                  onClick={() => setCaseIndex(i)}
                  aria-label={`切换到案例 ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════
            技术咨询表单（与联系页一致）
            ═══════════════════════════════════════ */}
        <section className="page-section cp-inquiry-section">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">技术咨询</h2>
            <p className="section-desc section-desc--center fade-up fade-up-delay-1">
              留下您的联系方式,专业技术团队将在 24 小时内与您联系,为您量身定制解决方案。
            </p>
            {formSubmitted ? (
              <div className="contact-submit-success fade-up">
                <IconCircleCheckOutline24 size={56} className="contact-success-icon" />
                <h3>咨询已提交！</h3>
                <p>感谢您的咨询，我们的技术团队将在24小时内与您联系。</p>
                <button className="btn-primary" onClick={() => setFormSubmitted(false)}>继续咨询</button>
              </div>
            ) : (
              <div className="contact-form-wrapper fade-up fade-up-delay-2">
                <div
                  className="contact-brand-panel"
                  style={{ backgroundImage: `url(${inquiryBgImg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                >
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
                <form className="contact-form" onSubmit={handleFormSubmit}>
                  <div className="contact-form-row">
                    <div className="contact-form-field">
                      <label className="contact-form-label" htmlFor="cp-name">姓名 *</label>
                      <input type="text" id="cp-name" name="name" className="contact-form-input" placeholder="您的姓名" value={formData.name} onChange={handleFormChange} required />
                    </div>
                    <div className="contact-form-field">
                      <label className="contact-form-label" htmlFor="cp-phone">联系电话 *</label>
                      <input type="tel" id="cp-phone" name="phone" className="contact-form-input" placeholder="您的电话号码" value={formData.phone} onChange={handleFormChange} required />
                    </div>
                    <div className="contact-form-field">
                      <label className="contact-form-label" htmlFor="cp-email">电子邮箱</label>
                      <input type="email" id="cp-email" name="email" className="contact-form-input" placeholder="您的邮箱（选填）" value={formData.email} onChange={handleFormChange} />
                    </div>
                  </div>
                  <div className="contact-form-row">
                    <div className="contact-form-field">
                      <label className="contact-form-label" htmlFor="cp-company">公司名称 *</label>
                      <input type="text" id="cp-company" name="company" className="contact-form-input" placeholder="您所在的公司" value={formData.company} onChange={handleFormChange} required />
                    </div>
                    <div className="contact-form-field">
                      <label className="contact-form-label" htmlFor="cp-industry">所属行业</label>
                      <select id="cp-industry" name="industry" className="contact-form-select" value={formData.industry} onChange={handleFormChange}>
                        <option value="">请选择行业</option>
                        {industryOptions.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                      </select>
                    </div>
                    <div className="contact-form-field" />
                  </div>
                  <div className="contact-form-field">
                    <label className="contact-form-label" htmlFor="cp-needs">需求描述 *</label>
                    <textarea id="cp-needs" name="needs" className="contact-form-textarea" placeholder="请简要描述您的工艺需求、物料类型、产能要求等信息" rows={6} value={formData.needs} onChange={handleFormChange} required />
                  </div>
                  <button type="submit" className="btn-primary">
                    提交咨询
                    <IconArrowRightOutline24 size={18} />
                  </button>
                </form>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
