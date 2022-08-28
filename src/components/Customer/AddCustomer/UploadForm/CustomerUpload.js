import PropTypes from "prop-types"
import { memo } from "react"
import CustomField from "../../../FinalFormComponent/CustomField"


UploaderCustomField.propTypes = {
  input: PropTypes.object,
  accept: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  inputstyle: PropTypes.object,
  inputclassname: PropTypes.string,
}
function UploaderCustomField(props) {
  // props
  const {
    input,
    accept,
    inputstyle,
    inputclassname,
    ...rest
  } = props


  return (
    <CustomField
      {...input}
      style={inputstyle}
      className={inputclassname}
    //   accepter={UploadAvataFrom}
      onChange={(files) => {
        input.onChange(files)
      }}
      {...rest}
    />
  )
}

export default memo(UploaderCustomField)