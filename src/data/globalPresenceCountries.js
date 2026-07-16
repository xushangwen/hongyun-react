/*
 * 红运机械全球客户/出口国家清单
 * lng / lat：标注点经纬度（首都或主要工业城市坐标）
 * label：tooltip 显示文案
 * region：分区，用于颜色 / 排序
 *
 * 中国常州（红运总部）为 hub，其他点用 arc 曲线虚线连接。
 */

export const HQ = {
  label: '红运总部 · 江苏常州',
  region: 'cn',
  lng: 119.96,
  lat: 31.62,
}

export const countries = [
  // 亚洲
  { label: '日本',          region: 'asia',    lng: 139.69, lat: 35.69 },
  { label: '韩国',          region: 'asia',    lng: 126.98, lat: 37.57 },
  { label: '印度',          region: 'asia',    lng: 77.21,  lat: 28.61 },
  { label: '越南',          region: 'asia',    lng: 105.83, lat: 21.03 },
  { label: '马来西亚',      region: 'asia',    lng: 101.69, lat: 3.14  },
  { label: '泰国',          region: 'asia',    lng: 100.50, lat: 13.75 },
  { label: '新加坡',        region: 'asia',    lng: 103.82, lat: 1.35  },
  { label: '印度尼西亚',    region: 'asia',    lng: 106.85, lat: -6.21 },
  { label: '菲律宾',        region: 'asia',    lng: 120.98, lat: 14.60 },
  { label: '巴基斯坦',      region: 'asia',    lng: 73.06,  lat: 33.72 },
  { label: '孟加拉国',      region: 'asia',    lng: 90.41,  lat: 23.81 },
  { label: '哈萨克斯坦',    region: 'asia',    lng: 71.43,  lat: 51.18 },
  { label: '伊朗',          region: 'asia',    lng: 51.42,  lat: 35.69 },
  { label: '沙特阿拉伯',    region: 'asia',    lng: 46.72,  lat: 24.63 },
  { label: '阿联酋',        region: 'asia',    lng: 55.27,  lat: 25.20 },
  { label: '以色列',        region: 'asia',    lng: 34.78,  lat: 32.09 },
  { label: '土耳其',        region: 'asia',    lng: 32.86,  lat: 39.93 },

  // 欧洲
  { label: '德国',          region: 'europe',  lng: 13.40,  lat: 52.52 },
  { label: '法国',          region: 'europe',  lng: 2.35,   lat: 48.86 },
  { label: '英国',          region: 'europe',  lng: -0.13,  lat: 51.51 },
  { label: '意大利',        region: 'europe',  lng: 12.50,  lat: 41.90 },
  { label: '西班牙',        region: 'europe',  lng: -3.70,  lat: 40.42 },
  { label: '葡萄牙',        region: 'europe',  lng: -9.14,  lat: 38.72 },
  { label: '荷兰',          region: 'europe',  lng: 4.90,   lat: 52.37 },
  { label: '比利时',        region: 'europe',  lng: 4.35,   lat: 50.85 },
  { label: '瑞士',          region: 'europe',  lng: 7.45,   lat: 46.95 },
  { label: '奥地利',        region: 'europe',  lng: 16.37,  lat: 48.21 },
  { label: '波兰',          region: 'europe',  lng: 21.01,  lat: 52.23 },
  { label: '瑞典',          region: 'europe',  lng: 18.07,  lat: 59.33 },
  { label: '匈牙利',        region: 'europe',  lng: 19.04,  lat: 47.50 },
  { label: '希腊',          region: 'europe',  lng: 23.73,  lat: 37.98 },
  { label: '俄罗斯',        region: 'europe',  lng: 37.62,  lat: 55.75 },
  { label: '乌克兰',        region: 'europe',  lng: 30.52,  lat: 50.45 },

  // 北美
  { label: '美国',          region: 'america', lng: -98.58, lat: 39.83 },
  { label: '加拿大',        region: 'america', lng: -75.70, lat: 45.42 },
  { label: '墨西哥',        region: 'america', lng: -99.13, lat: 19.43 },

  // 南美
  { label: '巴西',          region: 'america', lng: -47.93, lat: -15.78 },
  { label: '阿根廷',        region: 'america', lng: -58.38, lat: -34.60 },
  { label: '智利',          region: 'america', lng: -70.65, lat: -33.45 },
  { label: '哥伦比亚',      region: 'america', lng: -74.08, lat: 4.71  },
  { label: '秘鲁',          region: 'america', lng: -77.03, lat: -12.05 },

  // 大洋洲
  { label: '澳大利亚',      region: 'oceania', lng: 149.13, lat: -35.28 },
  { label: '新西兰',        region: 'oceania', lng: 174.78, lat: -41.29 },

  // 非洲
  { label: '南非',          region: 'africa',  lng: 28.04,  lat: -26.20 },
  { label: '埃及',          region: 'africa',  lng: 31.24,  lat: 30.04 },
  { label: '尼日利亚',      region: 'africa',  lng: 7.49,   lat: 9.06  },
  { label: '摩洛哥',        region: 'africa',  lng: -6.84,  lat: 34.02 },
  { label: '肯尼亚',        region: 'africa',  lng: 36.82,  lat: -1.29 },
]
