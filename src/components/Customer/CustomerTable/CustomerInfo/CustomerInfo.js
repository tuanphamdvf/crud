import PropTypes from 'prop-types';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { fill } from '@cloudinary/url-gen/actions/resize';
import { useState } from 'react';

const CustomerInfo = (props) => {
    const { item } = props;
    const [show, setShow] = useState(false)
    const cld = new Cloudinary({
        cloud: {
            cloudName: 'djh7lsffd',
        },
    });
    if (!item.avata) {
        item.avata = 'tuanpham/gyhrtfhhlcx8suhsxe1t';
    }
    const myImage = cld.image(`tuanpham/${item.avata}`);
    const myImageZoom = cld.image(`tuanpham/${item.avata}`)
    myImage.resize(fill().width(80).height(80));
    myImageZoom.resize(fill().width(500).height(500))
    return (    
        <div className="info--customer--table">
            <div onClick={()=> setShow(!show)}>
              {!show? (<AdvancedImage   className="info--avata--wrapper zoomD" cldImg={myImage} />): (<AdvancedImage className="zoomD" cldImg={myImageZoom} />) }

            </div>
            <div className="info--des--wrapper">
                <div>
                    <span className="frontF">Email: </span>
                    <span>{item.email}</span>
                </div>
                <div>
                    <span className="frontF">Số điện thoại: </span>
                    <span>{item.mobile}</span>
                </div>
                <div>
                    <span className="frontF">Giới tính : </span>
                    <span>{item.gen ? item.gen : 'Nữ'}</span>
                </div>
            </div>

            <div className="info--des--wrapper">
                <div>
                    <span className="frontF">Đơn hàng: </span>
                    <span>{item.id}</span>
                </div>
                <div>
                    <span className="frontF">Sản phẩm đã mua: </span>
                    <span>{item.idproduct}</span>
                </div>
                <div>
                    <span className="frontF">Dịch vụ: </span>
                    <span>{item.idproduct}</span>
                </div>
            </div>

            <div className="info--des--wrapper">
                <div>
                    <span className="frontF">Tổng chi tiêu: </span>
                    <span>{item.id} VNĐ</span>
                </div>
                <div>
                    <span className="frontF">Tổng nợ: </span>
                    <span>{item.id} VNĐ</span>
                </div>
                <div>
                    <span className="frontF">Điểm tích luỹ: </span>
                    <span>{item.id}</span>
                </div>
            </div>
            <div className="info--des--wrapper">
                <div>
                    <span className="frontF">Nhóm khách hàng: </span>
                    <span>{item.id}</span>
                </div>
                <div>
                    <span className="frontF">Hạng khách hàng: </span>
                    <span>{item.id}</span>
                </div>
                <div>
                    <span className="frontF">Hồ sơ liên quan: </span>
                    <span>{item.id}</span>
                </div>
            </div>
        </div>
    );
};
CustomerInfo.protoType = {
    item: PropTypes.object.isRequired,
};
export default CustomerInfo;
