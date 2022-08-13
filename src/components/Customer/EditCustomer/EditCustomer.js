import { Modal, Button, Placeholder } from 'rsuite';
import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';

import { EditCustomerApi } from '../../../ApiService/apiCustomer';
import { getCity, getDistrist } from '../../../ApiService/provincesApi';
import { getIdCity } from '../AddCustomer/AddCustomer';

const EditCustomer = (props) => {
    const { item: i, editCustomer: edit } = props;
    const [prodvice, setProvince] = useState([]);
    const [distrist, setDistrist] = useState([]);
    const [city, setCity] = useState(i.city);
    const [initDistrist, setInitDistrist] = useState(i.distrist);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onSubmit = async (values) => {
        await EditCustomerApi(values, i.id);
        await edit(values, i.id);
        setOpen(false);
    };

    let codeCity = 1;
    if (city) {
        var res = getIdCity(prodvice, city);
        if (res) codeCity = parseInt(res.code);
    }

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const resCityService = await getCity();
                setProvince(resCityService);
                if (codeCity) {
                    const resDisService = await getDistrist(codeCity);
                    setDistrist(resDisService.districts);
                    setInitDistrist(resDisService.districts[0].name);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, [codeCity]);

    return (
        <>
            <i className="fa-solid fa-pen-to-square editcustomer--buton" onClick={() => handleOpen()}></i>
            <Modal onHide={handleClose} overflow={false} size={'lg'} show={open}>
                <Modal.Header>
                    <Modal.Title>Cập nhật khách hàng "{i.full_name} "</Modal.Title>
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
                            initialValues={{
                                full_name: i.full_name,
                                mobile: i.mobile,
                                distrist: initDistrist,
                                city: city,
                                dob: i.dob,
                                email: i.email,
                            }}
                            render={({ handleSubmit, form, submitting, pristine }) => (
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
                                            <span className="addcustomer--name--after">SDT</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="distrist"
                                                component="select"
                                                type="text"
                                                placeholder="Quận/Huyện"
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
                                                onChange={(e) => {
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
                                                color="blue"
                                            >
                                                Cập nhật
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

export default EditCustomer;
