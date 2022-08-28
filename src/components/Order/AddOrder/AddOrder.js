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
                        <FinalForm
                            onSubmit={onSubmit}
                            initialValues={{}}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <FromRsuite onSubmit={handleSubmit} ref={saveData} className="from--addcustomer">
                                    {' '}
                                    <div className="grid--addOrder--wrapper">
                                        <div className="addorder--wrapper--info flexBetween">
                                            <pre>{JSON.stringify(values, 0, 2)}</pre>
                                            <FormGroup classPrefix="">
                                                <Field
                                                    name="createDate"
                                                    component={DatePickerCustomField}
                                                    placeholder="Chọn ngày"
                                                    initialValue={today}
                                                ></Field>
                                            </FormGroup>
                                            <FormGroup classPrefix="grid--addcustomer--item">
                                                <Field
                                                    name="customer"
                                                    component={InputPickerCustomField}
                                                    inputvalue={customer}
                                                    labelKey="full_name"
                                                    valueKey="id"
                                                    placeholder="Họ tên..."
                                                    onSelect={(id) => {
                                                        setDis(findCustomer(id).districts);
                                                        form.change('full_name', findCustomer(id).full_name);
                                                        form.change('email', findCustomer(id).email);
                                                        form.change('dob', findCustomer(id).dob);
                                                        form.change('city', findCustomer(id).city);
                                                        form.change('districst', findCustomer(id).distrist);
                                                        form.change('address', findCustomer(id).address);
                                                        form.change('mobile', findCustomer(id).mobile);
                                                        form.change('idOrder', orders[orders.length - 1].id + 1);
                                                        form.change('gen', findCustomer(id).gen);
                                                        setIdAvataCurrent(findCustomer(id).avata);
                                                        setStatusEdit(true);
                                                    }}
                                                    onClean={() => {
                                                        form.reset();
                                                        setStatusEdit(false);
                                                        setIdRef('');
                                                        setDis([]);
                                                        setStatusEdit(false);
                                                        setIdEdit('');

                                                        setIdAvataCurrent('');
                                                    }}
                                                ></Field>
                                                <ControlLabel classPrefix="addcustomer--name--after ">
                                                    Tìm khách hàng
                                                </ControlLabel>
                                            </FormGroup>
                                            <FormGroup classPrefix="idOrder">
                                                <Field
                                                    name="idOrder"
                                                    component={TextCustomField}
                                                    validate={required}
                                                    disabled
                                                ></Field>
                                                <ControlLabel classPrefix="addcustomer--name--after ">
                                                    Mã hoá đơn *{' '}
                                                    <Whisper
                                                        placement="bottomStart"
                                                        trigger="hover"
                                                        speaker={speakerID}
                                                    >
                                                        <Icon className="active" icon="info-circle"></Icon>
                                                    </Whisper>
                                                </ControlLabel>
                                            </FormGroup>
                                        </div>

                                        <div className="addorder--wrapper--content">
                                            <div className="wrapper--info--addorder">
                                                <div className="info--customer--addorder">
                                                    <span className="active">Thông tin khách hàng </span>
                                                    <Whisper placement="leftStart" trigger="hover" speaker={speakerCus}>
                                                        <Icon className="active" icon="info-circle"></Icon>
                                                    </Whisper>
                                                </div>
                                                <div className="addoder--info--user">
                                                    <FormGroup classPrefix="grid--addcustomer--item">
                                                        <Field
                                                            name="mobile"
                                                            component={TextCustomField}
                                                            validate={validateMobile}
                                                            parse={normalizePhone}
                                                            disabled={statusEdit}
                                                            placeholder="___ ___ ____"
                                                            onBlur={(e) => {
                                                                form.change('idOrder', orders[orders.length - 1].id + 1);
                                                                let value = e.target.value;
                                                                if (value) {
                                                                    value = value.replace(/\s/g, '');
                                                                }
                                                                if (dataMobile.find((item) => item === value)) {
                                                                    setDis(findCustomer(value).districts);
                                                                    setIdEdit(findCustomer(value).id);

                                                                    if (dis) {
                                                                        form.change(
                                                                            'full_name',
                                                                            findCustomer(value).full_name,
                                                                        );
                                                                        form.change('email', findCustomer(value).email);
                                                                        form.change('dob', findCustomer(value).dob);
                                                                        form.change('city', findCustomer(value).city);
                                                                        form.change(
                                                                            'districst',
                                                                            findCustomer(value).distrist,
                                                                        );
                                                                        openNotifi('warning', 'edit');
                                                                        setStatusEdit(false);
                                                                    }
                                                                }
                                                                
                                                            }}
                                                        ></Field>

                                                        <ControlLabel classPrefix="addcustomer--name--after ">
                                                            Số Điện Thoại *
                                                        </ControlLabel>
                                                    </FormGroup>
                                                    <FormGroup classPrefix="grid--addcustomer--item">
                                                        <Field
                                                            name="full_name"
                                                            component={TextCustomField}
                                                            className="addorder--name"
                                                            placeholder=""
                                                            disabled={statusEdit}
                                                            onBlur= {()=> {
                                                                form.change('idOrder', orders[orders.length - 1].id + 1);
                                                            }}
                                                        ></Field>

                                                        <ControlLabel classPrefix="addcustomer--name--after">
                                                            Tên khách hàng *
                                                        </ControlLabel>
                                                    </FormGroup>
                                                    <FormGroup classPrefix="grid--addcustomer--item">
                                                        <Field
                                                            name="gen"
                                                            disabled={statusEdit}
                                                            component={RadioCustomField}
                                                            inputvalue={gen}
                                                            className="addorder--gen"
                                                            placeholder="..."
                                                            initialValue='nữ'
                                                            
                                                        ></Field>
                                                    </FormGroup>
                                                </div>
                                                <div className="addorder--about">
                                                    <FormGroup>
                                                        <Field
                                                            name="email"
                                                            disabled={statusEdit}
                                                            component={TextCustomField}
                                                            placeholder="email@example.com"
                                                            validate={validateEmail}
                                                        ></Field>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Field
                                                            name="note"
                                                            component={TextCustomField}
                                                            placeholder="Ghi chú...."
                                                        ></Field>
                                                    </FormGroup>
                                                </div>
                                                <div className="addoder--info--address">
                                                    <FormGroup>
                                                        <Field
                                                            placeholder="..."
                                                            name="city"
                                                            disabled={statusEdit}
                                                            component={InputPickerCustomField}
                                                            inputvalue={data}
                                                            onSelect={(value) => {
                                                                handleCity(value);
                                                            }}
                                                        ></Field>

                                                        <ControlLabel classPrefix="addcustomer--name--after ">
                                                            Tỉnh/ Thành phố
                                                        </ControlLabel>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Field
                                                            name="districst"
                                                            component={InputPickerCustomField}
                                                            inputvalue={dis}
                                                            disabled={statusEdit}
                                                            placeholder="..."
                                                        ></Field>

                                                        <ControlLabel classPrefix="addcustomer--name--after ">
                                                            Quận/huyện
                                                        </ControlLabel>
                                                    </FormGroup>
                                                    <FormGroup>
                                                        <Field
                                                            name="address"
                                                            disabled={statusEdit}
                                                            component={TextCustomField}
                                                            placeholder="..."
                                                        ></Field>

                                                        <ControlLabel classPrefix="addcustomer--name--after">
                                                            Địa chỉ
                                                        </ControlLabel>
                                                    </FormGroup>
                                                </div>
                                            </div>
                                            <div className="addorder--avata">
                                                <FormGroup>
                                                    <Field
                                                        disabled={statusEdit}
                                                        IdcusEdit={idAvataCurrent}
                                                        getId={getIdRef}
                                                        name="avata"
                                                        component={UploadAvataFrom}
                                                        {...props}
                                                    ></Field>

                                                    <ControlLabel classPrefix="gen--addorder--avata">
                                                        Avata
                                                    </ControlLabel>
                                                </FormGroup>
                                            </div>
                                        </div>
                                        <FlexboxGrid align="middle" className="addorder--product">
                                            <FlexboxGrid.Item colspan={7}>Sản phẩm</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={7}>Giá bán</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={5}>Số lượng</FlexboxGrid.Item>
                                            <FlexboxGrid.Item colspan={5}>Thành tiền </FlexboxGrid.Item>
                                        </FlexboxGrid>

                                        <div className="addorder--wrapprer--handle">
                                            <FlexboxGrid className="addorder--handle--row">
                                                <FlexboxGrid.Item colspan={7}>
                                                    <FormGroup classPrefix="grid--addorder--product">
                                                        <Field
                                                            name="product"
                                                            component={InputPickerCustomField}
                                                            placeholder="Chọn sản phẩm "
                                                            inputvalue={product}
                                                            labelKey="name"
                                                            valueKey="id"
                                                            // validate={required}
                                                            onSelect={(id) => {
                                                                form.change('price', findProduct(id).price);
                                                                if (values.number) {
                                                                    form.change(
                                                                        'totalproduct',
                                                                        findProduct(id).price * values.number,
                                                                    );
                                                                    form.change(
                                                                        'total',
                                                                        findProduct(id).price * values.number -
                                                                            values.sale,
                                                                    );
                                                                    if (values.money) {
                                                                        form.change(
                                                                            'total',
                                                                            findProduct(id).price * values.number -
                                                                                values.sale,
                                                                        );
                                                                    }
                                                                }
                                                            }}
                                                            onClean={() => {
                                                                if (values.number || values.price) {
                                                                    form.change('number', 0);
                                                                    form.change('price', 0);
                                                                    form.change('totalproduct', 0);
                                                                    form.change(
                                                                        'total',
                                                                        values.totalproduct - values.totalproduct,
                                                                    );
                                                                    form.change('sale', 0);
                                                                    if (values.money > 0) {
                                                                        form.change('due', values.money - 0);
                                                                    }
                                                                    form.change('debit', 0);
                                                                }
                                                            }}
                                                        ></Field>
                                                    </FormGroup>
                                                </FlexboxGrid.Item>
                                                <FlexboxGrid.Item colspan={7}>
                                                    <FormGroup classPrefix="grid--addorder--number">
                                                        <Field
                                                            name="price"
                                                            component={NumberFormatField}
                                                            disabled
                                                            className="grid--addOrder--price"
                                                        ></Field>
                                                    </FormGroup>
                                                </FlexboxGrid.Item>
                                                <FlexboxGrid.Item colspan={5}>
                                                    <FormGroup classPrefix="grid--addorder--number">
                                                        <Field
                                                            name="number"
                                                            component={NumberCustomField}
                                                            className="grid--addOrder--number"
                                                            onChange={(e) => {
                                                                form.change('totalproduct', e * values.price);
                                                                if (values.money) {
                                                                    if (values.money > e * values.price) {
                                                                        form.change(
                                                                            'due',
                                                                            values.money - e.target.price,
                                                                        );
                                                                    } else {
                                                                        form.change(
                                                                            'debit',
                                                                            e * values.price - values.money,
                                                                        );
                                                                    }
                                                                }
                                                                if (values.sale) {
                                                                    form.change(
                                                                        'total',
                                                                        e * values.price - values.sale,
                                                                    );
                                                                } else {
                                                                    form.change('total', e * values.price);
                                                                }
                                                            }}
                                                        ></Field>
                                                    </FormGroup>
                                                </FlexboxGrid.Item>
                                                <FlexboxGrid.Item colspan={5}>
                                                    <FormGroup classPrefix="grid--addorder--number">
                                                        <Field
                                                            name="totalproduct"
                                                            component={NumberFormatField}
                                                            disabled
                                                            className="grid--addOrder--number"
                                                        ></Field>
                                                    </FormGroup>
                                                </FlexboxGrid.Item>
                                            </FlexboxGrid>
                                            <div className="addorder--voucher grid--handle">
                                                <div>Giảm giá</div>
                                                <FormGroup>
                                                    <Field
                                                        name="sale"
                                                        component={NumberFormatField}
                                                        onChange={(e) => {
                                                            const i = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                                                            if (!i) {
                                                                form.change('total', values.totalproduct);
                                                            }
                                                            if (values.money) {
                                                                if (values.money > values.total) {
                                                                    form.change('due', values.money - values.total);
                                                                } else {
                                                                    form.change('debit', values.total - values.money);
                                                                }
                                                            }
                                                            if (i) {
                                                                form.change('total', values.totalproduct - i);
                                                                if (i > values.totalproduct) {
                                                                    form.change('total', 0);
                                                                    form.change('money', 0);
                                                                    openNotifi('warning', 'sale');
                                                                } else {
                                                                    form.change('total', values.totalproduct - i);
                                                                }
                                                            }
                                                        }}
                                                    ></Field>
                                                </FormGroup>
                                            </div>
                                            <div className="addorder--total grid--handle">
                                                <div className="wrapper--addorder--total">Tổng tiền đơn hàng</div>
                                                <FormGroup>
                                                    <Field name="total" component={NumberFormatField} disabled></Field>
                                                </FormGroup>
                                            </div>
                                            <div className="addorder--credit grid--handle">
                                                <div>Tổng tiền thanh toán </div>
                                                <FormGroup>
                                                    <Field
                                                        step={100000}
                                                        name="money"
                                                        component={NumberFormatField}
                                                        placeholder=""
                                                        onChange={(e) => {
                                                            const i = parseInt(e.target.value.replace(/[^0-9]/g, ''));
                                                            if (i < values.total) {
                                                                setIsDebit(true);
                                                                form.change('debit', values.total - i);
                                                            } else {
                                                                setIsDebit(false);
                                                                form.change('due', i - values.total);
                                                            }
                                                        }}
                                                    ></Field>
                                                </FormGroup>
                                                {isDebit ? (
                                                    <div className="debit--wrapper">
                                                        <div className="affter--debit--due">Còn nợ </div>
                                                        <FormGroup>
                                                            <Field
                                                                disabled
                                                                name="debit"
                                                                component={NumberFormatField}
                                                                placeholder=""
                                                            ></Field>
                                                        </FormGroup>
                                                    </div>
                                                ) : (
                                                    <div className="due--wrapper">
                                                        <div className="affter--debit--due">Trả lại khách </div>
                                                        <FormGroup>
                                                            <Field
                                                                disabled
                                                                name="due"
                                                                component={NumberFormatField}
                                                                placeholder=""
                                                            ></Field>
                                                        </FormGroup>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <ButtonToolbar className="buttons addcustomer--button--submit">
                                            <Button
                                                appearance="primary"
                                                type="submit"
                                                disabled={submitting || pristine}
                                                color="green"
                                            >
                                                Tạo mới
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    form.reset();
                                                    setIdEdit('');
                                                    setStatusEdit(false);
                                                    setIdRef('');
                                                    setDis([]);
                                                    setIdAvataCurrent('');
                                                }}
                                                color="blue"
                                            >
                                                Nhập lại
                                            </Button>
                                        </ButtonToolbar>
                                    </div>
                                </FromRsuite>
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
