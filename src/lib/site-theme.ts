export type ThemeColors = {
  primary: string
  primaryDark: string
  accent: string
  ink: string
  pageBg: string
  paper: string
}

export const THEME_COLOR_KEYS = ['primary', 'primaryDark', 'accent', 'ink', 'pageBg', 'paper'] as const

export const DEFAULT_THEME: ThemeColors = {
  primary: '#016ac6',
  primaryDark: '#004392',
  accent: '#0070c6',
  ink: '#16213e',
  pageBg: '#ffffff',
  paper: '#eef4fb',
}

export const THEME_PRESETS: { label: string; colors: ThemeColors }[] = [
  { label: 'น้ำเงิน (ค่าเริ่มต้น)', colors: DEFAULT_THEME },
  {
    label: 'เขียวมรกต',
    colors: { primary: '#0b8a5f', primaryDark: '#06613f', accent: '#0f9d6e', ink: '#12261f', pageBg: '#ffffff', paper: '#eef8f3' },
  },
  {
    label: 'ม่วง',
    colors: { primary: '#6d3fc4', primaryDark: '#47268a', accent: '#7a4fd3', ink: '#1e1636', pageBg: '#ffffff', paper: '#f3effb' },
  },
  {
    label: 'แดงกลาง',
    colors: { primary: '#c62828', primaryDark: '#8e1a1a', accent: '#d32f2f', ink: '#2a1414', pageBg: '#ffffff', paper: '#fbefef' },
  },
  {
    label: 'ส้มอบอุ่น',
    colors: { primary: '#d9650b', primaryDark: '#9c4506', accent: '#e8730f', ink: '#2b1b0e', pageBg: '#ffffff', paper: '#fdf2e8' },
  },
  {
    label: 'ดำ-เทา',
    colors: { primary: '#2f3a4a', primaryDark: '#151c26', accent: '#475569', ink: '#111827', pageBg: '#ffffff', paper: '#f1f3f6' },
  },
]

const HEX = /^#[0-9a-f]{6}$/i

export const isHexColor = (value: unknown): value is string => typeof value === 'string' && HEX.test(value.trim())

export function resolveTheme(input?: Partial<Record<keyof ThemeColors, string | null>> | null): ThemeColors {
  const out = { ...DEFAULT_THEME }
  for (const key of THEME_COLOR_KEYS) {
    const v = input?.[key]
    if (isHexColor(v)) out[key] = v.trim().toLowerCase()
  }
  return out
}

/** CSS appended after styles.css; values are validated hex so this is injection-safe. */
export function buildThemeCss(theme: ThemeColors): string {
  return `:root{--brand-blue:${theme.primary};--brand-blue-dark:${theme.primaryDark};--accent:${theme.accent};--ink:${theme.ink};--page-bg:${theme.pageBg};--paper:${theme.paper}}`
}
