import React, { useEffect, useState } from 'react'
import PageHero from '../components/PageHero'
import Breadcrumb from '../components/Breadcrumb'
import SystemFeaturesSection from '../components/SystemFeaturesSection'
import TechInquirySection from '../components/TechInquirySection'

const IMG = '/assets/images/solutions/twin-screw-pulping'

/* ========== 系统特点 SVG 图标（复用自 CirculationPulpingPage） ========== */

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

function IconFilter() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <polyline stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" points="437,497 437,255 286,255" />
      <polyline stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" points="75,497 75,255 226,255" />
      <polygon stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" points="286,316 286,255 346,195 346,135 166,135 166,195 226,255 226,316" />
      <line stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" x1="166" y1="195" x2="346" y2="195" />
      <line stroke="#1E1E1E" strokeWidth="30" strokeMiterlimit="10" x1="30" y1="497" x2="482" y2="497" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="190.667" y1="377" x2="120" y2="377" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="291.333" y1="377" x2="220.667" y2="377" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="392" y1="377" x2="321.333" y2="377" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="190.667" y1="437" x2="120" y2="437" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="291.333" y1="437" x2="220.667" y2="437" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="392" y1="437" x2="321.333" y2="437" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="241" y1="75" x2="271" y2="75" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="211" y1="15" x2="241" y2="15" />
      <line stroke="#BA0C2F" strokeWidth="30" strokeMiterlimit="10" x1="301" y1="45" x2="331" y2="45" />
    </svg>
  )
}

function IconLike() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10"
        d="M105.721,467H161.7l59.723,30h174.399c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h11c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5h12c17.949,0,32.5-14.551,32.5-32.5
           c0-17.947-14.547-32.496-32.494-32.5h14.952c17.949,0,32.5-14.551,32.5-32.5s-14.551-32.5-32.5-32.5
           h-99.458v-58.528c0-34.808-28.218-63.026-63.026-63.026l-12.793,83.414C252.05,240.933,215.856,272,173.29,272h-68.569" />
      <rect x="45.721" y="242" stroke="#1E1E1E" strokeWidth="28" strokeMiterlimit="10" width="60" height="255" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="177.321" y1="31" x2="223.321" y2="77" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="409.321" y1="31" x2="363.321" y2="77" />
      <line stroke="#BA0C2F" strokeWidth="28" strokeMiterlimit="10" x1="293.321" y1="0" x2="293.321" y2="59" />
    </svg>
  )
}

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

function IconLaptop() {
  return (
    <svg viewBox="0 0 512 512" fill="none" className="cp-feat-icon-svg">
      <path fill="#1E1E1E" d="M509.297,432L472,245.516V0H40v245.516L2.703,432H0v80h512v-80H509.297z
        M70,30h372v202H70V30z M67.297,262h377.406l34,170H33.297L67.297,262z M482,482H30v-20h452V482z" />
      <rect fill="#1E1E1E" x="180" y="382" width="152" height="30" />
      <rect fill="#1E1E1E" x="352" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="402" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="80" y="382" width="30" height="30" />
      <rect fill="#1E1E1E" x="130" y="382" width="30" height="30" />
      <rect fill="#BA0C2F" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -20.8368 223.4203)"
        x="193.735" y="121.863" width="131.079" height="30" />
      <polygon fill="#BA0C2F" points="176.292,96.87 155.467,75.274 98.391,130.313 155.467,185.352 176.292,163.756 141.609,130.313" />
      <polygon fill="#BA0C2F" points="356.533,75.274 335.708,96.87 370.391,130.313 335.708,163.756 356.533,185.352 413.609,130.313" />
    </svg>
  )
}

/* ========== 系统特点数据 ========== */
const features = [
  { Icon: IconDevelopment, title: '低功耗、高效率' },
  { Icon: IconConnect,     title: '自动配料，连续制浆一体化' },
  { Icon: IconFilter,      title: '高效捏合及分散' },
  { Icon: IconLike,        title: '产能范围广（30–3000 L/h）' },
  { Icon: IconLeaf,        title: '模块化设计，占用空间小' },
  { Icon: IconLaptop,      title: '全自动化控制，易维护' },
]

/* ========== 参数汇总数据（OCR） ========== */
const modelParams = [
  { model: 'HY-LGH26',  motor: '18.50',  rpm: '1500.00', diameter: '26.00',  speed: '2.04', output: '48' },
  { model: 'HY-LGH40',  motor: '45.00',  rpm: '1000.00', diameter: '40.00',  speed: '2.09', output: '85' },
  { model: 'HY-LGH50',  motor: '55.00',  rpm: '900.36',  diameter: '50.00',  speed: '2.36', output: '220' },
  { model: 'HY-LGH70',  motor: '110.00', rpm: '700.00',  diameter: '70.00',  speed: '2.57', output: '650' },
  { model: 'HY-LGH95',  motor: '160.00', rpm: '500.00',  diameter: '95.00',  speed: '2.49', output: '1300' },
  { model: 'HY-LGH110', motor: '250.00', rpm: '400.00',  diameter: '110.00', speed: '2.30', output: '1650' },
  { model: 'HY-LGH125', motor: '280.00', rpm: '349.65',  diameter: '125.00', speed: '2.29', output: '2550' },
]

function ParamsTable() {
  return (
    <div className="detail-params-table">
      <table className="params-table pdm-params-table cp-params-table tsp-params-table">
        <thead>
          <tr>
            <th>机型<br /><span className="th-sub">Model</span></th>
            <th>电机功率<br /><span className="th-sub">Motor power (kW)</span></th>
            <th>螺杆转速<br /><span className="th-sub">Screw speed (rpm)</span></th>
            <th>螺杆大径<br /><span className="th-sub">Screw diameter (mm)</span></th>
            <th>线速度<br /><span className="th-sub">Linear speed (m/s)</span></th>
            <th>理论输送量<br /><span className="th-sub">Output (L/h)</span></th>
          </tr>
        </thead>
        <tbody>
          {modelParams.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.model}</td>
              <td>{row.motor}</td>
              <td>{row.rpm}</td>
              <td>{row.diameter}</td>
              <td>{row.speed}</td>
              <td>{row.output}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ========== 稳定性汇总表格（OCR 还原） ========== */
const stabilityRows = [
  {
    group: '58%-700kg/h-550rpm',
    tsi: { overall: '0.08', bottom: '0.08', middle: '0.08', top: '0.08' },
    sedimentation: '无', aggregation: '无', migration: '0.000', dispersion: '0.0918',
  },
  {
    group: '59%-400kg/h-550rpm',
    tsi: { overall: '0.08', bottom: '0.08', middle: '0.08', top: '0.08' },
    sedimentation: '无', aggregation: '无', migration: '0.000', dispersion: '0.1592',
  },
]

function StabilityTable() {
  return (
    <div className="tsp-stability-table-wrap">
      <table className="tsp-stability-table">
        <thead>
          <tr>
            <th rowSpan={2} className="tsp-th-rowspan">组别</th>
            <th colSpan={4}>整体稳定性指数（TSI）</th>
            <th rowSpan={2} className="tsp-th-rowspan">是否有沉降</th>
            <th rowSpan={2} className="tsp-th-rowspan">是否有颗粒团聚</th>
            <th rowSpan={2} className="tsp-th-rowspan">粒子迁移速率</th>
            <th rowSpan={2} className="tsp-th-rowspan">分散均匀性指数</th>
          </tr>
          <tr>
            <th>整体</th>
            <th>底部</th>
            <th>中部</th>
            <th>顶部</th>
          </tr>
        </thead>
        <tbody>
          {stabilityRows.map((row, i) => (
            <tr key={i} className={i % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              <td className="td-model-code">{row.group}</td>
              <td>{row.tsi.overall}</td>
              <td>{row.tsi.bottom}</td>
              <td>{row.tsi.middle}</td>
              <td>{row.tsi.top}</td>
              <td className="tsp-td-none">{row.sedimentation}</td>
              <td className="tsp-td-none">{row.aggregation}</td>
              <td>{row.migration}</td>
              <td className="tsp-td-highlight">{row.dispersion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* ========== 负极 TSI 柱状图（OCR 还原） ========== */
const tsiChartData = {
  maxVal: 0.12,
  yTicks: [0.00, 0.02, 0.04, 0.06, 0.08, 0.10, 0.12],
  series: [
    { label: '52%-500产能', color: '#4472C4' },
    { label: '54%-400产能', color: '#ED7D31' },
    { label: '56%-300产能', color: '#A5A5A5' },
  ],
  groups: [
    { label: 'TSI整体', values: [0.09, 0.11, 0.09] },
    { label: 'TSI底部', values: [0.09, 0.10, 0.09] },
    { label: 'TSI中部', values: [0.10, 0.11, 0.10] },
    { label: 'TSI顶部', values: [0.11, 0.10, 0.09] },
  ],
}

function TsiBarChart() {
  const { maxVal, yTicks, series, groups } = tsiChartData
  return (
    <div className="tsp-bar-chart-card">
      <div className="tsp-bar-chart">
        {/* Y 轴刻度 */}
        <div className="tsp-bar-chart-yaxis">
          {[...yTicks].reverse().map((t) => (
            <span key={t} className="tsp-bar-chart-ytick">{t.toFixed(2)}</span>
          ))}
        </div>
        {/* 主体区域：网格线 + 柱子 */}
        <div className="tsp-bar-chart-body">
          {/* 网格线 */}
          <div className="tsp-bar-chart-gridlines">
            {yTicks.map((t) => (
              <div key={t} className="tsp-bar-chart-gridline"
                style={{ bottom: `${(t / maxVal) * 100}%` }} />
            ))}
          </div>
          {/* 分组柱子 */}
          {groups.map((group, gi) => (
            <div key={gi} className="tsp-bar-group">
              {group.values.map((val, vi) => (
                <div key={vi} className="tsp-bar-item">
                  <span className="tsp-bar-val">{val.toFixed(2)}</span>
                  <div
                    className="tsp-bar"
                    style={{
                      height: `${(val / maxVal) * 100}%`,
                      background: series[vi].color,
                    }}
                  />
                </div>
              ))}
              <p className="tsp-bar-group-label">{group.label}</p>
            </div>
          ))}
        </div>
      </div>
      {/* 图例 */}
      <div className="tsp-bar-legend">
        {series.map((s, i) => (
          <div key={i} className="tsp-bar-legend-item">
            <span className="tsp-bar-legend-dot" style={{ background: s.color }} />
            <span className="tsp-bar-legend-text">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ========== EDS 能谱表（OCR 还原） ========== */
function EdsTable({ title, condition, elements }) {
  return (
    <div className="tsp-eds-table-wrap">
      <div className="tsp-eds-table-header">
        <span className="tsp-eds-spectrum-label">{title}</span>
        <span className="tsp-eds-condition-badge">{condition}</span>
      </div>
      <table className="tsp-eds-table">
        <thead>
          <tr>
            <th>元素</th>
            <th>信号类型</th>
            <th>Wt%</th>
            <th>Wt% Sigma</th>
          </tr>
        </thead>
        <tbody>
          {elements.map((el, i) => (
            <tr key={i} className={el.isTotal ? 'tsp-eds-total-row' : (i % 2 === 0 ? 'tr-even' : 'tr-odd')}>
              <td>{el.element}</td>
              <td>{el.type || ''}</td>
              <td>{el.wt}</td>
              <td>{el.sigma || ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const edsData = [
  {
    title: '谱图1',
    condition: '52%-500kg/h-750rpm',
    imgKey: '极片电镜及EDS能谱-01.webp',
    elements: [
      { element: 'C',  type: 'EDS', wt: '96.17', sigma: '0.14' },
      { element: 'O',  type: 'EDS', wt: '3.83',  sigma: '0.14' },
      { element: '总量', isTotal: true, wt: '100.00' },
    ],
  },
  {
    title: '谱图2',
    condition: '54%-400kg/h-750rpm',
    imgKey: '极片电镜及EDS能谱-02.webp',
    elements: [
      { element: 'C',  type: 'EDS', wt: '97.75', sigma: '0.11' },
      { element: 'O',  type: 'EDS', wt: '2.25',  sigma: '0.11' },
      { element: '总量', isTotal: true, wt: '100.00' },
    ],
  },
  {
    title: '谱图3',
    condition: '56%-300kg/h-750rpm',
    imgKey: '极片电镜及EDS能谱-03.webp',
    elements: [
      { element: 'C',  type: 'EDS', wt: '100.00', sigma: '—' },
      { element: 'Cu', type: 'EDS', wt: '0.00',   sigma: '0.00' },
      { element: '总量', isTotal: true, wt: '100.00', sigma: '0.04' },
    ],
  },
]

// 视频模块开关：true = 显示，false = 隐藏
const SHOW_VIDEO = false

/* ========== 主页面 ========== */
export default function TwinScrewPulpingPage() {
  const [videoPlayed, setVideoPlayed] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible')
        })
      },
      { threshold: 0.1 },
    )
    document.querySelectorAll('.section-heading, .fade-up').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <PageHero
        title="行业解决方案"
        subtitle="Industry Solutions"
        bgImage={`${IMG}/hero-bg.jpg`}
        noScroll
      />

      <div className="page-body">
        <Breadcrumb items={[
          { label: '行业解决方案', path: '/solutions' },
          { label: '新能源行业', path: '/solutions#new-energy' },
          { label: '双螺杆连续制浆系统' },
        ]} />

        {/* ===== 系统介绍 + 方案视频 ===== */}
        <section className="page-section pdm-intro-section">
          <div className="page-container">
            <div className="pdm-intro-grid">
              <div className="pdm-intro-visual tsp-intro-visual fade-up fade-up-delay-1">
                <img
                  src={`${IMG}/product.webp`}
                  alt="双螺杆连续制浆系统"
                  className="cp-intro-product-img"
                  loading="lazy"
                />
              </div>
              <div className="pdm-intro-content">
                <h2 className="pdm-intro-name fade-up fade-up-delay-1">红运双螺杆连续制浆系统</h2>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  红运机械自主研发的双螺杆连续制浆系统采用模块化设计理念，集成自动配料、连续输送、高效捏合及分散、连续制浆于一体，具有低功耗、效率高、占用空间小、易维护等显著优点。
                </p>
                <p className="pdm-intro-desc fade-up fade-up-delay-2">
                  生产过程全自动化控制，产能范围适应性高，可满足 30&thinsp;~&thinsp;3000 L/h 的各种规模锂电浆料生产需求。
                </p>
              </div>
            </div>

            {/* 视频模块（SHOW_VIDEO 控制显隐） */}
            {SHOW_VIDEO && (
              <div className="cp-video-mock fade-up fade-up-delay-2">
                <img
                  src={`${IMG}/product.webp`}
                  alt="方案视频封面"
                  className="cp-video-mock-poster"
                  loading="lazy"
                />
                <div className={`cp-video-mock-overlay${videoPlayed ? ' cp-video-mock-overlay--played' : ''}`}>
                  {!videoPlayed ? (
                    <button
                      className="cp-video-play-btn"
                      onClick={() => setVideoPlayed(true)}
                      aria-label="播放"
                    >
                      <span className="cp-video-play-ring" />
                      <span className="cp-video-play-icon">▶</span>
                    </button>
                  ) : (
                    <div className="cp-video-played-state">
                      <p className="cp-video-played-text">视频制作中，敬请期待</p>
                      <button className="cp-video-played-reset" onClick={() => setVideoPlayed(false)}>返回</button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* ===== 系统特点 ===== */}
        <SystemFeaturesSection features={features} title="系统特点" enLabel="System Features" grayBg />

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

        {/* ===== 客户案例 ===== */}
        <section className="page-section">
          <div className="page-container">
            <p className="section-en-label fade-up">Case</p>
            <h2 className="section-heading section-heading--center fade-up">客户案例</h2>

            {/* ── 正极工艺验证数据 ── */}
            <div className="cp-verify-block fade-up fade-up-delay-1">
              <h3 className="cp-verify-subheading">正极工艺验证数据</h3>

              {/* 流变数据：01+02 合一卡 / 03+04 合一卡，两卡横排 */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">正极工艺验证数据——流变数据</h4>
                <div className="tsp-charts-grid-2">
                  <div className="cp-chart-card">
                    <div className="tsp-card-dual-imgs">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/流变数据-01.webp`} alt="流变数据 01" className="cp-chart-img" loading="lazy" />
                      </div>
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/流变数据-02.webp`} alt="流变数据 02" className="cp-chart-img" loading="lazy" />
                      </div>
                    </div>
                    <p className="cp-chart-caption">剪切变稀，非牛顿流体特性，具备较好的流动和流平性，利于后工序涂布；</p>
                  </div>
                  <div className="cp-chart-card">
                    <div className="tsp-card-dual-imgs">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/流变数据-03.webp`} alt="流变数据 03" className="cp-chart-img" loading="lazy" />
                      </div>
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/流变数据-04.webp`} alt="流变数据 04" className="cp-chart-img" loading="lazy" />
                      </div>
                    </div>
                    <p className="cp-chart-caption">浆料具备一定的触变恢复性，不同产能条件下相同时间内恢复率相当。</p>
                  </div>
                </div>
              </div>

              {/* 稳定性 58% + 59%：两卡横排 */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">正极工艺验证数据——稳定性</h4>
                <div className="tsp-charts-grid-2">
                  <div className="cp-chart-card">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/稳定性-01.webp`} alt="稳定性测试 58%-700kg/h" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">58%-700kg/h — 测试过程中未发现光强显著变化，浆料保持较好稳定性，无沉降，无颗粒团聚现象。</p>
                  </div>
                  <div className="cp-chart-card">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/稳定性-02.webp`} alt="稳定性测试 59%-400kg/h" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">59%-400kg/h — 测试过程中未发现光强显著变化，浆料保持较好稳定性，无沉降，无颗粒团聚现象。</p>
                  </div>
                </div>
              </div>

              {/* 稳定性汇总：OCR 表格 + 图表左 / 描述文字右 */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">正极工艺验证数据——稳定性汇总</h4>
                <StabilityTable />
                <div className="tsp-summary-row">
                  <div className="cp-chart-card tsp-summary-img">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/稳定性-03.webp`} alt="稳定性汇总图表" className="cp-chart-img" loading="lazy" />
                    </div>
                  </div>
                  <p className="tsp-summary-desc">
                    分散均匀性反映了设备最基础的分散能力（一般要求分散均匀性指数 &lt;2）。数据表明双螺杆制浆设备具备较强的分散能力。58% 条件下分散能力相对低于 59%，原因可能在于低固含条件下粘度相对偏低，浆料在双螺杆设备中受到剪切程度相对小一些，更加证明此设备可以适用于高固含浆料。
                  </p>
                </div>
              </div>
            </div>

            {/* ── 负极工艺验证数据 ── */}
            <div className="cp-verify-block fade-up fade-up-delay-2">
              <h3 className="cp-verify-subheading">负极工艺验证数据</h3>

              {/* 浆料流变性：两卡横排 */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">负极工艺验证数据——浆料流变性</h4>
                <div className="tsp-charts-grid-2">
                  <div className="cp-chart-card">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/浆料流变性-01.webp`} alt="浆料流变性 01" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">不同产能条件下浆料随剪切速率增大呈现粘度降低趋势，过程无剪切突变，浆料具备一定的流平特性，满足涂布工艺需求；</p>
                  </div>
                  <div className="cp-chart-card">
                    <div className="cp-chart-img-wrap">
                      <img src={`${IMG}/浆料流变性-02.webp`} alt="浆料流变性 02" className="cp-chart-img" loading="lazy" />
                    </div>
                    <p className="cp-chart-caption">所有浆料都具备一定的触变特性；52%-500kg/h 与 54%-400kg/h 粘度恢复率无显著差异，56%-300kg/h 触变恢复率相对偏低。</p>
                  </div>
                </div>
              </div>

              {/* 浆料稳定性分析 */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">负极工艺验证数据——浆料稳定性分析</h4>
                <div className="tsp-charts-grid-3">
                  {['浆料稳定性分析-01', '浆料稳定性分析-02', '浆料稳定性分析-03'].map((key) => (
                    <div key={key} className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/${key}.webp`} alt={key} className="cp-chart-img" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="tsp-desc-para">沉降层面：三种浆料在测试过程中均未发现光强显著变化现象，浆料均保持较好的稳定性；颗粒团聚：光强曲线未发生显著偏移，表明浆料测试过程未发生颗粒团聚现象。</p>

                <div className="tsp-charts-grid-2 tsp-mt-16">
                  {['浆料稳定性分析-04', '浆料稳定性分析-05'].map((key) => (
                    <div key={key} className="cp-chart-card">
                      <div className="cp-chart-img-wrap">
                        <img src={`${IMG}/${key}.webp`} alt={key} className="cp-chart-img" loading="lazy" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* TSI 柱状图（OCR 还原） */}
                <TsiBarChart />

                <p className="tsp-desc-para">
                  浆料稳定性指数表明了浆料的整体稳定性状况，数据可以看出，三种工艺条件下的浆料无论整体稳定性指数还是局部指数都表明浆料具备较强的稳定性（最高值 0.11，一般浆料 &lt;0.2 为最佳）。
                </p>
              </div>

              {/* 极片电镜及 EDS 能谱 */}
              <div className="cp-verify-subsection">
                <h4 className="cp-verify-sub-title">负极工艺验证数据——极片电镜及 EDS 能谱</h4>
                <div className="tsp-eds-grid">
                  {edsData.map((item) => (
                    <div key={item.title} className="tsp-eds-block">
                      <div className="tsp-eds-sem-wrap">
                        <img
                          src={`${IMG}/${item.imgKey}`}
                          alt={`极片电镜 ${item.condition}`}
                          className="tsp-eds-sem-img"
                          loading="lazy"
                        />
                        <span className="tsp-eds-sem-badge">{item.condition}</span>
                      </div>
                      <EdsTable
                        title={item.title}
                        condition={item.condition}
                        elements={item.elements}
                      />
                    </div>
                  ))}
                </div>
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
