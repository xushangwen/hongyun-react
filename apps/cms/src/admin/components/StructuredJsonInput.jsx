import React, { forwardRef, useMemo, useState } from 'react'
import {
  Button,
  Field,
  IconButton,
  IconButtonGroup,
  SingleSelect,
  SingleSelectOption,
} from '@strapi/design-system'
import { useForm, useStrapiApp } from '@strapi/strapi/admin'
import styled from 'styled-components'

function ArrowIcon({ direction = 'up' }) {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d={direction === 'up' ? 'M7 11V3M3.5 6.5 7 3l3.5 3.5' : 'M7 3v8m3.5-3.5L7 11 3.5 7.5'}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  )
}

function TrashIcon() {
  return (
    <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <path
        d="M3 4h8M5 4V2.75h4V4m1 0-.5 7.25h-5L4 4m2 2v3.5m2-3.5v3.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.35"
      />
    </svg>
  )
}

const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.neutral0};
  overflow: hidden;
`

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 12px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral150};
  background: ${({ theme }) => theme.colors.neutral100};
`

const ToolbarGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
`

const Action = styled(Button).attrs(({ size = 'S', variant = 'secondary' }) => ({ size, variant }))``

const DangerAction = styled(Button).attrs(({ size = 'S', variant = 'danger-light' }) => ({ size, variant }))``

const Body = styled.div`
  padding: 14px;
`

const Cards = styled.div`
  display: grid;
  gap: 10px;
`

const Card = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 1.25fr) minmax(130px, 1fr) minmax(120px, 0.6fr) auto;
  gap: 10px;
  align-items: start;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 7px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const CompactCard = styled(Card)`
  grid-template-columns: minmax(180px, 1fr) minmax(180px, 1fr) auto;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

const ControlGroup = styled.div`
  display: grid;
  gap: 5px;
`

const ControlLabel = styled.label`
  color: ${({ theme }) => theme.colors.neutral700};
  font-size: 12px;
  font-weight: 600;
`

const Input = styled.input`
  width: 100%;
  min-height: 38px;
  padding: 8px 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral300};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.neutral800};
  background: ${({ theme }) => theme.colors.neutral0};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary600};
    outline: 2px solid ${({ theme }) => theme.colors.primary100};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral100};
  }
`

const Textarea = styled.textarea`
  width: 100%;
  min-height: 96px;
  padding: 9px 10px;
  border: 1px solid ${({ theme }) => theme.colors.neutral300};
  border-radius: 5px;
  color: ${({ theme }) => theme.colors.neutral800};
  background: ${({ theme }) => theme.colors.neutral0};
  font: inherit;
  line-height: 1.55;
  resize: vertical;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary600};
    outline: 2px solid ${({ theme }) => theme.colors.primary100};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.neutral100};
  }
`

const OfficialSelect = styled(SingleSelect)`
  width: 100%;
`

const RowActions = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`

const FieldActions = styled(RowActions)`
  align-self: start;
  padding-top: 23px;

  @media (max-width: 900px) {
    padding-top: 0;
  }
`

const TableViewport = styled.div`
  max-height: 620px;
  overflow: auto;
  border: 1px solid ${({ theme }) => theme.colors.neutral200};
  border-radius: 7px;
`

const Table = styled.table`
  width: max-content;
  min-width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  th,
  td {
    min-width: 150px;
    padding: 7px;
    border-right: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
    vertical-align: top;
  }

  th {
    position: sticky;
    top: 0;
    z-index: 2;
    color: ${({ theme }) => theme.colors.neutral700};
    background: ${({ theme }) => theme.colors.neutral100};
    text-align: left;
  }

  th:first-child,
  td:first-child {
    position: sticky;
    left: 0;
    z-index: 1;
    min-width: 72px;
    width: 72px;
    background: ${({ theme }) => theme.colors.neutral100};
  }

  th:first-child {
    z-index: 3;
  }

  input {
    min-width: 135px;
  }

  textarea {
    min-width: 300px;
  }
`

const Key = styled.div`
  margin-top: 2px;
  color: ${({ theme }) => theme.colors.neutral500};
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 11px;
  font-weight: 400;
`

const Empty = styled.div`
  padding: 34px 16px;
  color: ${({ theme }) => theme.colors.neutral600};
  text-align: center;
`

const PasteBox = styled.div`
  display: grid;
  gap: 8px;
  padding: 12px 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.neutral200};
  background: ${({ theme }) => theme.colors.primary100};

  textarea {
    min-height: 120px;
    padding: 10px;
    border: 1px solid ${({ theme }) => theme.colors.neutral300};
    border-radius: 6px;
    color: ${({ theme }) => theme.colors.neutral800};
    background: ${({ theme }) => theme.colors.neutral0};
    resize: vertical;
  }
`

const Notice = styled.div`
  padding: 9px 12px;
  border-radius: 6px;
  color: ${({ $danger, theme }) => ($danger ? theme.colors.danger700 : theme.colors.neutral700)};
  background: ${({ $danger, theme }) => ($danger ? theme.colors.danger100 : theme.colors.neutral100)};
  font-size: 13px;
`

const MediaCell = styled.div`
  display: grid;
  gap: 6px;
  min-width: 180px;
`

const MediaPreview = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  img,
  video {
    width: 96px;
    height: 64px;
    border: 1px solid ${({ theme }) => theme.colors.neutral200};
    border-radius: 6px;
    background: ${({ theme }) => theme.colors.neutral100};
    object-fit: cover;
  }

  span {
    max-width: 120px;
    overflow: hidden;
    color: ${({ theme }) => theme.colors.neutral600};
    font-size: 11px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`

const MediaThumb = styled.a`
  display: block;
  line-height: 0;

  &:focus-visible {
    border-radius: 6px;
    outline: 2px solid ${({ theme }) => theme.colors.primary600};
    outline-offset: 2px;
  }
`

const FIELD_NAMES = {
  model: '型号',
  liftType: '升降方式',
  workVol: '工作容积',
  designVol: '设计容积',
  tankDim: '料缸尺寸',
  mixerMotor: '搅拌电机',
  revSpeed: '公转速度',
  ownSpeed: '自转速度',
  dissolverKW: '分散功率',
  dissolverType: '分散电机',
  dissolverRPM: '分散转速',
  dissolverLinear: '分散线速度',
  weight: '重量',
  dimension: '外形尺寸',
  title: '标题',
  content: '内容',
  desc: '说明',
  label: '名称',
  value: '值',
  path: '链接路径',
  name: '名称',
  number: '数值',
  suffix: '后缀',
  unit: '单位',
  year: '年份',
  theme: '主题',
  address: '地址',
  contact: '联系方式',
  img: '图片',
  src: '图片',
  icon: '图标',
  video: '视频',
  poster: '视频封面',
  image: '图片',
  logo: 'Logo',
  media: '媒体',
  target: '目标值',
  decimals: '小数位',
  output: '产量',
  motor: '电机功率',
  rpm: '转速',
  diameter: '直径',
}

const MEDIA_COLUMN_PATTERN = /^(img|src|icon|video|poster|image|logo|media)$/i
const LONG_TEXT_COLUMN_PATTERN = /^(desc|description|content|text|body|note|notes|details|summary)$/i

function parseValue(value, fallback) {
  if (value == null || value === '') return fallback
  if (typeof value !== 'string') return value
  try {
    return JSON.parse(value)
  } catch {
    return fallback
  }
}

function getIn(source, path) {
  return path.reduce((value, key) => value?.[key], source)
}

function parentPath(name) {
  const parts = name.split('.')
  return parts.slice(0, -1)
}

function siblingPath(name, sibling) {
  return [...parentPath(name), sibling].join('.')
}

function move(items, index, direction) {
  const target = index + direction
  if (target < 0 || target >= items.length) return items
  const copy = [...items]
  ;[copy[index], copy[target]] = [copy[target], copy[index]]
  return copy
}

function ItemActions({
  disabled,
  fieldAligned = false,
  index,
  itemLabel = '项',
  length,
  onDelete,
  onMove,
}) {
  const Wrapper = fieldAligned ? FieldActions : RowActions
  return (
    <Wrapper>
      <IconButtonGroup>
        <IconButton
          type="button"
          size="S"
          variant="secondary"
          label={`上移第 ${index + 1} ${itemLabel}`}
          disabled={disabled || index === 0}
          onClick={() => onMove(-1)}
        >
          <ArrowIcon />
        </IconButton>
        <IconButton
          type="button"
          size="S"
          variant="secondary"
          label={`下移第 ${index + 1} ${itemLabel}`}
          disabled={disabled || index === length - 1}
          onClick={() => onMove(1)}
        >
          <ArrowIcon direction="down" />
        </IconButton>
        <IconButton
          type="button"
          size="S"
          variant="danger-light"
          label={`删除第 ${index + 1} ${itemLabel}`}
          disabled={disabled}
          onClick={onDelete}
        >
          <TrashIcon />
        </IconButton>
      </IconButtonGroup>
    </Wrapper>
  )
}

function DeleteItemAction({ disabled, fieldAligned = false, itemLabel = '项', onDelete }) {
  const Wrapper = fieldAligned ? FieldActions : RowActions
  return (
    <Wrapper>
      <IconButton
        type="button"
        size="S"
        variant="danger-light"
        label={`删除${itemLabel}`}
        disabled={disabled}
        onClick={onDelete}
      >
        <TrashIcon />
      </IconButton>
    </Wrapper>
  )
}

function smartValue(raw, type) {
  if (raw === '') return ''
  if (type === 'number') {
    const number = Number(raw)
    return Number.isFinite(number) ? number : raw
  }
  if (type === 'boolean') return raw === 'true'
  return raw
}

function csvCell(value) {
  const text = value == null ? '' : String(value)
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text
}

function parseDelimited(source) {
  const lines = source.trim().replaceAll('\r\n', '\n').split('\n').filter(Boolean)
  if (!lines.length) return []
  const delimiter = lines[0].includes('\t') ? '\t' : ','
  return lines.map((line) => {
    if (delimiter === '\t') return line.split('\t')
    const cells = []
    let cell = ''
    let quoted = false
    for (let index = 0; index < line.length; index += 1) {
      const character = line[index]
      if (character === '"' && quoted && line[index + 1] === '"') {
        cell += '"'
        index += 1
      } else if (character === '"') {
        quoted = !quoted
      } else if (character === ',' && !quoted) {
        cells.push(cell)
        cell = ''
      } else {
        cell += character
      }
    }
    cells.push(cell)
    return cells
  })
}

function ColumnsEditor({ disabled, name, rows, setRows, update, value }) {
  const columns = Array.isArray(value) ? value : []

  const changeColumn = (index, key, nextValue) => {
    const next = columns.map((column, itemIndex) =>
      itemIndex === index ? { ...column, [key]: nextValue } : column,
    )
    if (key === 'id' && columns[index]?.id && nextValue && columns[index].id !== nextValue) {
      const oldId = columns[index].id
      setRows(
        rows.map((row) => {
          if (!(oldId in row)) return row
          const renamed = { ...row, [nextValue]: row[oldId] }
          delete renamed[oldId]
          return renamed
        }),
      )
    }
    update(next)
  }

  return (
    <Panel>
      <Toolbar>
        <strong>列定义</strong>
        <Action
          type="button"
          disabled={disabled}
          onClick={() => update([...columns, { id: `field${columns.length + 1}`, label: '新字段', type: 'text' }])}
        >
          + 添加列
        </Action>
      </Toolbar>
      <Body>
        {columns.length ? (
          <Cards>
            {columns.map((column, index) => (
              <Card key={`${column.id}-${index}`}>
                <ControlGroup>
                  <ControlLabel htmlFor={`${name}-${index}-label`}>后台显示名称</ControlLabel>
                  <Input
                    id={`${name}-${index}-label`}
                    disabled={disabled}
                    value={column.label ?? ''}
                    placeholder={FIELD_NAMES[column.id] || '例如：设备型号'}
                    onChange={(event) => changeColumn(index, 'label', event.target.value)}
                  />
                </ControlGroup>
                <ControlGroup>
                  <ControlLabel htmlFor={`${name}-${index}-id`}>字段标识（英文，修改时会同步行数据）</ControlLabel>
                  <Input
                    id={`${name}-${index}-id`}
                    disabled={disabled}
                    value={column.id ?? ''}
                    onChange={(event) => changeColumn(index, 'id', event.target.value.trim())}
                  />
                </ControlGroup>
                <ControlGroup>
                  <ControlLabel htmlFor={`${name}-${index}-type`}>数据类型</ControlLabel>
                  <OfficialSelect
                    id={`${name}-${index}-type`}
                    aria-label="数据类型"
                    disabled={disabled}
                    value={column.type || 'text'}
                    onChange={(nextValue) => changeColumn(index, 'type', nextValue)}
                  >
                    <SingleSelectOption value="text">文字</SingleSelectOption>
                    <SingleSelectOption value="textarea">多行文字</SingleSelectOption>
                    <SingleSelectOption value="number">数字</SingleSelectOption>
                    <SingleSelectOption value="boolean">是 / 否</SingleSelectOption>
                  </OfficialSelect>
                </ControlGroup>
                <ItemActions
                  disabled={disabled}
                  fieldAligned
                  index={index}
                  itemLabel="列"
                  length={columns.length}
                  onMove={(direction) => update(move(columns, index, direction))}
                  onDelete={() => update(columns.filter((_, itemIndex) => itemIndex !== index))}
                />
              </Card>
            ))}
          </Cards>
        ) : (
          <Empty>还没有列，点击“添加列”开始。</Empty>
        )}
      </Body>
    </Panel>
  )
}

function RowsEditor({ columns, disabled, MediaLibraryDialog, name, update, value }) {
  const rows = Array.isArray(value) ? value : []
  const [showPaste, setShowPaste] = useState(false)
  const [pasteValue, setPasteValue] = useState('')
  const [notice, setNotice] = useState('')
  const [mediaTarget, setMediaTarget] = useState(null)
  const normalizedColumns = columns.length
    ? columns
    : [...new Set(rows.flatMap((row) => Object.keys(row || {})))].map((id) => ({
        id,
        label: FIELD_NAMES[id] || id,
        type: typeof rows.find((row) => row?.[id] != null)?.[id] === 'number' ? 'number' : 'text',
      }))

  const setCell = (rowIndex, column, raw) => {
    update(
      rows.map((row, index) =>
        index === rowIndex ? { ...row, [column.id]: smartValue(raw, column.type) } : row,
      ),
    )
  }

  const importText = () => {
    const matrix = parseDelimited(pasteValue)
    if (matrix.length < 2) {
      setNotice('至少需要一行表头和一行数据。')
      return
    }
    const header = matrix[0]
    const mapped = header.map((cell) =>
      normalizedColumns.find((column) => column.id === cell.trim() || column.label === cell.trim()),
    )
    const unknown = header.filter((_, index) => !mapped[index])
    if (unknown.length) {
      setNotice(`这些列无法匹配：${unknown.join('、')}。请使用后台显示名称或字段标识作为表头。`)
      return
    }
    const importedRows = matrix.slice(1).map((cells) =>
      Object.fromEntries(
        mapped.map((column, index) => [column.id, smartValue(cells[index] ?? '', column.type)]),
      ),
    )
    update(importedRows)
    setPasteValue('')
    setNotice(`已导入 ${importedRows.length} 行，保存前可继续检查和修改。`)
    setShowPaste(false)
  }

  const exportCsv = () => {
    const csv = [
      normalizedColumns.map((column) => csvCell(column.label || column.id)).join(','),
      ...rows.map((row) => normalizedColumns.map((column) => csvCell(row?.[column.id])).join(',')),
    ].join('\n')
    const url = URL.createObjectURL(new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8' }))
    const anchor = document.createElement('a')
    anchor.href = url
    anchor.download = `${name.split('.').at(-1) || 'data'}.csv`
    anchor.click()
    URL.revokeObjectURL(url)
  }

  const selectedMedia = (assets) => {
    const asset = assets?.[0]
    if (asset && mediaTarget) setCell(mediaTarget.rowIndex, mediaTarget.column, asset.url)
    setMediaTarget(null)
  }

  const mediaPreview = (row, column) => {
    const source = String(row?.[column.id] || '')
    if (!source) return null
    const canPreview = source.startsWith('/uploads/') || /^https?:\/\//i.test(source)
    const isVideo = column.id.toLowerCase().includes('video')
    return (
      <MediaPreview>
        {canPreview && (
          <MediaThumb href={source} target="_blank" rel="noreferrer" title="点击查看原媒体">
            {isVideo ? <video src={source} muted /> : <img src={source} alt="" />}
          </MediaThumb>
        )}
        <span title={source}>{source.split('/').at(-1)}</span>
      </MediaPreview>
    )
  }

  return (
    <Panel>
      <Toolbar>
        <ToolbarGroup>
          <strong>表格数据</strong>
          <span>{rows.length} 行 × {normalizedColumns.length} 列</span>
        </ToolbarGroup>
        <ToolbarGroup>
          <Action type="button" disabled={disabled || !normalizedColumns.length} onClick={() => setShowPaste(!showPaste)}>
            从 Excel / CSV 粘贴
          </Action>
          <Action type="button" disabled={!rows.length} onClick={exportCsv}>导出 CSV</Action>
          <Action
            type="button"
            disabled={disabled || !normalizedColumns.length}
            onClick={() => update([...rows, Object.fromEntries(normalizedColumns.map((column) => [column.id, '']))])}
          >
            + 添加一行
          </Action>
        </ToolbarGroup>
      </Toolbar>
      {showPaste && (
        <PasteBox>
          <strong>从 Excel 复制含表头的数据后粘贴到这里</strong>
          <textarea
            autoFocus
            value={pasteValue}
            placeholder="型号&#9;工作容积&#9;功率&#10;HY-001&#9;100L&#9;7.5"
            onChange={(event) => setPasteValue(event.target.value)}
          />
          <ToolbarGroup>
            <Action type="button" onClick={importText}>导入并替换当前表格</Action>
            <Action type="button" onClick={() => setShowPaste(false)}>取消</Action>
          </ToolbarGroup>
        </PasteBox>
      )}
      <Body>
        {notice && <Notice $danger={notice.includes('无法') || notice.includes('至少')}>{notice}</Notice>}
        {!normalizedColumns.length ? (
          <Empty>请先在上方“列定义”中添加字段并保存。</Empty>
        ) : rows.length ? (
          <TableViewport>
            <Table>
              <thead>
                <tr>
                  <th>行</th>
                  {normalizedColumns.map((column) => (
                    <th key={column.id}>
                      {column.label === column.id ? FIELD_NAMES[column.id] || column.label : column.label}
                      <Key>{column.id}</Key>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <ItemActions
                        disabled={disabled}
                        index={rowIndex}
                        itemLabel="行"
                        length={rows.length}
                        onMove={(direction) => update(move(rows, rowIndex, direction))}
                        onDelete={() => update(rows.filter((_, index) => index !== rowIndex))}
                      />
                    </td>
                    {normalizedColumns.map((column) => (
                      <td key={column.id}>
                        {MEDIA_COLUMN_PATTERN.test(column.id) && MediaLibraryDialog ? (
                          <MediaCell>
                            {row?.[column.id] ? (
                              mediaPreview(row, column)
                            ) : (
                              <span>尚未选择媒体</span>
                            )}
                            <RowActions>
                              <Action
                                type="button"
                                disabled={disabled}
                                onClick={() => setMediaTarget({ rowIndex, column })}
                              >
                                上传 / 从媒体库选择
                              </Action>
                              {row?.[column.id] && (
                                <DangerAction
                                  type="button"
                                  disabled={disabled}
                                  onClick={() => setCell(rowIndex, column, '')}
                                >
                                  清除
                                </DangerAction>
                              )}
                            </RowActions>
                          </MediaCell>
                        ) : column.type === 'boolean' ? (
                          <OfficialSelect
                            aria-label={`${column.label}，第 ${rowIndex + 1} 行`}
                            disabled={disabled}
                            value={String(row?.[column.id] ?? false)}
                            onChange={(nextValue) => setCell(rowIndex, column, nextValue)}
                          >
                            <SingleSelectOption value="true">是</SingleSelectOption>
                            <SingleSelectOption value="false">否</SingleSelectOption>
                          </OfficialSelect>
                        ) : column.type === 'textarea' || LONG_TEXT_COLUMN_PATTERN.test(column.id) ? (
                          <Textarea
                            aria-label={`${column.label}，第 ${rowIndex + 1} 行`}
                            disabled={disabled}
                            value={row?.[column.id] ?? ''}
                            onChange={(event) => setCell(rowIndex, column, event.target.value)}
                          />
                        ) : (
                          <Input
                            aria-label={`${column.label}，第 ${rowIndex + 1} 行`}
                            disabled={disabled}
                            type={column.type === 'number' ? 'number' : 'text'}
                            value={row?.[column.id] ?? ''}
                            onChange={(event) => setCell(rowIndex, column, event.target.value)}
                          />
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </Table>
          </TableViewport>
        ) : (
          <Empty>暂无数据。可添加一行，或直接从 Excel / CSV 粘贴。</Empty>
        )}
      </Body>
      {mediaTarget && MediaLibraryDialog && (
        <MediaLibraryDialog
          allowedTypes={mediaTarget.column.id.toLowerCase().includes('video') ? ['videos'] : ['images']}
          multiple={false}
          onClose={() => setMediaTarget(null)}
          onSelectAssets={selectedMedia}
        />
      )}
    </Panel>
  )
}

function RecordListEditor({ disabled, fields, title, update, value }) {
  const items = Array.isArray(value) ? value : []
  const blank = Object.fromEntries(fields.map((field) => [field.key, field.defaultValue ?? '']))

  return (
    <Panel>
      <Toolbar>
        <ToolbarGroup>
          <strong>{title}</strong>
          <span>{items.length} 项</span>
        </ToolbarGroup>
        <Action type="button" disabled={disabled} onClick={() => update([...items, blank])}>+ 添加一项</Action>
      </Toolbar>
      <Body>
        {items.length ? (
          <Cards>
            {items.map((item, index) => (
              <CompactCard key={index}>
                {fields.map((field) => (
                  <ControlGroup key={field.key}>
                    <ControlLabel>{field.label}</ControlLabel>
                    <Input
                      disabled={disabled}
                      value={item?.[field.key] ?? ''}
                      placeholder={field.placeholder}
                      onChange={(event) =>
                        update(items.map((current, itemIndex) =>
                          itemIndex === index ? { ...current, [field.key]: event.target.value } : current,
                        ))
                      }
                    />
                  </ControlGroup>
                ))}
                <ItemActions
                  disabled={disabled}
                  fieldAligned
                  index={index}
                  length={items.length}
                  onMove={(direction) => update(move(items, index, direction))}
                  onDelete={() => update(items.filter((_, itemIndex) => itemIndex !== index))}
                />
              </CompactCard>
            ))}
          </Cards>
        ) : (
          <Empty>还没有内容，点击“添加一项”开始。</Empty>
        )}
      </Body>
    </Panel>
  )
}

function StringListEditor({ disabled, title, update, value }) {
  const items = Array.isArray(value) ? value : []
  return (
    <Panel>
      <Toolbar>
        <ToolbarGroup><strong>{title}</strong><span>{items.length} 项</span></ToolbarGroup>
        <Action type="button" disabled={disabled} onClick={() => update([...items, ''])}>+ 添加一项</Action>
      </Toolbar>
      <Body>
        {items.length ? (
          <Cards>
            {items.map((item, index) => (
              <CompactCard key={index}>
                <ControlGroup>
                  <ControlLabel>标识</ControlLabel>
                  <Input
                    disabled={disabled}
                    value={item ?? ''}
                    onChange={(event) => update(items.map((current, itemIndex) => itemIndex === index ? event.target.value : current))}
                  />
                </ControlGroup>
                <div />
                <ItemActions
                  disabled={disabled}
                  fieldAligned
                  index={index}
                  length={items.length}
                  onMove={(direction) => update(move(items, index, direction))}
                  onDelete={() => update(items.filter((_, itemIndex) => itemIndex !== index))}
                />
              </CompactCard>
            ))}
          </Cards>
        ) : <Empty>还没有内容，点击“添加一项”开始。</Empty>}
      </Body>
    </Panel>
  )
}

function ObjectEditor({ disabled, title, update, value }) {
  const object = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const entries = Object.entries(object)
  const changeEntry = (index, part, raw) => {
    const nextEntries = entries.map(([key, entryValue], itemIndex) => {
      if (itemIndex !== index) return [key, entryValue]
      return part === 'key' ? [raw, entryValue] : [key, smartValue(raw, typeof entryValue === 'number' ? 'number' : 'text')]
    })
    update(Object.fromEntries(nextEntries.filter(([key]) => key)))
  }
  return (
    <Panel>
      <Toolbar>
        <ToolbarGroup><strong>{title}</strong><span>{entries.length} 项设置</span></ToolbarGroup>
        <Action type="button" disabled={disabled} onClick={() => update({ ...object, [`setting${entries.length + 1}`]: '' })}>+ 添加设置</Action>
      </Toolbar>
      <Body>
        {entries.length ? (
          <Cards>
            {entries.map(([key, entryValue], index) => (
              <CompactCard key={`${key}-${index}`}>
                <ControlGroup>
                  <ControlLabel>设置名称</ControlLabel>
                  <Input disabled={disabled} value={key} onChange={(event) => changeEntry(index, 'key', event.target.value.trim())} />
                </ControlGroup>
                <ControlGroup>
                  <ControlLabel>设置值</ControlLabel>
                  <Input disabled={disabled} value={entryValue == null ? '' : String(entryValue)} onChange={(event) => changeEntry(index, 'value', event.target.value)} />
                </ControlGroup>
                <DeleteItemAction
                  disabled={disabled}
                  fieldAligned
                  itemLabel={`设置 ${key}`}
                  onDelete={() => update(Object.fromEntries(entries.filter((_, itemIndex) => itemIndex !== index)))}
                />
              </CompactCard>
            ))}
          </Cards>
        ) : <Empty>当前没有额外设置，一般可保持为空。</Empty>}
      </Body>
    </Panel>
  )
}

function ChartConfigEditor({ disabled, update, value }) {
  const config = value && typeof value === 'object' && !Array.isArray(value) ? value : {}
  const series = Array.isArray(config.series) ? config.series : []
  const categories = Array.isArray(config.categories) ? config.categories : []
  const setConfig = (key, nextValue) => update({ ...config, [key]: nextValue })
  const setSeries = (nextSeries) => setConfig('series', nextSeries)

  return (
    <Panel>
      <Toolbar>
        <ToolbarGroup>
          <strong>图表设置</strong>
          <span>{series.length} 组数据</span>
        </ToolbarGroup>
        <Action
          type="button"
          disabled={disabled}
          onClick={() => setSeries([...series, { name: `数据系列 ${series.length + 1}`, data: [] }])}
        >
          + 添加数据系列
        </Action>
      </Toolbar>
      <Body>
        <Cards>
          <CompactCard>
            <ControlGroup>
              <ControlLabel>图表类型</ControlLabel>
              <OfficialSelect
                aria-label="图表类型"
                disabled={disabled}
                value={config.chartType || 'auto'}
                onChange={(nextValue) => setConfig('chartType', nextValue === 'auto' ? '' : nextValue)}
              >
                <SingleSelectOption value="auto">由前端自动决定</SingleSelectOption>
                <SingleSelectOption value="bar">柱状图</SingleSelectOption>
                <SingleSelectOption value="line">折线图</SingleSelectOption>
              </OfficialSelect>
            </ControlGroup>
            <ControlGroup>
              <ControlLabel>横轴分类（用逗号分隔）</ControlLabel>
              <Input
                disabled={disabled}
                value={categories.join(', ')}
                onChange={(event) => setConfig('categories', event.target.value.split(/[,，]/).map((item) => item.trim()).filter(Boolean))}
              />
            </ControlGroup>
            <div />
          </CompactCard>
          {series.map((item, index) => (
            <CompactCard key={index}>
              <ControlGroup>
                <ControlLabel>系列名称</ControlLabel>
                <Input
                  disabled={disabled}
                  value={item?.name ?? ''}
                  onChange={(event) =>
                    setSeries(series.map((current, itemIndex) =>
                      itemIndex === index ? { ...current, name: event.target.value } : current,
                    ))
                  }
                />
              </ControlGroup>
              <ControlGroup>
                <ControlLabel>数值（用逗号分隔）</ControlLabel>
                <Input
                  disabled={disabled}
                  value={Array.isArray(item?.data) ? item.data.join(', ') : ''}
                  onChange={(event) =>
                    setSeries(series.map((current, itemIndex) =>
                      itemIndex === index
                        ? {
                            ...current,
                            data: event.target.value
                              .split(/[,，]/)
                              .map((entry) => Number(entry.trim()))
                              .filter(Number.isFinite),
                          }
                        : current,
                    ))
                  }
                />
              </ControlGroup>
              <ItemActions
                disabled={disabled}
                fieldAligned
                index={index}
                itemLabel="数据系列"
                length={series.length}
                onMove={(direction) => setSeries(move(series, index, direction))}
                onDelete={() => setSeries(series.filter((_, itemIndex) => itemIndex !== index))}
              />
            </CompactCard>
          ))}
        </Cards>
        {!series.length && <Empty>普通表格无需填写。图表数据集可添加一个或多个数据系列。</Empty>}
      </Body>
    </Panel>
  )
}

const StructuredJsonInput = forwardRef((props, ref) => {
  const { attribute, disabled, error, hint, intlLabel, name, onChange, required, value } = props
  const mode = attribute?.options?.editorMode || 'object'
  const form = useForm('StructuredJsonInput', (state) => ({ values: state.values, onChange: state.onChange }), false)
  const MediaLibraryDialog = useStrapiApp(
    'StructuredJsonInput',
    (app) => app.components['media-library'],
    false,
  )
  const parsed = useMemo(
    () => parseValue(value, ['object', 'dataset-view', 'chart-config'].includes(mode) ? {} : []),
    [mode, value],
  )
  const columnsPath = siblingPath(name, 'columns')
  const rowsPath = siblingPath(name, 'rows')
  const columns = useMemo(
    () => parseValue(getIn(form?.values, columnsPath.split('.')), []),
    [columnsPath, form?.values],
  )
  const rows = useMemo(
    () => parseValue(getIn(form?.values, rowsPath.split('.')), []),
    [form?.values, rowsPath],
  )
  const update = (nextValue) => onChange({ target: { name, type: attribute.type, value: nextValue } })
  const setRows = (nextRows) => form?.onChange(rowsPath, nextRows)
  const fieldLabel = intlLabel?.defaultMessage || intlLabel?.id || name

  let editor
  if (mode === 'columns') {
    editor = <ColumnsEditor disabled={disabled} name={name} rows={rows} setRows={setRows} update={update} value={parsed} />
  } else if (mode === 'rows') {
    editor = <RowsEditor columns={Array.isArray(columns) ? columns : []} disabled={disabled} MediaLibraryDialog={MediaLibraryDialog} name={name} update={update} value={parsed} />
  } else if (mode === 'navigation') {
    editor = <RecordListEditor disabled={disabled} title="导航项目" fields={[{ key: 'label', label: '菜单名称', placeholder: '例如：关于红运' }, { key: 'path', label: '站内链接', placeholder: '例如：/about' }]} update={update} value={parsed} />
  } else if (mode === 'options') {
    editor = <RecordListEditor disabled={disabled} title="下拉选项" fields={[{ key: 'label', label: '客户看到的名称', placeholder: '例如：新能源行业' }, { key: 'value', label: '选项标识', placeholder: '例如：new-energy' }]} update={update} value={parsed} />
  } else if (mode === 'header-groups') {
    editor = <RecordListEditor disabled={disabled} title="分组表头（可选）" fields={[{ key: 'label', label: '分组名称' }, { key: 'start', label: '起始列标识' }, { key: 'span', label: '跨列数量', defaultValue: 1 }]} update={update} value={parsed} />
  } else if (mode === 'string-list') {
    editor = <StringListEditor disabled={disabled} title="关联内容标识" update={update} value={parsed} />
  } else if (mode === 'chart-config') {
    editor = <ChartConfigEditor disabled={disabled} update={update} value={parsed} />
  } else {
    editor = <ObjectEditor disabled={disabled} title="显示设置（可选）" update={update} value={parsed} />
  }

  return (
    <Field.Root ref={ref} name={name} hint={hint} error={error} required={required}>
      <Field.Label>{fieldLabel}</Field.Label>
      {editor}
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  )
})

StructuredJsonInput.displayName = 'StructuredJsonInput'

export default StructuredJsonInput
