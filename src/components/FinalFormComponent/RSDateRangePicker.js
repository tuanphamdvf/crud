import PropTypes from "prop-types"
import { memo } from "react"
import { DateRangePicker } from "rsuite"
import CustomField from "./CustomField"
// import addDays from "date-fns/addDays";
RSDateRangePicker.propTypes = {
  timeformat: PropTypes.string,
  onetap: PropTypes.bool,
  defaultdate: PropTypes.string,
}
function RSDateRangePicker(props) {
  const { inputstyle, input, inputclassname, timeformat, defaultdate,max, ...rest } = props
  return (
    <CustomField
      {...props}
      
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      placement="auto"
      accepter={DateRangePicker}
      preventOverFlow={true}
      {...rest}
    />
  )
}
export default memo(RSDateRangePicker)
