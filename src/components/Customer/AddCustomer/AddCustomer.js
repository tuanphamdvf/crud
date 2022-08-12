import { Modal, Button, Placeholder } from 'rsuite';
import { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { AddCustomerApi } from '../../../ApiService/apiCustomer';
import { getCity, getDistrist } from '../../../ApiService/provincesApi';
const getIdCity = (a, x) => {
    if (x) return a.find((item) => (item.name === x ||item.code ===x ));
    else return { code: 1 };
};
const AddCustomer = (props) => {
    let codeCity;
    const [prodvice, setProvince] = useState([]);
    const [distrist, setDistrist] = useState([]);
    //init
    const [city, setCity] = useState();
    const [initDistrist, setInitDistrist] = useState();
    //get CODE CITY
    

    if (city) {
        var res = getIdCity(prodvice, city);
        codeCity = parseInt(res.code);
    } else {
        codeCity = 1;
    }
    //nếu người dùng chọn thành phố thì trả về các quận của thành phố, nếu không chọn để mặc định là hà nội
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
        // lưu lại code của tỉnh và quận của người dùng vào database

        let idCity = getIdCity(prodvice, values.city);
        let idDitrisct = getIdCity(distrist, values.distrist);
        if (!values.city) {
            values.city = 'Hà Nội';
        }
        let newCity = values.city.replace(/[0-9]/g, '');
        let newValue = { ...values, city: newCity, codeCity: idCity.code, codeDistrict: idDitrisct.code };
        await AddCustomerApi(newValue);
        props.onGetdata(newValue);
    };
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => setOpen(false);
    return (
        <>
            <Button color="green" appearance="primary" onClick={() => handleOpen()}>
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

export default AddCustomer;
export {getIdCity}