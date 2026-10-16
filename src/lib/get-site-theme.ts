import config from '@payload-config'
import { getPayload } from 'payload'
import { cache } from 'react'
import { DEFAULT_THEME, resolveTheme, type ThemeColors } from './site-theme'

export const getSiteTheme = cache(async (): Promise<ThemeColors> => {
  try {
    const payload = await getPayload({ config })
    const settings = await payload.findGlobal({ slug: 'site-theme', overrideAccess: false })
    return resolveTheme(settings)
  } catch {
    return DEFAULT_THEME
  }
})
