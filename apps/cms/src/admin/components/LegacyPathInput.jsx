import React, { forwardRef } from 'react'
import { Field } from '@strapi/design-system'
import styled from 'styled-components'

const LegacyNotice = styled.div`
  display: grid;
  gap: 4px;
  min-height: 42px;
  padding: 10px 12px;
  border: 1px dashed ${({ theme }) => theme.colors.neutral300};
  border-radius: 6px;
  color: ${({ theme }) => theme.colors.neutral600};
  background: ${({ theme }) => theme.colors.neutral100};
`

const Path = styled.code`
  overflow: hidden;
  color: ${({ theme }) => theme.colors.neutral700};
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const LegacyPathInput = forwardRef((props, ref) => {
  const { error, hint, intlLabel, name, required, value } = props
  const fieldLabel = intlLabel?.defaultMessage || intlLabel?.id || name

  return (
    <Field.Root ref={ref} name={name} hint={hint} error={error} required={required}>
      <Field.Label>{fieldLabel}</Field.Label>
      <LegacyNotice>
        <span>系统兼容信息，无需客户填写；请使用同一内容项中的媒体上传/选择框。</span>
        {value ? <Path title={value}>{value}</Path> : <span>新内容无需设置历史路径。</span>}
      </LegacyNotice>
      <Field.Hint />
      <Field.Error />
    </Field.Root>
  )
})

LegacyPathInput.displayName = 'LegacyPathInput'

export default LegacyPathInput
