import cx from "classnames/bind"
import { memo } from "react"
import { Input } from "rsuite"
import CustomField from "./CustomField"

function TextAreaCustomField(props) {
  const { inputstyle, row = 4, inputclassname, ...rest } = props

  return (
    <CustomField
      {...props}
      accepter={Input}
      componentClass="textarea"
      rows={row}
      style={{ ...inputstyle, width: "auto" }}
      className={cx("w-100", inputclassname)}
      {...rest}
    />
  )
}

TextAreaCustomField.propTypes = {}

export default memo(TextAreaCustomField)
