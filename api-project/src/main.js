import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

//get yo data//
async function getData(URL) {
  try {
    const response = await fetch(URL);
    if (response.status !== 200) throw new Error(response);
    const data = await response.json();
    console.log(data);
    document.getElementById("api-response").textContent = data[0]?.name || "No data found";
    return data;
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}
const URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
getData(URL).then(data => console.log(data));


