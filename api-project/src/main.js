import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

//get yo data//
/* async function getData(URL) {
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

 */

const URL = "https://makeup-api.herokuapp.com/api/v1/products.json";
const container = document.getElementById("product-container");
let products = [];

async function getData(URL, limit) {
  try {
    const response = await fetch(URL);
    if (!response.ok) throw new Error("error");
    const data = await response.json();
    container.innerHTML = "";
    const limitedProducts = data.slice(0, limit);
    limitedProducts.forEach(product => {
      container.insertAdjacentHTML(
        "beforeend",
        `
      <div class="card bg-white p-4 rounded shadow border-2 border-rose-300 justify-center hover:bg-rose-200 text-center">   
        <img src="${product.api_featured_image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
        <h2 class="text-lg font-bold mb-2">${product.name}</h2>
        <p class="text-gray-700 mb-2">${product.brand}</p>
        <p class="text-pink-600 font-semibold">$${product.price}0</p>
        <button class="cartbutton" data-id="${product.id}">Add to Cart</button>
        <button class="view" data-id="${product.id}">View More</button>
        `
      );
    });

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
    container.innerHTML = "<p class='text-red-500'>Failed to load products.</p>";
  }
}
getData(URL, 40).then(data => {
  products = data;
  console.log("products:", products);
});

function add(product) {
  container.insertAdjacentHTML(
    "beforeend",
    `
    <div class="card bg-white p-4 rounded shadow border-2 border-rose-300 justify-center hover:bg-rose-200 text-center">   
      <img src="${product.api_featured_image}" alt="${product.name}" class="w-full h-48 object-cover mb-4 rounded">
      <h2 class="text-lg font-bold mb-2">${product.name}</h2>
      <p class="text-gray-700 mb-2">${product.brand}</p>
      <p class="text-pink-600 font-semibold">$${product.price}0</p>
      <button class="cartbutton" data-id="${product.id}">Add to Cart</button>
      <button class="view" data-id="${product.id}">View More</button>
    </div>
    `
  );
}

const sidebar = document.getElementById("filtermenu");

const buttonfilter = document.querySelectorAll(".filterbtn");
buttonfilter.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.id;
        container.innerHTML = "";
        const filteredProducts = products.filter(product => product.product_type === category || category === "ALL");
        filteredProducts.forEach(product => add(product));
        if(category !== "ALL"){
          sidebar.classList.remove ("hidden");
          
        } 
        if (category === "ALL") {
          sidebar.classList.add("hidden");
        }
    });
});
