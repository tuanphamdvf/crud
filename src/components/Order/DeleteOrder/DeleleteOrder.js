import { Modal, Button, Placeholder,Notification } from 'rsuite';
import { useState } from 'react';
import { Form } from 'react-final-form';
import PropTypes from 'prop-types'
import { handleDeleteOrder } from '../../../ApiService/ApiOrder';
const DeleteCustomer = (props) => {
    const {item,deleteOrder } = props

    function openNotifi(funcName) {
        if (funcName === 'success') {
            Notification[funcName]({
                title: 'Xoá Đơn hàng thành công !',
                duration: 2000
            });
        } else {
            Notification[funcName]({
                title: 'Vui lòng thử lại !',
                duration: 2000
            });
        }
    }
    const onSubmit = async () => {

        if(item.id){
            await handleDeleteOrder(item.id,openNotifi('success'))
           await deleteOrder(item.id)
        }else{
            openNotifi("warning")
        }
          
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <i className="fa-solid fa-trash deletecustomer--buton" onClick={() => handleOpen()}></i>
            <Modal overflow={false} size={'lg'} show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="120px" classPrefix="popup--addcustomer">
                        <Form
                            onSubmit={onSubmit}
                            render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit} className="from--addcustomer">
                                     Cảnh báo, bạn có chắc chắn muốn xoá Hoá đơn "{item.idOrder}"
                                    <div className="grid--addcustomer--wrapper">
                                        <div className="buttons addcustomer--button--submit">
                                            <Button
                                                onClick={handleClose}
                                                appearance="primary"
                                                type="submit"
                                            >
                                               Xoá
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        />
                    </Placeholder.Graph>
                </Modal.Body>
                <Modal.Footer>
                    <Button className="addcustomer--button--back" onClick={handleClose} appearance="subtle">
                        Quay lại
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
DeleteCustomer.protoType = {
    item: PropTypes.object.isRequired
}
export default DeleteCustomer;