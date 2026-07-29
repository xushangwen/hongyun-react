import { useCmsDataTable } from '../context/useCmsDetail'

export default function CmsParameterTableSection({
  children,
  fallbackTitle,
  datasetKey,
  className = 'page-section page-section--gray',
}) {
  const table = useCmsDataTable(datasetKey)
  if (!table.visible) return null

  return (
    <section
      className={`${className} cms-parameter-table cms-parameter-table--${table.layoutVariant}`}
      data-layout-variant={table.layoutVariant}
    >
      <div className="page-container">
        <p className="section-en-label fade-up">Parameters Overview</p>
        <h2 className="section-heading section-heading--center fade-up">
          {table.title || fallbackTitle}
        </h2>
        <div className="fade-up fade-up-delay-1">
          {children}
        </div>
        <p className="cp-table-note fade-up fade-up-delay-3">
          * 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。
        </p>
      </div>
    </section>
  )
}
