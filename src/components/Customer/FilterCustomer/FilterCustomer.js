// import { getCity,getProvince } from "../../../ApiService/provincesApi";
// import { useEffect,useState } from "react";


function FilerCustomer() {
    // const [prodvice, setProvince] = useState([])
    // const [distrist, setDistrist] = useState ([])
    
    return ( 
        <div class="filter--wrapper" id="filter__id">
                <div class="wrapper--gribsytem--filter">
                    <div class="filter--content">
                        <div class="filter--name">

                            <input class="filter--input--name filter__value" id="filter__name" placeholder="Tên khách hàng">

                            </input>
                        </div>
                        <div class="filter--number"> <input id="filter__number" placeholder="09xxxxxxxx"
                                class="filter--input--number filter__value" /><span class="filter--number--after">SDT</span></div>
                        <div class="filter--group">
                            <select id="filter__group" class="filter--input--group filter__value">
                                <option value="">Quận</option>
                                <option>Hoàn kiếm </option>
                                <option>Hai Bà Trưng</option>
                                <option>Cầu giấy</option>
                                <option>Nam Từ Liêm</option>
                            </select>

                        </div>
                        <div class="filter--status">
                            <input type='date' className="addproduct--input--date"/>
                        
                        </div>
                    </div>
                </div>
            </div>
     );
}

export default FilerCustomer;