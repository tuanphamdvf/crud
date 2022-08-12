import { Modal, Button, Placeholder } from 'rsuite';
import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { AddCustomerApi } from '../../../ApiService/apiCustomer';
import { getCity, getDistrist } from '../../../ApiService/provincesApi';

const AddCustomer = (props) => {
    const [prodvice, setProvince] = useState([]);
    const [distrist, setDistrist] = useState([]);
    //init
    const [city, setCity] = useState();
    const [initDistrist, setInitDistrist] = useState();
    let codeCity;
    if (city) {
        var res = city.replace(/\D/g, "");
        codeCity =parseInt(res)
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


        await AddCustomerApi(values);
        console.log(values)
        props.onGetdata(values);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button color="blue" appearance="primary" onClick={() => handleOpen()}>
                Thêm mới
            </Button>
            <Modal overflow={false} size={'full'} show={open} onHide={handleClose}>
                <Modal.Header>
                    <Modal.Title>Thêm mới khách hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Placeholder.Graph height="300px" classPrefix="popup--addcustomer">
                        <Form
                            onSubmit={onSubmit}
                            render={({ handleSubmit, form, submitting, pristine, values }) => (
                                <form onSubmit={handleSubmit} className="from--addcustomer">
                                    <div className="grid--addcustomer--wrapper">
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="full_name"
                                                component="input"
                                                type="text"
                                                placeholder="Họ và Tên"
                                            />
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="mobile"
                                                component="input"
                                                type="text"
                                                placeholder="099xxxxxxxx"
                                            />
                                            <span className="addcustomer--name--after">SDT</span>
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
                                                    console.log(e.target.id)
                                                    setCity(e.target.value);
                                                }}
                                            >
                                                {prodvice &&
                                                    prodvice.map((item) => {
                                                        return (
                                                            <option name={item.code}  key={item.code}>
                                                                {item.code}, {item.name}
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
                                            <Field
                                                className="addcustomer--input--name"
                                                name="email"
                                                component="input"
                                                type="text"
                                                placeholder="email@gmail.com"
                                            />
                                            <span className="addcustomer--name--after">Email</span>
                                        </div>
                                        <div className="buttons addcustomer--button--submit">
                                            <Button
                                                onClick={handleClose}
                                                appearance="primary"
                                                type="submit"
                                                disabled={submitting || pristine}
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

export default AddCustomer;
