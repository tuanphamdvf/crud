import classnames from "classnames/bind"
import PropTypes from "prop-types"
import { ControlLabel, FormControl, FormGroup } from "rsuite"
import styles from "./CustomField.module.scss"

const cx = classnames.bind(styles)

CustomField.propTypes = {
  name: PropTypes.string,
  message: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  // Để cho label và input đổ dọc xuống
  defaultstyle: PropTypes.bool,
}
export default function CustomField(props) {
  const {
    message,
    label,
    accepter,
    input,
    meta,
    style,
    className,
    labelclassname,
    labelStyle,
    defaultstyle,
    errorPlacement,
    ...rest
  } = props

  return (
    <FormGroup style={{ ...style }} className={cx("custom-form-group")}>
      {label && (
        <ControlLabel className={labelclassname} style={labelStyle}>
          {label}
        </ControlLabel>
      )}

      <FormControl
        {...input}
        {...rest}
        className={className}
        accepter={accepter}
        errorMessage={meta.touched && meta.error ? meta.error : null}
        errorPlacement={errorPlacement || "bottomStart"}
        // Để cho label và input đổ dọc xuống
        classPrefix={
          defaultstyle ? "rs-form-control" : "rs-form-control-wrapper custom-form-control"
        }
      />
    </FormGroup>
  )
}
