import { numberWithCommas } from '../../../Function/Function';
const OrderInfo = (props) => {
    const { item } = props;
   
    return (    
        <div className="info--customer--table">
            <div className="info--des--wrapper">
            <div>
                    <span className="frontF">Đơn hàng: </span>
                    <span>{item.id}</span>
                </div>
                <div>
                    <span className="frontF">Số điện thoại: </span>
                    <span>{item.mobile}</span>
                </div>
                <div>
                    <span className="frontF">Tên khách hàng : </span>
                    <span>{item.full_name}</span>
                </div>
            </div>

            <div className="info--des--wrapper">
            
                <div>
                    <span className="frontF">Mã sản phẩm:  </span>
                    <span>{item.product}</span>
                </div>
                <div>
                    <span className="frontF">Giá bán: </span>
                    <span>{numberWithCommas(item.price)} VND</span>
                </div>
                <div>
                    <span className="frontF">Số lượng:  </span>
                    <span>{item.number}</span>
                </div>
            </div>

            <div className="info--des--wrapper">
                <div>
                    <span className="frontF">Tổng đơn:</span>
                    <span> {numberWithCommas(item.total)}  VND</span>
                </div>
                <div>
                    <span className="frontF">Tổng nợ: </span>
                    <span>{numberWithCommas(item.debit)} VND</span>
                </div>
                <div>
                    <span className="frontF">Đã trả: </span>
                    <span>{numberWithCommas(item.money)} VND</span>
                </div>
            </div>
            <div className="info--des--wrapper">
                <div>
                    <span className="frontF">Thành phố: </span>
                    <span>{item.city}</span>
                </div>
                <div>
                    <span className="frontF">Quận/Huyện:  </span>
                    <span>{item.districst}</span>
                </div>
                <div>
                    <span className="frontF">Địa chỉ:  </span>
                    <span>{item.address}</span>
                </div>
            </div>
        </div>
    );
};
export default OrderInfo;
