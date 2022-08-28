import { AutoComplete } from "rsuite";
import CustomField from "./CustomField";
import PropTypes from "prop-types";
function AutoCompleteField(props) {
  const { inputstyle, inputvalue, inputclassname, ...rest } = props;
  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={inputclassname}
      accepter={AutoComplete}
      data={inputvalue}
      {...rest}
    />
  );
}

AutoCompleteField.propTypes = {
  inputstyle: PropTypes.object,
  inputclassname: PropTypes.string,
};

export default AutoCompleteField;
