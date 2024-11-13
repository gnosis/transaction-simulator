import { Box } from '@/components'
import { FunctionFragment, Result } from 'ethers'
import { BaseTransaction } from './BaseTransaction'
import classes from './style.module.css'

interface Props {
  functionFragment: FunctionFragment
  data: Result
}
export const DecodedTransaction = ({ functionFragment, data }: Props) => {
  if (functionFragment.inputs.length === 0) {
    return null
  }

  return (
    <Box p={2} bg>
      {functionFragment.inputs.length > 0 && (
        <fieldset className="flex flex-col gap-2">
          {functionFragment.inputs.map((input, i) => (
            <BaseTransaction value={data[i].toString()}>
              {input.name} <i className={classes.inputType}>{input.type}</i>
            </BaseTransaction>
          ))}
        </fieldset>
      )}
    </Box>
  )
}
