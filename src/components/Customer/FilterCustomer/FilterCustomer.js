import { useState, useEffect } from 'react';

import { Drawer, Button, Placeholder } from 'rsuite';
import { Form, Field } from 'react-final-form';
import { getProducts } from '../../../ApiService/apiProduct';

function FilterCustomer(props) {
    const { filter: render } = props;

    const [open, setOpen] = useState(false);
    const [product, setProduct] = useState();
    const [listProduct, setListProduct] = useState([]);

    const handleOpen = () => setOpen(true);

    const onSubmit = async (values) => {
        render(values);
        setOpen(false);
        console.log(values);
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
                            render={({ handleSubmit, form, submitting, pristines, values }) => (
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
                                                placeholder="0xxx.xxx.xxx"
                                            />
                                            <span className="addcustomer--name--after">SDT</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="product"
                                                component="select"
                                                type="text"
                                                placeholder="Sản phẩm đã mua"
                                                initialValue={product}
                                                onChange={(e) => {
                                                    setProduct(e.target.value);
                                                }}
                                            >
                                                {listProduct &&
                                                    listProduct.map((item) => {
                                                        return (
                                                            <option name={item.code} key={item.code}>
                                                                {item.name}
                                                            </option>
                                                        );
                                                    })}
                                            </Field>
                                            <span className="affter--filter--productsales">Sản phầm đã mua</span>
                                        </div>
                                        <div className="grid--addcustomer--item">
                                            <Field
                                                className="addcustomer--input--name"
                                                name="email"
                                                component="input"
                                                type="text"
                                                placeholder="xxxxx@vnsolution.com"
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
