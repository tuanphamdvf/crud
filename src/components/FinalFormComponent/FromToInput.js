import { Input } from "rsuite";
import CustomField from "./CustomField";
function FromToInput(props) {
  const { inputstyle, inputclassname, ...rest } = props;
  return (
    <CustomField
      {...props}
      componentClass="textarea"
      rows={4}
      style={inputstyle}
      className={inputclassname}
      {...rest}
      accepter={Input}
    />
  );
}

FromToInput.propTypes = {};

export default FromToInput;
