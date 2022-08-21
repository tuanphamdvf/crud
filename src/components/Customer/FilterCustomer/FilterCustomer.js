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
           
        </div>
    );
}

export default FilterCustomer;
