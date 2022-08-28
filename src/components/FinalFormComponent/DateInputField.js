import { forwardRef, memo } from "react"
import Calendar from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import MaskedTextInput from "react-text-mask"
import CustomField from "./CustomField"
import "./DateInputField.module.scss"
function CustomDateInputComponent(props) {
  const { input } = props
  const CustomInput = forwardRef(({ value, onChange, onClick, placeholder }, ref) => (
    <MaskedTextInput
      ref={ref}
      className="rs-input"
      type="text"
      placeholder={placeholder}
      value={value}
      mask={[/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/]}
      onChange={onChange}
      onClick={onClick}
    />
  ))
  return (
    <Calendar
      {...props}
      placeholderText="Nhập/Chọn ngày"
      selected={input.value ? new Date(input.value) : null}
      onChange={input.onChange}
      dateFormat="dd/MM/yyyy"
      isClearable
      customInput={<CustomInput />}
    />
  )
}

function DateInputField(props) {
  const { inputstyle, inputclassname, input } = props

  return (
    <CustomField
      {...props}
      {...input}
      style={inputstyle}
      className={`w-100 ${inputclassname}`}
      accepter={() => <CustomDateInputComponent input={input} />}
    />
  )
}

export default memo(DateInputField)
