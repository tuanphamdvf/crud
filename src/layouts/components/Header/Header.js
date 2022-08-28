function Header() {
    return (
        <header className="header">
            <div className="header--title">CRUD</div>
            <i className="fa-solid fa-sliders  header--title--side"></i>
            <div className="header--action">
                <div className="header--icon">
                    <div className="header--icon--content">
                    <i className="fa-solid fa-bell bell--header"></i>
                    </div>
                </div>

                <div className="header--img">
                    <img
                        className="header--img--content"
                        alt="img"
                        src="https://cdn-icons-png.flaticon.com/512/147/147142.png"
                    />
                </div>
            </div>
        
        </header>
    );
}

export default Header;
