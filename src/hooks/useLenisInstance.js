import { useContext } from 'react'
import { LenisContext } from '../context/lenisContextValue'

export function useLenisInstance() {
  return useContext(LenisContext)
}
