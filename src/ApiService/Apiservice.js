var date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
if (month < 10) month = '0' + month;
if (day < 10) day = '0' + day;
let today = year + '-' + month + '-' + day;

export {today}