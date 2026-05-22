const FOUNDING_YEAR = 1993

// 红运机械成立于 1993 年。客户口径"今年 34 年"——把成立年算作第 1 年，
// 因此 2026 = 第 34 年。等同于 (当前年 - 成立年 + 1)，每跨一个自然年自动 +1。
export function getCompanyYears(now = new Date()) {
  return now.getFullYear() - FOUNDING_YEAR + 1
}

export const COMPANY_FOUNDING_YEAR = FOUNDING_YEAR
