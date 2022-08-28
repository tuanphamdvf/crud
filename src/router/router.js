import Dashbroad from "../pages/Dashbroad/Dashbroad";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";
import Customers from "../pages/Customers/Customers";
import AddProduct from "../pages/Products/AddProduct";
const elementRouter =[
    { path: '/', component: Dashbroad },
    { path: '/product', component: Products },
    { path: '/customer', component: Customers },
    { path: '/addproduct', component: AddProduct },

]

export default elementRouter