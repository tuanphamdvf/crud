import { memo } from "react";
import CustomField from "./CustomField";
import { TreePicker } from "rsuite";

function TreePickerCustomField(props) {
  const { inputstyle, inputvalue, inputclassname, ...rest } = props;
  return (
    <CustomField
      {...props}
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      data={inputvalue}
      placement="auto"
      accepter={TreePicker}
      {...rest}
    />
  );
}

export default memo(TreePickerCustomField);
