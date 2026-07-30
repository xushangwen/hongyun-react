import { useEffect, useMemo, useState } from 'react'
import { getCmsSite } from '../services/cmsApi'
import { SiteSettingsContext } from './siteSettingsContext'

export default function SiteSettingsProvider({ children }) {
  const [state, setState] = useState({ settings: null, status: 'loading' })

  useEffect(() => {
    const controller = new AbortController()
    getCmsSite(controller.signal)
      .then((settings) => setState({ settings, status: 'ready' }))
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.warn('[CMS] 站点设置读取失败，继续使用本地默认信息')
          setState({ settings: null, status: 'error' })
        }
      })
    return () => controller.abort()
  }, [])

  const value = useMemo(() => state, [state])
  return <SiteSettingsContext.Provider value={value}>{children}</SiteSettingsContext.Provider>
}
