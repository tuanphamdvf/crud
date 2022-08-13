import { Modal, Button, Placeholder } from 'rsuite';
import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

import { AddCustomerApi } from '../../../ApiService/apiCustomer';
import { getCity, getDistrist } from '../../../ApiService/provincesApi';

const AddCustomer = (props) => {
  
    const [prodvice, setProvince] = useState([]);
    const [distrist, setDistrist] = useState([]);
    const [open, setOpen] = useState(false);
    const [city, setCity] = useState();
    const [initDistrist, setInitDistrist] = useState();

    const handleOpen = () =>  setOpen(true);
    const handleClose = () => setOpen(false);
    
    //get CODE CITY
    let codeCity;
    if (city) {
        var res = getIdCity(prodvice, city);
        codeCity = parseInt(res.code);
    } else {
        codeCity = 1;
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resCityService = await getCity();
                setProvince(resCityService);
                if (codeCity) {
                    const resDisService = await getDistrist(codeCity);
                    setDistrist(resDisService.districts);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [codeCity]);

    // add item and rendering component parrent with callback
    const onSubmit = async (values) => {
        if (!values.city) {
            values.city = prodvice[0].name;
        }
        if (!values.distrist) {
            values.distrist = distrist[0].name;
        }
        let newValue = { ...values, city: values.city, distrist: values.distrist,idproduct:'Iphone X' };
        await AddCustomerApi(newValue);
        await props.onGetdata(newValue);
        setOpen(false)
    };

    return (
        <>
            <Button color="green" appearance="primary" onClick={() => handleOpen()}>
                Thêm mới
            </Button>
            <Modal overflow={false} size="lg" show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Thêm mới khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="300px" classPrefix="popup--addcustomer">
                        <Form
                            validate={(values) => {
                                //validate email + mobile using regex
                                let regex = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
                                let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                                const errors = {};
                                if (!values.full_name) {
                                    errors.full_name = 'Vui lòng nhập tên khách hàng !';
                                }
                                if (!values.mobile) {
                                    errors.mobile = 'Vui lòng nhập SDT !';
                                } else if (!regex.test(values.mobile)) {
                                    errors.mobile = 'Bạn đã nhập sai định dạng SDT, Vui lòng kiểm tra lại ! ';
                                }

                                if (values.email && !re.test(values.email)) {
                                    errors.email = 'Bạn đã nhập sai định dạng Email, Vui lòng kiểm tra lại ! ';
                                }
                                return errors;
                            }}
                            onSubmit={onSubmit}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} className="from--addcustomer">
                                    <div className="grid--addcustomer--wrapper">
                                        <div className="grid--addcustomer--item">
                                            <Field name="full_name">
                                                {({ input, meta }) => (
                                                    <div className="wrapper--filed">
                                                        <input
                                                            className="addcustomer--input--name"
                                                            {...input}
                                                            type="text"
                                                            placeholder="Họ và tên *"
                                                        />
                                                        {meta.error && meta.touched && (
                                                            <span className="warning">{meta.error}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                        </div>

                                        <div className="grid--addcustomer--item">
                                            <Field name="mobile">
                                                {({ input, meta }) => (
                                                    <div className="wrapper--filed">
                                                        <input
                                                            className="addcustomer--input--name"
                                                            {...input}
                                                            type="text"
                                                            placeholder="0xxx.xxx.xxx"
                                                        />
                                                        {meta.error && meta.touched && (
                                                            <span className="warning">{meta.error}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                            <span className="addcustomer--name--after">SDT *</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="distrist"
                                                component="select"
                                                type="text"
                                                placeholder="Quận/Huyện"
                                                initialValue={initDistrist}
                                                onChange={(e) => {
                                                    setInitDistrist(e.target.value);
                                                }}
                                            >
                                                {distrist &&
                                                    distrist.map((item) => {
                                                        return (
                                                            <option name={item.code} key={item.code}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                            </Field>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="city"
                                                component="select"
                                                type="text"
                                                placeholder="Thành phố"
                                                initialValue={city}
                                                onChange={(e) => {
                                                    console.log(e.target.value);
                                                    setCity(e.target.value);
                                                }}
                                            >
                                                {prodvice &&
                                                    prodvice.map((item) => {
                                                        return (
                                                            <option name={item.code} key={item.code}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                            </Field>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="dob"
                                                component="input"
                                                type="date"
                                            />
                                            <span className="addcustomer--name--after">Ngày sinh</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field name="email">
                                                {({ input, meta }) => (
                                                    <div className="wrapper--filed">
                                                        <input
                                                            className="addcustomer--input--name"
                                                            {...input}
                                                            type="text"
                                                            placeholder="email@example.vn"
                                                        />
                                                        {meta.error && meta.touched && (
                                                            <span className="warning">{meta.error}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </Field>
                                            <span className="addcustomer--name--after">Email</span>
                                        </div>
                                        <div className="buttons addcustomer--button--submit">
                                            <Button
                                                appearance="primary"
                                                type="submit"
                                                disabled={submitting || pristine}
                                                color="green"
                                            >
                                                Tạo mới
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

const getIdCity = (a, x) => {
    if (x) return a.find((item) => item.name === x || item.code === x);
    else return { code: 1 };
};
export { getIdCity };
export default AddCustomer;
