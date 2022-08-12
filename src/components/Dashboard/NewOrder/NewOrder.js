function NewOrder() {
    const ARRAY_ODER = [
        {
            id: 20220701,
            name: 'Nguyễn Văn A',
            time: 'June 01, 2022',
            status: 'Hoàn thành',
            color: 'green--status',
            total: 2300000,
        },
        {
            id: 20220703,
            name: 'Nguyễn Văn B',
            time: 'June 03, 2022',
            status: 'Đang xử lý',
            color: 'gray--status',
            total: 2000000,
        },
        {
            id: 20220704,
            name: 'Nguyễn Văn C',
            time: 'June 03, 2022',
            status: 'Hoàn thành',
            color: 'green--status',
            total: 500000,
        },
        {
            id: 20220705,
            name: 'Nguyễn Văn D',
            time: 'June 04, 2022',
            status: 'Đã hủy',
            color: 'red--status',
            total: 200000,
        },
        {
            id: 20220706,
            name: 'Nguyễn Văn E',
            time: 'June 06, 2022',
            status: 'Đang giao',
            color: 'blue--status',
            total: 1400000,
        },
    ];
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
  
    return (
        <div className="table3--wrapper--item">
            {ARRAY_ODER.map((item, index) => {
                  let focusElement;
                if (index !== 0 && index % 2 !== 0) {
                    focusElement = 'table--item--bold';
                } else {
                    focusElement = '';
                }
                let total = numberWithCommas(item.total);
                return (
                    <div className={`table3--item ${focusElement} `}>
                        <span className="table3--item--name">{item.name}</span>
                        <span className="table3--item--date">{item.time}</span>
                        <span className="table3--item--number">{total} VND</span>
                        <div className="table3--item--status ">
                            {' '}
                            <span class={`table3--item--des ${item.color}`}>{item.status}</span>{' '}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default NewOrder;
