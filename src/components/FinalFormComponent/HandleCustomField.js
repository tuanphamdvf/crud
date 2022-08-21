import { useEffect } from "react"
import { useForm } from "react-final-form"
import { InputNumber } from "rsuite"
import CustomField from "./CustomField"

function HandleCustomField(props) {
  const { getFieldState, change } = useForm()
  const price = parseFloat(getFieldState("price")?.value ?? 0)
  const amount = parseFloat(getFieldState("amount")?.value ?? 0)
  useEffect(() => {
    if (price > 0 && amount > 0) {
      change("totalPrice", price * amount)
    }
    // eslint-disable-next-line
  }, [price, amount])

  return <CustomField {...props} accepter={InputNumber} />
}

export default HandleCustomField
