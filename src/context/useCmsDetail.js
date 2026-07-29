import { useContext } from 'react'
import { CmsDetailContext } from './cmsDetailContext'

export function useCmsDetail() {
  return useContext(CmsDetailContext)
}

export function useCmsSection(component) {
  const { detail } = useCmsDetail()
  return detail?.sections?.find(
    (section) => section.__component === component && section.visible !== false,
  ) || null
}

export function useCmsDataTable(datasetKey) {
  const { detail, status } = useCmsDetail()
  const tableSection = detail?.sections?.find((section) => (
    section.__component === 'content.data-table'
    && (!datasetKey || section.datasetKey === datasetKey)
  ))
  const visible = status === 'loading'
    ? false
    : status === 'ready'
      ? Boolean(tableSection && tableSection.visible !== false)
      : true

  return {
    section: tableSection || null,
    dataset: tableSection ? detail.datasets?.[tableSection.datasetKey] || null : null,
    visible,
    title: tableSection?.title || null,
    layoutVariant: tableSection?.layoutVariant || 'scroll',
    datasetView: tableSection?.datasetView || null,
  }
}

export function useCmsDataset(datasetKey) {
  const table = useCmsDataTable(datasetKey)
  return table.visible ? table.dataset : null
}
