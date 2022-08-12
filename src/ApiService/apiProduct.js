export function getProducts() {
    return fetch('http://localhost:3000/PRODUC_ITEM')
      .then(data => data.json())
  }