
const customerApi = 'http://localhost:3000/CUSTOMER_ITEM'

// GET all item

export function getCustomer() {
    return fetch(customerApi)
      .then(data => data.json())
  }

// POST one item
 export function AddCustomerApi(data,callback) { 
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
   
    };
    fetch(customerApi, options)
        .then(response => response.json())
        .then(callback)
}
//delete item

export  function handleDeleteCustomer(id) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(customerApi+ '/' + id, options).then(function (response) {
        return response.json();
    });
}
//Edit
export function EditCustomerApi(data, id) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(customerApi + '/' + id, option).then(function (response) {
        return response;
    });
}