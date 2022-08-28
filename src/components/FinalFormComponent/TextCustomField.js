import { memo } from "react"
import { Input } from "rsuite"
import CustomField from "./CustomField"

function TextCustomField(props) {
  const { inputstyle, inputclassname, ...rest } = props

  return (
    <CustomField
      {...props}
      style={inputstyle}
       className={`${inputclassname}`}
      accepter={Input}
      block
      {...rest}
    />
  )
}

TextCustomField.propTypes = {}

export default memo(TextCustomField)
