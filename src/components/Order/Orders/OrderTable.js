import { FlexboxGrid } from 'rsuite';
import DeleteOrder from '../DeleteOrder/DeleleteOrder';
import { useState } from 'react';
import OrderInfo from './OrderInfo/OrderInfo';
import { numberWithCommas } from '../../Function/Function';
function Order(props) {
    const {  forcus: handleFocus, item: i ,deleteOrder} = props;
    const [showInfo, setShowInfo] = useState(false)
    
    return (
      <>
            <div className={`grid--item--customer ${handleFocus}`}>
                <FlexboxGrid align="middle" className="show-grid frontBold item--customer--grid">
                    <FlexboxGrid.Item colspan={3}>{i.idOrder}</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{i.full_name}</FlexboxGrid.Item>
                    <FlexboxGrid.Item className="frontS" colspan={3}>
                        {i.mobile}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={5}>
                       {i.address ? i.address : i.city}
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={4}>{numberWithCommas(i.total)} VNĐ</FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={2} className = { !i.debit ? 'green--status' : 'red--status' }>{i.status}</FlexboxGrid.Item>
                    <FlexboxGrid.Item classPrefix="action--customer" colspan={3}>
                    <i className="fa-solid fa-pen-to-square editcustomer--buton"></i>
                  <DeleteOrder deleteOrder ={deleteOrder} item = {i}/>
                  { showInfo ? <i class="fa-solid fa-chevron-up" onClick={()=> setShowInfo(false)}> </i> : <i class="fa-solid fa-chevron-down" onClick={()=> setShowInfo(true)}></i>}
                    </FlexboxGrid.Item>
                </FlexboxGrid>
               
            </div>
            {showInfo && <OrderInfo item = {i}></OrderInfo>}
      </>
    );
}

export default Order;