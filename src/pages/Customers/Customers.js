import Customer from '../../components/Customer/CustomerItem/Customer';
import { FlexboxGrid } from 'rsuite';
import { useEffect, useState } from 'react';
import { getCustomer } from '../../ApiService/apiCustomer';
import AddCustomer from '../../components/Customer/AddCustomer/AddCustomer';
import FilterCustomer from '../../components/Customer/FilterCustomer/FilterCustomer';
function Customers() {
    const [customer, setCustomer] = useState([]);
    const [filter, setFilter] = useState({ content: 'Bộ lọc', isShow: false });
    const showFilter = () => {
        if (!filter.isShow) setFilter({ content: 'Ẩn bộ lọc', isShow: true });
        else {
            setFilter({ content: 'Bộ Lọc', isShow: false });
        }
    };
    // Function handle when add item, then render list item
    function getdata(data) {
        if (data) return setCustomer([...customer, data]);
    }
    // Function handle when add item, then render list item
    function deleteCustomer(id) {
        const newCustomer = customer.filter((item) => {
            return item.id !== id;
        });
        setCustomer(newCustomer);
    }
    function editCustomer(value, id) {
        const newArr = customer.map((item) => {
            if (item.id === id) {
                return (item = value);
            }
            return item;
        });
        setCustomer(newArr);
    }
    //
    useEffect(() => {
        let mounted = true;
        getCustomer().then((items) => {
            if (mounted) {
                setCustomer(items);
            }
        });
        return () => (mounted = false);
    }, []);

    return (
        <>
            <div className="wrapper--dasboard" id="wrapper--dasboard">
                <div className="wrapper--customer">
                    <div className="table--customer--header">
                        <span className="table--customer--title">Danh sách khách hàng</span>
                        <div className="table--customer--action">
                            <div className="customer--search--wrapper">
                                <input className="customer--search--input" placeholder="Tìm kiếm... " />
                                <div>
                                    <i className="fa-solid fa-magnifying-glass search--icon"></i>
                                </div>
                            </div>
                            <div className="wrapper--action--left">
                                <AddCustomer onGetdata={getdata}></AddCustomer>
                                <div className="table--customer--filter">
                                    {' '}
                                    <div onClick={showFilter} className="customer--button--filter">
                                        {filter.content}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="table--customer" id="table--customer">
                        {filter.isShow && (
                            <FilterCustomer
                                style={{
                                    opacity: !filter.isShow ? '0' : '1',
                                    transition: 'all .2s',
                                    visibility: !filter.isShow ? 'hidden' : 'visible',
                                }}
                            />
                        )}

                        <div className="customer--header--wrapper">
                            <FlexboxGrid align="middle" className="show-grid grid--title--customer">
                                <FlexboxGrid.Item className="item--customer" colspan={4}>
                                    HỌ VÀ TÊN
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={3}>
                                    SDT
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={4}>
                                    NGÀY SINH{' '}
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={5}>
                                    ĐỊA CHỈ
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer" colspan={5}>
                                    EMAIL
                                </FlexboxGrid.Item>
                                <FlexboxGrid.Item className="item--customer customer--action" colspan={3}>
                                    CHỨC NĂNG
                                </FlexboxGrid.Item>
                            </FlexboxGrid>
                        </div>

                        <div className="customer--wrapper--item" id="customer__id">
                            {[...customer].reverse().map((item, index) => {
                                let focusElement;
                                if (index !== 0 && index % 2 !== 0) {
                                    focusElement = 'table--item--bold';
                                } else {
                                    focusElement = '';
                                }
                                return (
                                    <Customer
                                        editCustomer={editCustomer}
                                        deleteCustomer={deleteCustomer}
                                        key={item.id}
                                        item={item}
                                        forcus={focusElement}
                                    />
                                );
                            })}
                        </div>
                        <div className="wrapper--paging">
                            <span className="paging--text">Số bản ghi</span>
                            <div className="paging--short">
                                <select aria-label="State" className="paging--short--number">
                                    <option value="10">10</option>
                                    <option value="15">15</option>
                                    <option value="20">20</option>
                                </select>
                            </div>
                            <div className="paging--count" id="countpage">
                                1-10 of 20
                            </div>
                            <div className="paging--action">
                                <i className="fa-solid fa-chevron-left paging--action--icon customer--prePage"></i>
                                <i className="fa-solid fa-chevron-right paging--action--icon customer--nextPage"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrapper--footer">
                    <div className="footer">
                        <span className="footer--content">© 2022 VnSolution. All rights reserved.</span>
                        <div className="footer--wrapper--icon">
                            <i className="fa-solid fa-f footet--icon"></i>
                            <i className="fa-brands fa-twitter footet--icon "></i>
                            <i className="fa-brands fa-github footet--icon"></i>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Customers;
