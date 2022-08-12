function NewProduct() {
    const ARRAY_ITEM_PRODUCT = [
        {
            id: 'SP202201',
            name: 'Bàn chơi game',
            email: 'admin@example.com',
            sales: 70,
            createDate: 'June 01, 2022',
        },
        {
            id: 'SP202203',
            name: 'Ghế công thái học',
            email: 'admin2@example.com',
            sales: 60,
            createDate: 'June 01, 2022',
        },
        {
            id: 'SP202204',
            name: 'Bàn phím cơ',
            email: 'admin3@example.com',
            sales: 40,
            createDate: 'June 01, 2022',
        },
        {
            id: 'SP202205',
            name: 'Tay cầm chơi game',
            email: 'admin4@example.com',
            sales: 34,
            createDate: 'June 01, 2022',
        },
        {
            id: 'SP202206',
            name: 'Chuột gaming',
            email: 'admin5@example.com',
            sales: 33,
            createDate: 'June 01, 2022',
        },
        {
            id: 'SP202207',
            name: 'Tai nghe không dây',
            email: 'admin6@example.com',
            sales: 20,
            createDate: 'June 01, 2022',
        },
    ];
    return (
        <div className="table2--wrapper--item">
            {ARRAY_ITEM_PRODUCT.map((item) => {
                return (
                    <div className="table2--item">
                        {' '}
                        <div className="table2--item--info">
                            <span className="table2--item--name">{item.name}</span>
                            <span className="table2--item--id">Mã SP: {item.id}</span>
                        </div>{' '}
                        <div className="table2--item--sale">
                            <span className="table2--item--number">{item.sales}</span>
                            <span className="table2--item--des">Sales</span>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default NewProduct;
