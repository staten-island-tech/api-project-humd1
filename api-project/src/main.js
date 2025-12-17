import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

async function getData(URL) {
  try {
    //go get data
    const response = await fetch(URL);
    //handle errors
    if (response.status != 200) {
      throw new Error(response);
    } else {
      //makes the response into json data we can use
      const data = await response.json(); //makes the data into JSON object we can use
      console.log(data);
      document.getElementById("api-response").textContent = data.name;
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
  }
}

const URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
getData(URL);

console.log(data);
