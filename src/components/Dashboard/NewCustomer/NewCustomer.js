function NewCustomer() {
    const ARRAY_ITEM = [
        {
            id: 202201,
            name: 'Nguyễn Văn A',
            email: 'admin@example.com',
            avata: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        },
        {
            id: 202203,
            name: 'Nguyễn Văn B',
            email: 'admin2@example.com',
            avata: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        },
        {
            id: 202204,
            name: 'Nguyễn Văn C',
            email: 'admin3@example.com',
            avata: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        },
        {
            id: 202205,
            name: 'Nguyễn Văn D',
            email: 'admin4@example.com',
            avata: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        },
        {
            id: 202206,
            name: 'Nguyễn Văn E',
            email: 'admin5@example.com',
            avata: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        },
        {
            id: 202207,
            name: 'Nguyễn Văn F',
            email: 'admin6@example.com',
            avata: 'https://cdn-icons-png.flaticon.com/512/194/194938.png',
        },
    ];
    return (
        <div className="table--container--item" id="newCustomer">
            {ARRAY_ITEM.map((item) => {
                return (
                    <div>
                        <div className="table1--item">
                            {' '}
                            <img alt="" className="table1--item--img" src={item.avata} />
                            <div className="table1--info--name ">
                                {item.name}
                                <div className="table1--info--email">{item.email}</div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default NewCustomer;
