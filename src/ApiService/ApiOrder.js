
const customerApi = 'http://localhost:3000/ORDER_ITEM'

// GET all item

export function getOrders() {
    return fetch(customerApi)
      .then(data => data.json())
  }

// POST one item
 export function addOrderApi(data,callback,callbackfasle) { 
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
        .then(callbackfasle)
}
//delete item

export  function handleDeleteOrder(id) {
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
export function  editOrderApi(data, id) {
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