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
