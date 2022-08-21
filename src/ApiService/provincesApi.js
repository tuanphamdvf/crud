// get all prodvice
export function getCity(){
    return fetch(`https://provinces.open-api.vn/api/p/`)
    .then(data => data.json())
}

//get distrist is provicne 
export function getDistrist(id){
    return fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
    .then(data => data.json())
}
//one city
export function apiOneCity(id){
    return fetch(`https://provinces.open-api.vn/api/p/${id}`)
    .then(data => data.json())
}

//one dist
export function apiOneDist(id){
    return fetch(`https://provinces.open-api.vn/api/d/${id}`)
    .then(data => data.json())
}
 
export function getAllAdress(){
    return fetch(`https://provinces.open-api.vn/api/?depth=2`)
    .then(data => data.json())
}