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
const container = document.getElementById("productcontainer");
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
    container.innerHTML = "<p class='text-red-500'>Loading Failed</p>";
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
      <button data-id="${product.id}" class="view hover:text-rose-400">View More</button>
    </div>
    `
  );
}

const sidebar = document.getElementById("filtermenu");
const brandchoices = document.querySelectorAll(".brandchoice");
const buttonfilter = document.querySelectorAll(".filterbtn");
const search = document.getElementById("search");
const window = document.querySelector(".window");

search.addEventListener("input", () => {
  const text = search.value.toLowerCase();
  const filtered = products.filter(product =>
    product.name?.toLowerCase().includes(text) ||
    product.brand?.toLowerCase().includes(text) ||
    product.product_type?.toLowerCase().includes(text)
  );
  container.innerHTML = "";
  filtered.forEach(product => add(product));
  sidebar.classList.add("hidden");
});

buttonfilter.forEach(button => {
  button.addEventListener("click", () => {
    const category = button.id;
    container.innerHTML = "";
    document.getElementById("productdetails").classList.add("hidden");
    window.classList.remove("hidden");
    const filteredByType = products.filter(
      product => product.product_type === category || category === "ALL");
    filteredByType.forEach(product => add(product));
    if (category !== "ALL") {
      sidebar.classList.remove("hidden");
    } else {
      sidebar.classList.add("hidden");
    }
    brandchoices.forEach(choice => {
      choice.onclick = () => {
        const brand = choice.id;
        if (brand === "ALLBRANDS") {
          container.innerHTML = "";
          filteredByType.forEach(product => add(product));
          return;
        }
        else {
        let finalProducts;
          finalProducts = filteredByType.filter(p => p.brand?.toLowerCase() === brand.toLowerCase());
        container.innerHTML = "";
        finalProducts.forEach(product => add(product));
        }
      }
    });
  });
});

document.addEventListener("click", async (e) => {
  if (!e.target.matches(".view")) return;
  const id = e.target.dataset.id;
  await viewmore(id);
});

async function viewmore(id) {
  try {
    const response = await fetch(`https://makeup-api.herokuapp.com/api/v1/products/${id}.json`);
    if (response.status != 200) {
      throw new Error(response);
    } else {
      const data = await response.json(); 
    document.getElementById("name").textContent = data.name;
    document.getElementById("image").src = data.api_featured_image;
    document.getElementById("description").textContent = data.description || "No description";
    document.getElementById("price").textContent = `$${data.price}`;
    window.classList.add("hidden");
    document.getElementById("yourcart").classList.add("hidden");
    document.getElementById("productdetails").classList.remove("hidden");
    }
  } catch (error) {
    console.log(error);
    console.log("no bueno");
    container.innerHTML = "<p class='text-red-500'>Loading Failed</p>";
  }
}

let cart = JSON.parse(localStorage.getItem("cart")) || [];
const yourcart = document.getElementById("yourcart");
updatepopup();


function savecart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


document.addEventListener("click", async (e) => {
  if (!e.target.matches(".cartbutton")) return;
  const id = e.target.dataset.id;
  addtocart(id);
});

async function addtocart(id) {
  const response = await fetch(
    `https://makeup-api.herokuapp.com/api/v1/products/${id}.json`
  );
  const product = await response.json();

  const existing = cart.find(item => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price ,
      image: product.api_featured_image,
      quantity: 1
    });
  }
  
  savecart();
  console.log(cart);
  updatepopup();
}

function updatepopup() {
  const quantity = document.getElementById("quantity");
  const subtotalbox = document.getElementById("subtotal");

  let itemCount = 0;
  let subtotal = 0;

  cart.forEach(item => {
    itemCount += item.quantity;
    subtotal += item.price * item.quantity;
  });

  quantity.textContent = `${itemCount} Items`;
  subtotalbox.textContent = `Subtotal: $${subtotal.toFixed(2)}`;
}

document.getElementById("viewcart").addEventListener("click", () => {
  viewcart();
  yourcart.classList.remove("hidden");
});

function viewcart() {
  document.getElementById("productdetails").classList.add("hidden");
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";
  window.classList.add("hidden");
  window.classList.add("hidden");

  cart.forEach(item => {
    cartItems.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flex gap-6 items-start">
        <img src="${item.image}" class="w-32 h-32 object-cover rounded">
        <div>
          <h2 class="text-xl font-bold">${item.name}</h2>
          <p class="text-pink-600">$${item.price}</p>
          <p class="text-sm text-zinc-500">Qty: ${item.quantity}</p>
          <button class="remove" data-id="${item.id}">Remove</button>
        </div>
      </div>
      `
    );
  });
}

document.addEventListener("click", (e) => {
  if (!e.target.matches(".remove")) return;

  const id = Number(e.target.dataset.id);
  removeitem(id);
});

function removeitem(id) {
  const item = cart.find(item => item.id === id);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    cart = cart.filter(item => item.id !== id);
  }

  savecart();
  updatepopup();
  viewcart();
}

