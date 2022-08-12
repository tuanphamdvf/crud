import { Chartjs } from '../../components/Dashboard/Chartjs/Chartjs';
import NewCustomer from '../../components/Dashboard/NewCustomer/NewCustomer';
import NewOrder from '../../components/Dashboard/NewOrder/NewOrder';
import NewProduct from '../../components/Dashboard/NewProduct/NewProduct';
function Dashbroad() {
    return (
        <div className="wrapper--dasboard" id="wrapper--dasboard">
            <div className="chart">
                <div className="chart--title">
                    <span className="chart--title--content">Doanh Thu</span>
                    <i className="fa-solid fa-circle-exclamation chart--title--icon"></i>
                </div>
                <Chartjs id="myChart" />
            </div>
            <div className="wrapper--table1--table2">
                <div className="table1">
                    <div className="table1--title">Khách hàng mới</div>
                    <NewCustomer />
                </div>
                <div className="table2">
                    <div className="table2--title">Sản phẩm bán chạy </div>
                    <NewProduct />
                </div>
            </div>
            <div className="table3">
                <div className="table3--title">
                    <span className="table3--title--content">Đơn hàng gần đây</span>
                    <span className="table3--title--des">Danh sách 6 đơn hàng gần nhất</span>
                </div>
                <div className="table3--des">
                    <span className="table3--des--title cusomer">KHÁCH HÀNG</span>
                    <span className="table3--des--title time">THỜI GIAN</span>
                    <span className="table3--des--title total">THÀNH TIỀN</span>
                    <span className="table3--des--title status">TRẠNG THÁI</span>
                </div>
                <NewOrder />
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
    );
}

export default Dashbroad;
