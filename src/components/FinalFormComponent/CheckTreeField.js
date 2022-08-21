import { memo } from "react"
import { CheckTree } from "rsuite"
import CustomField from "./CustomField"

function CheckTreePickerCustomField(props) {
  const { inputstyle, inputvalue, inputclassname, ...rest } = props
  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      data={inputvalue}
      defaultExpandAll
      virtualized
      accepter={CheckTree}
      {...rest}
    />
  )
}

export default memo(CheckTreePickerCustomField)
