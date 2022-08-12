import { FlexboxGrid } from 'rsuite';
import DeleteCustomer from '../DeleteCustomer/DeleteCustomer';
import EditCustomer from '../EditCustomer/EditCustomer';
function Customer(props) {
    const { deleteCustomer: handleDelete, editCustomer: handleEdit, forcus: handleFocus, item: i } = props;

    return (
        <div className={`grid--item--customer ${handleFocus}`}>
            <FlexboxGrid align="middle" className="show-grid frontBold item--customer--grid">
                <FlexboxGrid.Item colspan={4}>{i.full_name}</FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={3}>{i.mobile}</FlexboxGrid.Item>
                <FlexboxGrid.Item className="frontS" colspan={3}>
                    {i.dob}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>
                    {i.distrist ? i.distrist : 'Quận Ba Đình'}, {i.city ? i.city : 'Hà Nội'}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={5}>{i.email}</FlexboxGrid.Item>
                <FlexboxGrid.Item classPrefix="action--customer" colspan={3}>
                    <EditCustomer item={i} editCustomer={handleEdit} className="editcustomer--buton" />
                    <DeleteCustomer deleteCustomer={handleDelete} item={i} />
                </FlexboxGrid.Item>
            </FlexboxGrid>
        </div>
    );
}

export default Customer;
