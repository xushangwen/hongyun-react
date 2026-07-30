import { useCmsDataTable, useCmsDataTables } from '../context/useCmsDetail'

function displayValue(value) {
  if (value == null) return ''
  if (typeof value === 'boolean') return value ? '是' : '否'
  if (typeof value === 'object') return JSON.stringify(value)
  return String(value)
}

function EditableTable({ dataset }) {
  const rows = Array.isArray(dataset?.rows) ? dataset.rows : []
  const columns = Array.isArray(dataset?.columns) && dataset.columns.length
    ? dataset.columns
    : [...new Set(rows.flatMap((row) => Object.keys(row || {})))].map((id) => ({ id, label: id }))
  if (!columns.length) return <p className="cms-table-empty">该数据表暂时没有内容。</p>
  const sizeClass = columns.length >= 10 ? 'dpm-params-table' : 'cp-params-table'

  return (
    <div className="detail-params-table">
      <table className={`params-table pdm-params-table cms-editable-table ${sizeClass}`}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.id} scope="col">{column.label || column.id}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'tr-even' : 'tr-odd'}>
              {columns.map((column, columnIndex) => (
                <td
                  key={column.id}
                  className={columnIndex === 0 ? 'td-model-code' : undefined}
                >
                  {displayValue(row?.[column.id])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TableSection({ body, className, fallbackTitle, table }) {
  const note = table.unitNotes || '* 以上参数仅供参考，实际规格以合同为准。可根据客户工艺需求进行定制化设计。'
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
        <div className="fade-up fade-up-delay-1">{body}</div>
        {note && <p className="cp-table-note fade-up fade-up-delay-3">{note}</p>}
      </div>
    </section>
  )
}

export default function CmsParameterTableSection({
  children,
  fallbackTitle,
  datasetKey,
  className = 'page-section page-section--gray',
}) {
  const table = useCmsDataTable(datasetKey)
  const tables = useCmsDataTables()
  if (!table.visible) return null

  const primaryHasInlineData = Boolean(
    Array.isArray(table.section?.columns)
    && Array.isArray(table.section?.rows),
  )
  const extraInlineTables = tables.filter((item) => (
    !item.section.datasetKey
    && item.section.id !== table.section?.id
  ))

  return (
    <>
      <TableSection
        className={className}
        fallbackTitle={fallbackTitle}
        table={table}
        body={primaryHasInlineData ? <EditableTable dataset={table.dataset} /> : children}
      />
      {extraInlineTables.map((item, index) => (
        <TableSection
          key={item.section.id || `${item.title}-${index}`}
          className={className}
          fallbackTitle={`数据表 ${index + 2}`}
          table={item}
          body={<EditableTable dataset={item.dataset} />}
        />
      ))}
    </>
  )
}
