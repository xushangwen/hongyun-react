import { createContext } from 'react'

export const emptyCmsDetailState = {
  detail: null,
  status: 'idle',
  error: null,
}

export const CmsDetailContext = createContext(emptyCmsDetailState)
