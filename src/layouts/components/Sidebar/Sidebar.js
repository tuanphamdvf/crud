
function Sidebar() {
    return ( <div className="wrapper--sidebar">
    <div className="sidebar ">
        <a href="/" className="sidebar--title " id="title__dashbroad">
            <i className="fas fa-solid fa-square-poll-vertical  sidebar--item--icon "></i>
            <span className="sidebar--title--content">Bảng điều khiển</span>
        </a>
        <div className="sidebar--content"> 
            <div className="sidebar--item">
                <a href="/product" className="sidebar--item--wrapper  " id="title__product">
                    <i className="fa-solid fa-database sidebar--item--icon  "></i>

                    <span className="sidebar--item--text  ">Danh sách sản
                        phẩm</span>
                </a>
                <a href="/customer" className="sidebar--item--wrapper" id="title__user">
                    <i className="fa-solid fa-user-group sidebar--item--icon "></i>

                    <span className="sidebar--item--text">Khách hàng</span>
                </a>
                <a href="/order" className="sidebar--item--wrapper" id="title__oder">
                    <i className="fa-solid fa-file-lines sidebar--item--icon "></i>
                    <span className="sidebar--item--text">Đơn hàng</span>
                </a>
            </div>
        </div>
        <div className="sidebar--footer">
            <button className="sidebar--footer--button">Thu gọn</button>
        </div>
    </div>
</div> );
}

export default Sidebar;