import { useEffect, useState, useRef } from 'react';
import styles from './Order.module.scss';
import classNames from 'classnames/bind';

import {FlexboxGrid,Pagination} from 'rsuite'
import { getOrders } from '../../ApiService/ApiOrder';

import { handleString } from '../../components/Function/Function';
import AddOrder from '../../components/Order/AddOrder/AddOrder';
import Order from '../../components/Order/Orders/OrderTable';
import { getAllAdress } from '../../ApiService/provincesApi';
import { getCustomer } from '../../ApiService/apiCustomer';
import { getProducts } from '../../ApiService/apiProduct';

function Orders() {
    const cx = classNames.bind(styles);
    const [wordEntered, setWordEntered] = useState('');
    const [activePage, setActivePage] = useState(1);
    const [customer, setCustomer] = useState([])
    const [product, setProduct] = useState([])
    
    const user = "Tuấn Phạm"

    // array current
    const dataCus = useRef();
    const [orders, setOrders] = useState([]);
    const [prodvice, setProvince] = useState()

    function deleteOrder(id) {
        const newOrder = orders.filter((item) => {
            return item.id !== id;
        });
        setOrders(newOrder);
    }
    //-----edit-------
    // function editOrder(value, id) {
    //     const newArr = orders.map((item) => {
    //         if (item.id === id) {
    //             return (item = value);
    //         }
    //         return item;
    //     });
    //     setOrders(newArr);
    // }
    //----filter----
    //      function filterOrder(data) {
    //     if (data.full_name || data.product || data.email || data.mobile) {
    //         let name = handleString(data.full_name);
    //         let mobile = handleString(data.mobile);
    //         let product = handleString(data.product);
    //         //loc tren array current
    //         const newArr = dataCus.current.filter((item) => {
    //             let nameItem = handleString(item.full_name);
    //             let productItem = handleString(item.idproduct);
    //             let mobileItem = handleString(item.mobile);
    //             return (
    //                 (!name || nameItem === name) &&
    //                 (!mobile || mobileItem === mobile) &&
    //                 (!product || productItem === data.product) &&
    //                 (!data.email || item.email === data.email)
    //             );
    //         });
    //         setOrders(newArr);
    //     } else {
    //         setOrders(dataCus.current);
    //     }
    // }

    //-----ADD------
    function getdata(data) {
        if (data) return setOrders([...orders, data]);
    }

    //get data
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const orderItem = await getOrders();
                setOrders(orderItem);
                dataCus.current = orderItem;
                const prodvice = await getAllAdress()
                setProvince(prodvice)
                const dataCustomer = await getCustomer()
                setCustomer(dataCustomer)
                const products = await getProducts()
                setProduct(products)
 

            } catch (error) {
                console.log(error);
            }
        };
        fetchApi();
    }, []);
    //-----Search----

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = orders.filter((item) => {
            return (
                handleString(item.full_name).toLowerCase().includes(handleString(searchWord).toLowerCase()) ||
                item.mobile.toLowerCase().includes(searchWord.toLowerCase()) ||
                item.idOrder.toLowerCase().includes(searchWord.toLowerCase())||
                item.listproduct.name.toLowerCase().includes(searchWord.toLowerCase())
            );
        });

        if (searchWord === '') {
            setOrders(dataCus.current);
        } else {
            setOrders(newFilter);
        }
    };

    const clearInput = () => {
        setOrders([]);
        setWordEntered('');
    };
    function handleSelect(eventKey) {
        setActivePage(eventKey);
    }
    const arrayCustomer = customer.map((item)=>{
        if(prodvice){ const x = prodvice.find((i) => i.name === item.city);
            let y = ['Select City']
            if(x) y = x.districts.map((j) => ({ label: j.name, value: j.name }))
            item.districts = y
            return item}else
            return item
    })

   
    const data = [...orders].reverse().filter((v, i) => {
        const start = 10 * (activePage - 1);
        const end = start + 10;
        return i >= start && i < end;
    });

    let lastId = new Date().valueOf()

    
    

    return (
        <>
            <div className={cx('wrapper--dasboard')} id="wrapper--dasboard">
                <div className={cx('wrapper--customer')}>
                    <div className={cx('table--customer--header')}>
                        <span className={cx('table--customer--title')}>Danh sách khách hàng</span>
                        <div className={cx('table--customer--action')}>
                            <div className={cx('customer--search--wrapper')}>
                                <input
                                    className={cx('customer--search--input')}
                                    placeholder="Tìm kiếm... "
                                    onChange={handleFilter}
                                    value={wordEntered}
                                />
                                <div>
                                    {!wordEntered.length === 0 && <i onClick={clearInput} class="fa-solid fa-x"></i>}
                                    <i className={cx('fa-solid fa-magnifying-glass search--icon')}></i>
                                </div>
                            </div>
                            <div className={cx('wrapper--action--left')}>
                                {orders &&<AddOrder product ={product} orders = {orders} user = {user} idOrder ={lastId} prodvice ={prodvice} onGetdata={getdata} customer ={customer}></AddOrder>
                                }
                                
                                <div className={cx('table--customer--filter')}>
                                    {/* <FilterCustomer filter={filterOrder}></FilterCustomer> */}
                                </div>
                            </div>
                        </div>
                        <div className="customer--header--wrapper">
                                <FlexboxGrid align="middle" className="show-grid grid--title--customer">
                                    <FlexboxGrid.Item className="item--customer" colspan={3}>
                                     MÃ HOÁ ĐƠN
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item className="item--customer" colspan={4}>
                                        TÊN KHÁCH HÀNG
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item className="item--customer" colspan={3}>
                                        SỐ ĐIỆN THOẠI
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item className="item--customer" colspan={5}>
                                        ĐỊA CHỈ
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item className="item--customer" colspan={4}>
                                       TỔNG TIỀN
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item className="item--customer" colspan={2}>
                                       TRẠNG THÁI
                                    </FlexboxGrid.Item>
                                    <FlexboxGrid.Item className="item--customer customer--action" colspan={3}>
                                        CHỨC NĂNG
                                    </FlexboxGrid.Item>
                                </FlexboxGrid>
                            </div>
                        {data.map((item, index) => {
                                    let focusElement;
                                    if (index !== 0 && index % 2 !== 0) {
                                        focusElement = 'table--item--bold';
                                    } else {
                                        focusElement = '';
                                    }
                                    return (
                                        <Order
                                            key={item.id}
                                            item={item}
                                            forcus={focusElement}
                                            deleteOrder ={deleteOrder}
                                            customer = {arrayCustomer}
                                            
                                        />
                                    );
                                })}
                    </div>
                    <div className="wrapper--paging">
                        <Pagination
                            prev
                            last
                            next
                            first
                            layout={['total', '|', 'pager', 'skip']}
                            size="lg"
                            pages={Math.ceil(orders.length / 10)}
                            activePage={activePage}
                            onSelect={handleSelect}
                            total={orders.length}
                            ellipsis
                            boundaryLinks
                        />
                    </div>
                </div>
                
                <div className={cx('wrapper--footer')}>
                    <div className={cx('footer')}>
                        <span className={cx('footer--content')}>© 2022 VnSolution. All rights reserved.</span>
                        <div className={cx('footer--wrapper--icon')}>
                            <i className={cx('fa-solid fa-f footet--icon')}></i>
                            <i className={cx('fa-brands fa-twitter footet--icon ')}></i>
                            <i className={cx('fa-brands fa-github footet--icon')}></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Orders;
