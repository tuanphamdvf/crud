import CustomField from "./CustomField";
import { TagPicker } from "rsuite";
import PropTypes from "prop-types";

function TagPickerCustomField(props) {
  const { inputstyle, inputvalue, inputclassname, nodropdown ,...rest } = props;
  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      placement="auto"
      menuStyle={{display: nodropdown ? 'none' : "block"}}
      accepter={TagPicker}
      data={inputvalue}
      {...rest}
    />
  );
}
TagPickerCustomField.propTypes = {
  nodropdown: PropTypes.bool
}
export default TagPickerCustomField;
