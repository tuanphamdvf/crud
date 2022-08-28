import { Modal, Button, Placeholder, Notification, ButtonToolbar, Icon, Popover, Whisper, FlexboxGrid } from 'rsuite';
import { useState, useRef } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import PropTypes from 'prop-types'
import { AddCustomerApi } from '../../../ApiService/apiCustomer';
import { addOrderApi } from '../../../ApiService/ApiOrder';
import { normalizePhone } from '../../Function/Function';
import { Form as FromRsuite, FormGroup, ControlLabel } from 'rsuite';

import TextCustomField from '../../FinalFormComponent/TextCustomField';
import InputPickerCustomField from '../../FinalFormComponent/InputPickerCustomField';
import DatePickerCustomField from '../../FinalFormComponent/DatePickerCustomField';
import RadioCustomField from '../../FinalFormComponent/RadioCustomField';
import UploadAvataFrom from '../../Customer/AddCustomer/UploadForm/UploadAvataFrom';
import NumberCustomField from '../../FinalFormComponent/NumberCustomField';
import NumberFormatField from '../../FinalFormComponent/NumberFormatField';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { today } from '../../../ApiService/Apiservice';


const AddOrder = (props) => {
    const { product, customer, orders, prodvice = ['Hà Nội'], onGetdata, user } = props;
    const [open, setOpen] = useState(false);

    const [idEdit, setIdEdit] = useState('');
    const [idAvataCurrent, setIdAvataCurrent] = useState('');
    const [idRef, setIdRef] = useState('');
    const [dis, setDis] = useState([]);
    const [statusEdit, setStatusEdit] = useState(false);
    const [isDebit, setIsDebit] = useState();
console.log(statusEdit)
    const handleOpen = () => {
        setOpen(true);
        setIdEdit('');
    };

    const handleClose = async () => {
        setOpen(false);
        if (idEdit) {
            await openNotifi('info', 'edit');
        }
        setIdEdit('');
        setIdAvataCurrent('');
    };
    const saveData = useRef();
    function openNotifi(funcName, status) {
        if (status !== 'edit') {
            if (funcName === 'success') {
                Notification[funcName]({
                    title: 'Tạo mới thành công !',
                    duration: 2000,
                });
            } else {
                Notification[funcName]({
                    title: 'Tạo mới thất bại!',
                    duration: 2000,
                });
            }
        }

        if (funcName === 'warning' && status === 'a') {
            Notification[funcName]({
                title: 'Khách hàng đã tồn tại !',
                description: (
                    <span>
                        Đã tự động chuyển sang CHẾ ĐỘ SỬA,<br></br> Nếu bạn muốn tiếp tục nhập Khách hàng mới, vui lòng
                        chọn NHẬP LẠI và điền lại thông tin !
                    </span>
                ),
                duration: 8000,
            });
        } else if (funcName === 'success') {
            Notification[funcName]({
                title: 'Sửa khách hàng thành công !',
                duration: 2000,
            });
        } else if (funcName === 'info') {
            Notification[funcName]({
                title: 'Đã tắt chế độ sửa !',
                duration: 2000,
            });
        }
        if (status === 'sale') {
            if (funcName === 'warning')
                Notification[funcName]({
                    title: 'Số tiền giảm giá không được lớn hơn tổng tiền !',
                    duration: 3000,
                });
        }
    }

    // add item and rendering component parrent with callback
    const onSubmit = async (values) => {

        if (!values.city) {
            values.city = prodvice[0].name;
            if (!values.districst) {
                values.districst = dis[0].name;
            }
        }
       
        if (values.mobile) {
            values.mobile = values.mobile.replace(/\s/g, '');
        }
        if(values.debit >0){
            values.status ="Còn nợ"
        }else{
            values.status ="Hoàn thành"
        }
        if(!statusEdit){
            
            if (values.mobile) {
                values.mobile = values.mobile.replace(/\s/g, '');
            }
            let newCustomer = {
                city: values.city,
                address:values.address,
                distrist : values.districst,
                full_name: values.full_name,
                note: values.note,
                avata: `idavata${idRef}`,
                mobile: values.mobile,
                gen:values.gen,
                email:values.email,
                idproduct: values.product
            }
            console.log(newCustomer)
            await AddCustomerApi(newCustomer,openNotifi('success','customer'));
      
        }
  
        let newValue = {
                ...values,
                mobile: values.mobile,
            };
            await addOrderApi(newValue, openNotifi('success'));
            await onGetdata(newValue);
            setOpen(false);
        
    };
    const data = prodvice.map((item) => ({ label: item.name, value: item.name }));
    const dataMobile = customer.map((item) => {
        return item.mobile;
    });

    function findCustomer(id) {
        const dataCustomer = customer.find((item) => item.id === id || item.mobile === id);
        return dataCustomer;
    }
    function findProduct(id) {
        const dataProduct = product.find((item) => item.id === id);
        return dataProduct;
    }
    function handleCity(city) {
        const dataDis = prodvice.find((item) => item.name === city);
        const data = dataDis.districts.map((item) => ({ label: item.name, value: item.name }));
        setDis(data);
    }
    const getIdRef = (id) => setIdRef(id);

    //validate
    const required = (value) => (value ? undefined : 'Thông tin này là bắt buộc !');
    const validateMobile = (mobile) => {
        let regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
        if (!mobile) {
            return 'Vui lòng nhập Số điện thoại  !';
        } else if (!regex.test(mobile.replace(/\s/g, ''))) {
            return 'Bạn đã nhập sai định dạng Số điện thoại, Vui lòng kiểm tra lại ! ';
        }
    };
    const validateEmail = (email) => {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !re.test(email)) {
            return 'Bạn đã nhập sai định dạng Email, Vui lòng kiểm tra lại ! ';
        }
    };

    const gen = [
        { label: 'nam', value: 'nam' },
        { label: 'nữ', value: 'nữ' },
    ];
    const speakerCus = (
        <Popover title="Lưu ý">
            <p>Nếu không tìm thấy khách hàng, hãy điền vào "Thông tin khách hàng".</p>
            <p>Điều này sẽ tạo ra 1 khách hàng mới</p>
            <p>Đừng lo lắng! chúng tôi sẽ kiểm tra SĐT để tránh việc trùng lặp </p>
            <i>Tắt chỉ dẫn trong "Cài đặt"</i>
        </Popover>
    );
    const speakerID = (
        <Popover title="Mã đơn hàng là bắt buộc và duy nhất !">
            <p>Khuyên dùng mã có sẵn, liên hệ với chúng tôi nếu bạn muốn thay đổi mã đơn hàng... </p>
            <p>Tip: Mã đơn hàng được bắt đầu từ 'Năm, Tháng' hiện tại và tăng dần.</p>
            <i>Tắt chỉ dẫn trong "Cài đặt"</i>
        </Popover>
    );
    return (
        <>
            <Icon icon="shopping-cart" onClick={() => handleOpen()}></Icon>
            <Modal overflow={false} size="lg" show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>
                        Thêm mới khách hàng
                        <span className="title--addOrder">
                            Người lập: <u>{user}</u>{' '}
                        </span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="580px" classPrefix="popup--addcustomer">
                    
                     
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
AddOrder.protoType={
    deleteCustomer: PropTypes.func.isRequired,
    onGetdata: PropTypes.func.isRequired,
    product: PropTypes.array.isRequired,
    customer: PropTypes.array.isRequired,
    orders: PropTypes.array.isRequired,
    prodvice: PropTypes.array.isRequired,
    user: PropTypes.string
}
export default AddOrder;
