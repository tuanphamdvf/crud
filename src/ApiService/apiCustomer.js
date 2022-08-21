const customerApi = 'http://localhost:3000/CUSTOMER_ITEM';

// GET all item

export function getCustomer() {
    return fetch(customerApi).then((data) => data.json());
}

// POST one item
export function AddCustomerApi(data, callback, error) {
    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(customerApi, options)
        .then((response) => response.json())
        .then(callback)
        .catch(error);
}
//delete item

export function handleDeleteCustomer(id, callback) {
    let options = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    };
    fetch(customerApi + '/' + id, options)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
//Edit
export function EditCustomerApi(data, id, callback) {
    var option = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    };
    fetch(customerApi + '/' + id, option)
        .then(function (response) {
            return response;
        })
        .then(callback);
}
