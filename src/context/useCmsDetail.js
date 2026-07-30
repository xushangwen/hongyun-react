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

function inlineDataset(section) {
  if (!Array.isArray(section?.columns) || !Array.isArray(section?.rows)) return null
  return {
    title: section.title,
    kind: 'spec-table',
    schemaVersion: 1,
    columns: section.columns,
    headerGroups: Array.isArray(section.headerGroups) ? section.headerGroups : [],
    rows: section.rows,
    unitNotes: section.unitNotes || '',
  }
}

function resolveTable(detail, section) {
  if (!section) return null
  return inlineDataset(section) || detail?.datasets?.[section.datasetKey] || null
}

export function useCmsDataTables() {
  const { detail, status } = useCmsDetail()
  if (status !== 'ready') return []
  return (detail?.sections || [])
    .filter((section) => section.__component === 'content.data-table' && section.visible !== false)
    .map((section) => ({
      section,
      dataset: resolveTable(detail, section),
      title: section.title || null,
      layoutVariant: section.layoutVariant || 'scroll',
      datasetView: section.datasetView || null,
      unitNotes: section.unitNotes || '',
    }))
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
    dataset: resolveTable(detail, tableSection),
    visible,
    title: tableSection?.title || null,
    layoutVariant: tableSection?.layoutVariant || 'scroll',
    datasetView: tableSection?.datasetView || null,
    unitNotes: tableSection?.unitNotes || '',
  }
}

export function useCmsDataset(datasetKey) {
  const table = useCmsDataTable(datasetKey)
  return table.visible ? table.dataset : null
}
