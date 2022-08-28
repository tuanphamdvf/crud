import { useState, useEffect } from 'react';

import { Drawer, Button, Placeholder, InputPicker } from 'rsuite';
import { Form, Field } from 'react-final-form';
import { getProducts } from '../../../ApiService/apiProduct';

function FilterCustomer(props) {
    const { filter: render } = props;

    const [open, setOpen] = useState(false);
    const [listProduct, setListProduct] = useState([]);
    const [filterData, setDataFilter] = useState({ name: '', mobile: '', product: '', email: '' });

    const handleOpen = () => setOpen(true);

    const onSubmit = async (values) => {
        setDataFilter({ name: values.full_name, mobile: values.mobile, product: values.product, email: values.email });
        render(values);
        setOpen(false);
    };
    // get data product
    useEffect(() => {
        let mounted = true;
        getProducts().then((items) => {
            if (mounted) {
                setListProduct(items);
            }
        });
        return () => (mounted = false);
    }, []);
    const data = listProduct.map((item) => ({ label: item.name, value: item.name }));
    return (
        <div>
            <Button onClick={() => handleOpen('top')}>Bộ lọc</Button>
            <Drawer overflow={false} placement="right" size={'sm'} show={open} onHide={() => setOpen(false)}>
                <Drawer.Header>
                    <Drawer.Title>Tìm kiếm khách hàng</Drawer.Title>
                </Drawer.Header>
                <Drawer.Body overflow={false} className="bodyfilter--draw">
                    <Placeholder.Graph overflow={false} classPrefix="popup--filtercustomer">
                        <Form
                            onSubmit={onSubmit}
                            initialValues={{
                                full_name: filterData.name,
                                email: filterData.email,
                                mobile: filterData.mobile,
                                product: filterData.product,
                            }}
                            render={({ handleSubmit, form, values }) => (
                                <form onSubmit={handleSubmit} className="from--filtercustomer">
                                    <div className="grid--filtercustomer--wrapper">
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
                                                placeholder="___ ___ ____"
                                            />
                                            <span className="addcustomer--name--after">SDT</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field className="addcustomer--input--name" name="product">
                                                {() => (
                                                    <div className="wrapper--filed">
                                                        <InputPicker
                                                            className="addcustomer--input--name"
                                                            data={data}
                                                            onChange={(value) => {
                                                                values.product = value
                                                            }}
                                                            placeholder={`Sản phẩm đã mua: ${values.product}`}
                                                  
                                                        />
                                                    </div>
                                                )}
                                            </Field>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="email"
                                                component="input"
                                                type="text"
                                                placeholder="___email@gmail.com"
                                            />
                                            <span className="addcustomer--name--after">Email</span>
                                        </div>
                                        <div className="buttons filter--button--submit">
                                            <Button
                                                className="button--filter--Customer"
                                                appearance="primary"
                                                type="submit"
                                                color="green"
                                            >
                                                Lọc
                                            </Button>
                                            <Button
                                                className="button--filter--Customer"
                                                color="blue"
                                                onClick={(values) => {
                                                    setDataFilter({ ...filterData,name: '', mobile: '', product: '', email: '' });
                                                    form.reset();
                                                    render(values);
                                                }}
                                                appearance="primary"
                                            >
                                                Lọc lại
                                            </Button>
                                            <Button
                                                color="red"
                                                onClick={() => {
                                                    setOpen(false);
                                                }}
                                                appearance="primary"
                                            >
                                                Thu gọn
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            )}
                        />
                    </Placeholder.Graph>
                </Drawer.Body>
            </Drawer>
        </div>
    );
}

export default FilterCustomer;
