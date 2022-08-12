import { FlexboxGrid } from 'rsuite';
import DeleteCustomer from '../DeleteCustomer/DeleteCustomer';
import EditCustomer from '../EditCustomer/EditCustomer';
function Customer(props) {
    const deleteCustomer = props.deleteCustomer
    const editCustomer = props.editCustomer
    const item = props.item;
    const forcus = props.forcus;

    return (
        <div className={`grid--item--customer ${forcus}`}>
            <FlexboxGrid align="middle" className="show-grid frontBold item--customer--grid">
                <FlexboxGrid.Item  colspan={4}>{item.full_name}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3}>{item.mobile}</FlexboxGrid.Item>
                <FlexboxGrid.Item className ="frontS" colspan={4}>{item.dob}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={5}>{item.distrist? item.distrist: "Quận Ba Đình"},{item.city? item.city: "Hà Nội"}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={5}>{item.email}</FlexboxGrid.Item>
                <FlexboxGrid.Item classPrefix="action--customer" colspan={3}>
                    <EditCustomer item ={item} editCustomer = {editCustomer} className='editcustomer--buton' />
                    <DeleteCustomer deleteCustomer ={deleteCustomer} item ={item} />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}

export default Customer;
