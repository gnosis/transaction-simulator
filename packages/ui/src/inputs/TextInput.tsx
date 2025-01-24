import type { ComponentPropsWithoutRef } from 'react'
import { BareInput } from './BareInput'
import { type ComposableInputProps, Input } from './Input'

type TextInputProps = Omit<
  ComponentPropsWithoutRef<'input'>,
  'id' | 'type' | 'className'
> &
  ComposableInputProps

export const TextInput = ({
  label,
  description,
  error,
  disabled,
  after,
  before,

  ...props
}: TextInputProps) => (
  <Input
    label={label}
    description={description}
    error={error}
    disabled={disabled}
    before={before}
    after={after}
  >
    {({ inputId, descriptionId }) => (
      <BareInput
        {...props}
        type="text"
        id={inputId}
        disabled={disabled}
        aria-describedby={descriptionId}
        aria-errormessage={error ?? undefined}
      />
    )}
  </Input>
)
