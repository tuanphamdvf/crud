import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';

function DefaultLayout({ children }) {
    return (
        <>
            <Header />
            <div className="container">
                    <Sidebar />
                    <div className="main--page"> {children} </div>
            </div>
        </>
    );
}

export default DefaultLayout;
