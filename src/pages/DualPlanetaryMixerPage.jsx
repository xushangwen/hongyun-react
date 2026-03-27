import React, { useEffect, useState } from 'react'
import Breadcrumb from '../components/Breadcrumb'
import TechInquirySection from '../components/TechInquirySection'
import DotGridCanvas from '../components/DotGridCanvas'
import productImg from '../assets/img/双行星动力混合机-removebg.png'

/* ══════════════════════════════════════════════════════════
   SVG 图标组件（来自 prds-icon-01）
   主体: fill/stroke "#1E1E1E"  accent: fill/stroke "#BA0C2F"
   ══════════════════════════════════════════════════════════ */

/* infinite.svg — 性能稳定（刷新循环） */
function IconInfinite() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <g fill="#1E1E1E">
        <path d="M437.02,74.981C388.667,26.629,324.38,0,256,0v30c124.617,0,226,101.383,226,226S380.617,482,256,482S30,380.617,30,256
          c0-58.326,21.95-113.276,61.935-155.427l21.549,21.549l-0.016-64.421l-64.414-0.008l21.659,21.659C25.066,127.174,0,189.66,0,256
          c0,68.38,26.629,132.667,74.98,181.019C123.333,485.371,187.62,512,256,512s132.667-26.629,181.02-74.981
          C485.371,388.667,512,324.38,512,256S485.371,123.333,437.02,74.981z"/>
        <path d="M209,0c-11.028,0-20,8.972-20,20s8.972,20,20,20s20-8.972,20-20S220.028,0,209,0z"/>
        <path d="M150,19c-11.028,0-20,8.972-20,20s8.972,20,20,20s20-8.972,20-20S161.028,19,150,19z"/>
      </g>
      {/* 中心无穷大符号 — 品牌红 */}
      <path fill="#BA0C2F" d="M372.673,210.038c-25.344-25.343-66.58-25.343-91.924,0L256,234.787l-0.015-0.015l-0.015,0.015
        l-24.749-24.749c-25.344-25.343-66.58-25.343-91.924,0c-25.343,25.344-25.343,66.58,0,91.924
        c12.672,12.672,29.316,19.008,45.962,19.008c16.646,0,33.29-6.336,45.962-19.008l24.749-24.749l0.015,0.015l0.015-0.015
        l24.749,24.749c12.672,12.672,29.316,19.008,45.962,19.008s33.29-6.336,45.962-19.008
        C398.016,276.618,398.016,235.382,372.673,210.038z M210.008,280.749c-13.646,13.646-35.852,13.647-49.498,0
        c-13.646-13.646-13.646-35.851,0-49.497c13.646-13.646,35.852-13.647,49.498,0L234.757,256L210.008,280.749z
        M351.46,280.749c-13.646,13.647-35.852,13.646-49.498,0L277.213,256l24.749-24.749
        c13.646-13.647,35.852-13.647,49.498,0C365.105,244.898,365.105,267.102,351.46,280.749z"/>
    </svg>
  )
}

/* clean-air.svg — 无粉尘密封（云形） */
function IconCleanAir() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 主云形 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="24" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,240)"
          d="m 0,0 c 38.66,0 70,31.34 70,70 0,38.66 -31.34,70 -70,70 -0.616,0 -1.226,-0.03 -1.838,-0.046
             C -8.907,179.762 -43.661,210 -85.5,210 c -41.839,0 -76.592,-30.238 -83.662,-70.046
             c -0.612,0.016 -1.221,0.046 -1.838,0.046 c -38.66,0 -70,-31.34 -70,-70 0,-38.66 31.34,-70 70,-70
             h 326.5 c 47.22,0 85.5,38.28 85.5,85.5 0,47.22 -38.28,85.5 -85.5,85.5
             c -0.687,0 -1.365,-0.036 -2.048,-0.052 C 144.948,219.832 102.316,257 51,257
             C 9.834,257 -25.724,233.07 -42.578,198.373" />
        {/* 风线 — 深灰 */}
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(0,105)" d="M 0,0 H 411.5" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,210)" d="M 0,0 C 0,-24.853 -20.147,-45 -45,-45 H -497" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(497,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45 H -497" />
        <path stroke="#1E1E1E" strokeWidth="22" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(326,0)" d="M 0,0 C 0,24.853 -20.147,45 -45,45" />
      </g>
    </svg>
  )
}

/* productivity.svg — 精准均匀（指针时钟） */
function IconProductivity() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 外环 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(465.9854,256)"
          d="m 0,0 c 0,-115.98 -94.02,-210 -210,-210 -115.979,0 -210,94.02 -210,210 0,115.98 94.021,210 210,210 C -94.02,210 0,115.98 0,0 Z" />
        {/* 内圆弧扇形 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(192.3745,192.3892)"
          d="m 0,0 c -16.296,16.296 -26.389,38.796 -26.389,63.611 0,49.629 40.371,90 90,90 49.629,0 90,-40.371 90,-90
             0,-24.815 -10.093,-47.315 -26.389,-63.611 l 42.403,-42.404 c 27.163,27.162 43.986,64.662 43.986,106.015
             0,82.705 -67.295,150 -150,150 -82.705,0 -150,-67.295 -150,-150 0,-41.353 16.824,-78.853 43.986,-106.015 z" />
        {/* 中心小圆 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(285.9854,256)"
          d="m 0,0 c 0,-16.568 -13.431,-30 -30,-30 -16.568,0 -30,13.432 -30,30 0,16.568 13.432,30 30,30 C -13.431,30 0,16.568 0,0 Z" />
        {/* 指针 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(279.9873,274.001)" d="M 0,0 95.998,71.999" />
        {/* 刻度 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(255.9854,406)" d="M 0,0 V -60" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(255.9854,46)" d="M 0,0 V -46" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(128.4858,476.8364)" d="M 0,0 22.5,-38.971" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(360.9854,74.1348)" d="M 0,0 22.5,-38.971" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(35.1489,383.5)" d="M 0,0 38.971,-22.5" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(437.8506,151)" d="M 0,0 38.972,-22.5" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(-0.0142,256)" d="M 0,0 H 46" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(465.9854,256)" d="M 0,0 H 46" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(35.1489,128.5)" d="M 0,0 38.971,22.5" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(437.8506,361)" d="M 0,0 38.972,22.5" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(128.4854,35.1636)" d="M 0,0 22.5,38.971" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" transform="translate(360.9854,437.8652)" d="M 0,0 22.5,38.971" />
      </g>
    </svg>
  )
}

/* laptop.svg — 智能控制（电脑屏幕+代码） */
function IconLaptop() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      {/* 屏幕框 */}
      <path fill="#1E1E1E" d="M509.297,432L472,245.516V0H40v245.516L2.703,432H0v80h512v-80H509.297z
        M70,30h372v202H70V30z M67.297,262h377.406l34,170H33.297L67.297,262z M482,482H30v-20h452V482z" />
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

/* sustainability.svg — 无磁性异物（叶片循环） */
function IconSustainability() {
  return (
    <svg viewBox="0 0 682.66669 682.66669" fill="none" className="cp-feat-icon-svg">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,682.66667)">
        {/* 四角箭头括号 — 深灰 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(391.5879,377)" d="M 0,0 H 72.271 V 75" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(120.4707,135)" d="M 0,0 H -72.43 V -75" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(377,120.5293)" d="M 0,0 V -72.32 H 75" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(135,391.5293)" d="M 0,0 V 72.445 H -75" />
        {/* 两段大弧 — 深灰 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(196,489.439)"
          d="m 0,0 c 19.177,4.936 39.282,7.561 60,7.561 88.828,0 166.385,-48.257 207.884,-119.986" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(489.4385,316)"
          d="m 0,0 c 4.937,-19.177 7.562,-39.282 7.562,-60 0,-88.816 -48.245,-166.363 -119.957,-207.867" />
        {/* 竖茎 — 深灰 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256.1729,136)" d="M 0,0 -0.056,123.776" />
        {/* 叶片 S 曲线 — 品牌红 */}
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,256)"
          d="m 0,0 h -30 c -49.706,0 -90,40.294 -90,90 h 30 C -40.294,90 0,49.706 0,0 Z" />
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(256,226)"
          d="m 0,0 h 30 c 49.706,0 90,40.294 90,90 H 90 C 40.294,90 0,49.706 0,0 Z" />
        <path stroke="#BA0C2F" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(211,136)" d="M 0,0 H 90" />
        {/* 另两段弧 — 深灰 */}
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(316,22.561)"
          d="m 0,0 c -19.177,-4.936 -39.282,-7.561 -60,-7.561 -88.846,0 -166.416,48.277 -207.909,120.029" />
        <path stroke="#1E1E1E" strokeWidth="30" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10"
          transform="translate(22.5615,196)"
          d="m 0,0 c -4.937,19.177 -7.562,39.282 -7.562,60 0,88.849 48.281,166.421 120.036,207.913" />
      </g>
    </svg>
  )
}

/* recycle.svg — 高精度配料（循环精准） */
function IconRecycle() {
  return (
    <svg viewBox="0 0 507.002 507.002" className="cp-feat-icon-svg">
      {/* 外圈箭头 — 深灰 */}
      <path fill="#1E1E1E" d="m397.938 106.392c-16.449-13.646-34.689-24.872-54.215-33.368l-11.969 27.51c16.933 7.367 32.756 17.106 47.029 28.948z"/>
      <path fill="#1E1E1E" d="m468.799 210.644c-6.584-20.259-16.02-39.491-28.045-57.164l-24.803 16.877c10.429 15.326 18.609 32 24.316 49.561z"/>
      <path fill="#1E1E1E" d="m477.001 244.725-29.625 4.729c1.635 10.243 2.464 20.743 2.464 31.209 0 108.262-88.077 196.34-196.339 196.34s-196.339-88.079-196.339-196.341c0-100.519 72.99-183.211 168.936-195.033v54.069l97.435-72.008-97.435-67.69v55.424c-52.636 5.553-100.987 29.433-137.437 68.205-39.658 42.185-61.499 97.954-61.499 157.033 0 60.458 23.543 117.297 66.293 160.047 42.75 42.749 99.589 66.293 160.046 66.293s117.296-23.544 160.046-66.293c42.75-42.75 66.293-99.589 66.293-160.047 0-12.044-.955-24.136-2.839-35.937zm-220.903-187.354 15.938 11.073-15.938 11.779z"/>
      {/* 内圈实心圆弧 — 品牌红 */}
      <path fill="#BA0C2F" d="m386.581 280.662c0 73.381-59.699 133.08-133.08 133.08s-133.08-59.699-133.08-133.08c0-47.714 25.782-92.05 67.284-115.707l-14.855-26.063c-50.844 28.98-82.429 83.304-82.429 141.77 0 89.923 73.157 163.08 163.08 163.08s163.08-73.157 163.08-163.08c0-60.333-33.086-115.484-86.348-143.933l-14.133 26.463c43.474 23.22 70.481 68.232 70.481 117.47z"/>
    </svg>
  )
}

/* ========== 技术参数数据 ========== */
const allModels = [
  { model: 'HY-XJ-5L',    designVol: '7.4L',   workVol: '5L',    tankDim: 'Φ250↓150',   mixerKW: '1.5',  revSpeed: '0-40',  ownSpeed: '0-86',  dissolverKW: '1.5',  dissolverRPM: '0-5800', linearSpeed: '16.7' },
  { model: 'HY-XJ-10L',   designVol: '14L',    workVol: '10L',   tankDim: 'Φ300↓200',   mixerKW: '2.2',  revSpeed: '0-42',  ownSpeed: '0-72',  dissolverKW: '3',    dissolverRPM: '0-5000', linearSpeed: '18.3' },
  { model: 'HY-XJ-30L',   designVol: '44L',    workVol: '30L',   tankDim: 'Φ400↓350',   mixerKW: '3',    revSpeed: '0-34',  ownSpeed: '0-70',  dissolverKW: '5.5',  dissolverRPM: '0-4000', linearSpeed: '21'   },
  { model: 'HY-XJ-60L',   designVol: '88L',    workVol: '60L',   tankDim: 'Φ500↓450',   mixerKW: '5.5',  revSpeed: '0-34',  ownSpeed: '0-68',  dissolverKW: '7.5',  dissolverRPM: '0-3300', linearSpeed: '21'   },
  { model: 'HY-XJ-100L',  designVol: '149L',   workVol: '100L',  tankDim: 'Φ650↓450',   mixerKW: '15',   revSpeed: '0-34',  ownSpeed: '0-56',  dissolverKW: '18.5', dissolverRPM: '0-2930', linearSpeed: '23'   },
  { model: 'HY-XJ-200L',  designVol: '265L',   workVol: '200L',  tankDim: 'Φ750↓650',   mixerKW: '22',   revSpeed: '0-33',  ownSpeed: '0-53',  dissolverKW: '30',   dissolverRPM: '0-2750', linearSpeed: '23'   },
  { model: 'HY-XJ-300L',  designVol: '369L',   workVol: '300L',  tankDim: 'Φ850↓650',   mixerKW: '30',   revSpeed: '0-33',  ownSpeed: '0-53',  dissolverKW: '37',   dissolverRPM: '0-2200', linearSpeed: '23'   },
  { model: 'HY-XJ-650L',  designVol: '822L',   workVol: '650L',  tankDim: 'Φ1100↓865',  mixerKW: '45',   revSpeed: '0-28',  ownSpeed: '0-47',  dissolverKW: '55',   dissolverRPM: '0-1750', linearSpeed: '23'   },
  { model: 'HY-XJ-900L',  designVol: '1390L',  workVol: '900L',  tankDim: 'Φ1300↓1050', mixerKW: '75',   revSpeed: '0-24',  ownSpeed: '0-32',  dissolverKW: '75',   dissolverRPM: '0-1450', linearSpeed: '23'   },
  { model: 'HY-XJ-1200L', designVol: '2126L',  workVol: '1200L', tankDim: 'Φ1500↓1150', mixerKW: '90',   revSpeed: '0-18',  ownSpeed: '0-28',  dissolverKW: '90',   dissolverRPM: '0-1375', linearSpeed: '23'   },
  { model: 'HY-XJ-1500L', designVol: '2300L',  workVol: '1500L', tankDim: 'Φ1500↓1300', mixerKW: '110',  revSpeed: '0-18',  ownSpeed: '0-28',  dissolverKW: '110',  dissolverRPM: '0-1375', linearSpeed: '23'   },
]

/* ========== 产品型号展示数据 ========== */
const productModels = [
  {
    name: '实验室型',
    fullName: '实验室型双行星动力混合机',
    img: '/assets/img/prd-02.jpg',
    desc: '适用于研发、小批量实验及工艺验证，紧凑轻便，操作简洁，与量产机型保持工艺一致性。',
  },
  {
    name: '桶体翻转型',
    fullName: '桶体翻转型双行星动力混合机',
    img: '/assets/img/prd-01.jpg',
    desc: '桶体可翻转出料，适用于高粘度物料的便捷出料作业，显著减少残料损耗与清洗时间。',
  },
  {
    name: '450L 小型',
    fullName: '450L 小型双行星动力混合机',
    img: '/assets/img/prd-03.jpeg',
    desc: '面向中小批量生产设计，集成液压升降系统，兼顾产能与灵活性，是量产产线的高性价比之选。',
  },
]

/* ========== 产品介绍数据（技术亮点风格）========== */
const techHighlights = [
  {
    num: '01',
    title: '6 级精度硬齿面齿轮',
    desc: '采用 6 级精度硬齿面齿轮，中心距严格控制，齿侧间隙合理，摆动间隙小，运行轨迹更加精准，匀浆的均匀性和生产效率更高。',
    img: '/ref-images/image_20221018_1666072747_127247.png',
  },
  {
    num: '02',
    title: '行星传动精准运行',
    desc: '行星轮系齿比为 1.57:1，运行时搅拌机的分散盘搅拌桨实现既公转、又自转的行星运动，混合无死角。',
    img: '/ref-images/image_20221018_1666072721_735597.png',
  },
  {
    num: '03',
    title: '简支梁轴结构，抗共振',
    desc: '行星轴采用简支梁结构，支承刚度大，拥有更高的临界转速，在高转速工况时设备不会出现共振。',
    img: '/ref-images/image_20221018_1666072707_344772.png',
  },
  {
    num: '04',
    title: '硅胶弹性密封，无尘出料',
    desc: '行星箱采用独有硅胶弹性密封板，无积灰区，密封可靠。可充氮形成微正压区，抑制粉尘上扬，出料时不会掉落干粉。',
    img: '/ref-images/image_20221018_1666072668_446043.png',
  },
  {
    num: '05',
    title: '多重组合密封，防污保洁',
    desc: '骨架油封、迷宫密封（气密封）、静密封等多重组合密封提高分散轴承寿命，保证物料安全。设计储油腔，泄漏润滑油直接进入储油腔，不污染物料。',
    img: '/ref-images/image_20221018_1666072660_763600.png',
  },
]

/* ========== 客户案例数据 ========== */
const cases = [
  {
    group: '全自动加投料系统解决方案',
    images: [
      { src: '/assets/images/products/pd-mixer/case-system-1.jpg', alt: '全自动加投料系统设备' },
      { src: '/assets/images/products/pd-mixer/case-system-2.jpg', alt: '全自动加投料系统现场', className: 'pdm-case-img--fill-height' },
    ],
  },
  {
    group: 'EV 电池匀浆车间',
    images: [
      { src: '/assets/images/products/pd-mixer/case-ev-equipment.jpg', alt: 'EV电池匀浆车间设备' },
      { src: '/assets/images/products/pd-mixer/case-ev-site.jpg',      alt: 'EV电池匀浆车间现场照' },
      { src: '/assets/images/products/pd-mixer/case-ev-full.jpg',      alt: 'EV电池匀浆车间全套设备' },
    ],
  },
  {
    group: '3C 电池匀浆车间',
    images: [
      { src: '/assets/images/products/pd-mixer/case-3c-equipment.jpg', alt: '3C电池匀浆车间半自动加投料系统设备' },
      { src: '/assets/images/products/pd-mixer/case-3c-site.jpg',      alt: '3C电池匀浆车间现场照' },
    ],
  },
]

/* ========== 参数表组件 ========== */
function ParamsTable({ data }) {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table">
        <thead>
          <tr>
            <th>型号<br /><span className="th-sub">Model</span></th>
            <th>设计容积<br /><span className="th-sub">Design volume</span></th>
            <th>使用容积<br /><span className="th-sub">Working volume</span></th>
            <th>搅拌桶内尺寸<br /><span className="th-sub">Tank dim (mm)</span></th>
            <th>公转电机<br /><span className="th-sub">Mixer motor (kW)</span></th>
            <th>公转转速<br /><span className="th-sub">Rev. speed (rpm)</span></th>
            <th>搅拌转速<br /><span className="th-sub">Own speed (rpm)</span></th>
            <th>分散电机<br /><span className="th-sub">Disperser motor (kW)</span></th>
            <th>分散转速<br /><span className="th-sub">Disperser RPM</span></th>
            <th>线速度<br /><span className="th-sub">Linear speed (m/s)</span></th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.designVol}</td>
              <td>{row.workVol}</td>
              <td>{row.tankDim}</td>
              <td>{row.mixerKW}</td>
              <td>{row.revSpeed}</td>
              <td>{row.ownSpeed}</td>
              <td>{row.dissolverKW}</td>
              <td>{row.dissolverRPM}</td>
              <td>{row.linearSpeed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default function DualPlanetaryMixerPage() {
  const [videoPlayed, setVideoPlayed] = useState(false)

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
      {/* ===== Hero — 灰色背景，两栏布局 ===== */}
      <section className="pdm-hero">
        <DotGridCanvas />
        <div className="page-container">
          <div className="pdm-intro-grid pdm-hero-body">
            <div className="pdm-intro-content">
              <span className="pdm-intro-label fade-up">新能源行业核心装备</span>
              <h1 className="pdm-intro-name fade-up fade-up-delay-1">
                双行星动力<sup>™</sup>混合机
              </h1>

              <p className="pdm-intro-desc fade-up fade-up-delay-2">
                双行星动力混合机（PD搅拌机）通常具有一个或多个搅拌桨和分散盘，它们围绕釜体轴线公转的同时，也围绕自身轴线自转。通过搅拌桨和分散盘的行星运动，使物料受到剪切和捏合作用，实现混合。是一种<strong>无死角的动力混合、分散设备</strong>。
              </p>
              <p className="pdm-intro-desc fade-up fade-up-delay-2">
                广泛应用于新能源浆料制备、粘合剂、化工涂料、塑料、制药、食品等行业的固-固相、固-液相、液-液相物料的混合、反应、分散、溶解、均质、乳化等工艺过程。
              </p>
            </div>
            <div className="pdm-intro-visual fade-up fade-up-delay-2">
              <img src={productImg} alt="双行星动力™混合机（PD搅拌机）" className="pdm-hero-product-img" />
            </div>
          </div>
        </div>
      </section>

      <Breadcrumb items={[
        { label: '产品中心', path: '/products' },
        { label: '新能源行业', path: '/products#products-new-energy' },
        { label: '双行星动力混合机' },
      ]} />

      <div className="page-body">

        {/* ===== 产品特点 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">产品特点</h2>
            <div className="cp-feat-icon-grid">
              {[
                { Icon: IconInfinite,      title: '性能稳定，故障偶发率大幅降低', desc: '经长期量产验证，传动结构可靠，运转平稳，故障偶发率大幅降低，保障产线持续稳定运行。' },
                { Icon: IconCleanAir,      title: '投料无粉尘，搅拌过程密封防尘', desc: '密封投料设计，搅拌过程中粉尘不外溢，有效优化使用环境，保障操作人员安全健康。' },
                { Icon: IconProductivity,  title: '搅拌均匀无死角，浆料均匀度提升', desc: '桨自转轨迹不重复，搅拌均匀无死角，大幅提升浆料均匀度，批次间一致性卓越。' },
                { Icon: IconLaptop,        title: '智能控制，无需人工干预', desc: '全自动 PLC 控制系统，工艺参数数字化设定与执行，无需人工操作，降低人工错误风险。' },
                { Icon: IconSustainability, title: '不增加磁性异物，浆料洁净有保障', desc: '严格的材质选型与密封设计，全流程不引入磁性金属异物，电池浆料洁净度达标。' },
                { Icon: IconRecycle,       title: '高精度配料系统，配比精度高', desc: '配置高精度配料系统，计量精度≤±0.1%，确保每批次配方精准复现，品质稳定可控。' },
              ].map(({ Icon, title, desc }, i) => (
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

        {/* ===== 产品视频 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">产品视频</h2>
            <div className="cp-video-mock fade-up fade-up-delay-1">
              <img
                src={productImg}
                alt="双行星动力混合机视频封面"
                className="cp-video-mock-poster"
              />
              <div className={`cp-video-mock-overlay${videoPlayed ? ' cp-video-mock-overlay--played' : ''}`}>
                {!videoPlayed ? (
                  <button
                    className="cp-video-play-btn"
                    onClick={() => setVideoPlayed(true)}
                    aria-label="播放产品视频"
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

        {/* ===== 产品介绍（技术亮点风格）===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">产品介绍</h2>
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

        {/* ===== 产品型号展示 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading section-heading--center fade-up">产品型号</h2>
            <div className="pdm-models-grid">
              {productModels.map((m, i) => (
                <div key={i} className={`pdm-model-card fade-up fade-up-delay-${i + 1}`}>
                  <div className="pdm-model-image-wrap">
                    <img src={m.img} alt={m.fullName} className="pdm-model-img" />
                    <span className="pdm-model-num">{String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="pdm-model-info">
                    <span className="pdm-model-badge">{m.name}</span>
                    <h3 className="pdm-model-title">{m.fullName}</h3>
                    <p className="pdm-model-desc">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== 技术参数 ===== */}
        <section className="page-section page-section--gray">
          <div className="page-container">
            <h2 className="section-heading section-heading--underline fade-up">技术参数</h2>
            <h3 className="pdm-table-subtitle fade-up fade-up-delay-1">
              双行星动力™混合机覆盖5 L–1500 L全系列规格，满足从实验室验证到GWh量产的全场景需求。
            </h3>
            <div className="fade-up fade-up-delay-2">
              <ParamsTable data={allModels} />
            </div>
            <p className="pdm-table-note fade-up fade-up-delay-3">
              * 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。
            </p>
          </div>
        </section>

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <h2 className="section-heading section-heading--underline fade-up">客户案例</h2>
            <p className="section-desc fade-up fade-up-delay-1">
              服务全球新能源头部客户，从实验室验证到 GWh 量产产线，红运机械全程提供装备保障。
            </p>
            {cases.map((c, gi) => (
              <div key={gi} className={`pdm-case-group fade-up fade-up-delay-${gi + 2}`}>
                <div className="pdm-case-group-header">
                  <span className="pdm-case-group-index">{String(gi + 1).padStart(2, '0')}</span>
                  <h3 className="pdm-case-group-title">{c.group}</h3>
                </div>
                <div className={`pdm-case-images pdm-case-images--${c.images.length}`}>
                  {c.images.map((img, ii) => (
                    <div key={ii} className="pdm-case-image-wrap">
                      <img src={img.src} alt={img.alt} className={`pdm-case-img ${img.className || ''}`} loading="lazy" />
                      <div className="pdm-case-image-overlay">
                        <span>{img.alt}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ===== 技术咨询 CTA ===== */}
        <TechInquirySection />

      </div>
    </>
  )
}
