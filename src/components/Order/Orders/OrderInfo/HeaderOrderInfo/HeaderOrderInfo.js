import { Form as FromRsuite, FormGroup } from 'rsuite';
import RSDateRangePicker from '../../../../FinalFormComponent/RSDateRangePicker';
import { numberWithCommas, totalOrderCartReport } from '../../../../Function/Function';
import { Form as FinalForm, Field } from 'react-final-form';
import { removeString } from '../../../../Function/Function';
import { handleDay } from '../../../../../ApiService/Apiservice';
import { useEffect, useState } from 'react';
function HeaderOrderInfo(props) {
    const { orders, renderReport, rootOrder } = props;
    const totalReport = totalOrderCartReport(orders, 'total');
    const totalDebit = totalOrderCartReport(orders, 'debit');
    const totalOrder = orders.length;
    const [tottal, setTotal] = useState();
    const [debit, setDebit] = useState();
    const [arrayDay, setArrayDay] = useState([]);

    let hanle
    useEffect(() => {
        let date = new Date();
        let last = new Date(date.getTime() - 7 * 24 * 60 * 60 * 1000);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        if (month < 10) month = '0' + month;
        if (day < 10) day = '0' + day;
        let lastday = last.getDate();
        let lastMo = last.getMonth() + 1;
        let lastY = last.getFullYear();
        let lastfday = lastY + '-' + lastMo + '-' + lastday;
        let today = year + '-' + month + '-' + day;
        setArrayDay([today,lastfday]);

    }, [hanle]);
    const onSubmit = () => {};

    return (
        <>
            
        </>
    );
}

export default HeaderOrderInfo;
