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

const buttonfilter = document.querySelectorAll(".filterbtn");
buttonfilter.forEach(button => {
    button.addEventListener("click", () => {
        const category = button.id;
        container.innerHTML = "";
        const filteredProducts = products.filter(product => product.product_type === category || category === "ALL");
        filteredProducts.forEach(product => add(product));
        if (category !== "ALL") {
          const area=document.querySelector(".productarea");
          area.insertAdjacentHTML("beforebegin", 
            `
            <div id="filtermenu" class="filtermenu w-1/8 p-6 m-5 h-screen">
    <div class="dropdown dropdown-end">
    <label tabindex="0" class="btn text-zinc-600 bg-rose-200 border-rose-200 m-1">Select Brand</label>
    <ul tabindex="0" class="dropdown-content menu">
   <li><a id="ALL BRANDS">ALL BRANDS</a></li>
    <li><a id="almay">almay</a></li>
    <li><a id="alva">alva</a></li>
    <li><a id="anna sui">anna sui</a></li>
    <li><a id="annabelle">annabelle</a></li>
    <li><a id="benefit">benefit</a></li>
    <li><a id="boosh">boosh</a></li>
    <li><a id="burt's bees">burt's bees</a></li>
    <li><a id="butter london">butter london</a></li>
    <li><a id="c'est moi">c'est moi</a></li>
    <li><a id="cargo cosmetics">cargo cosmetics</a></li>
    <li><a id="china glaze">china glaze</a></li>
    <li><a id="clinique">clinique</a></li>
    <li><a id="coastal classic creation">coastal classic creation</a></li>
    <li><a id="colourpop">colourpop</a></li>
    <li><a id="covergirl">covergirl</a></li>
    <li><a id="dalish">dalish</a></li>
    <li><a id="deciem">deciem</a></li>
    <li><a id="dior">dior</a></li>
    <li><a id="dr. hauschka">dr. hauschka</a></li>
    <li><a id="e.l.f.">e.l.f.</a></li>
    <li><a id="essie">essie</a></li>
    <li><a id="fenty">fenty</a></li>
    <li><a id="glossier">glossier</a></li>
    <li><a id="green people">green people</a></li>
    <li><a id="iman">iman</a></li>
    <li><a id="l'oreal">l'oreal</a></li>
    <li><a id="lotus cosmetics usa">lotus cosmetics usa</a></li>
    <li><a id="maia's mineral galaxy">maia's mineral galaxy</a></li>
    <li><a id="marcelle">marcelle</a></li>
    <li><a id="marienatie">marienatie</a></li>
    <li><a id="maybelline">maybelline</a></li>
    <li><a id="milani">milani</a></li>
    <li><a id="mineral fusion">mineral fusion</a></li>
    <li><a id="misa">misa</a></li>
    <li><a id="mistura">mistura</a></li>
    <li><a id="moov">moov</a></li>
    <li><a id="nudus">nudus</a></li>
    <li><a id="nyx">nyx</a></li>
    <li><a id="orly">orly</a></li>
    <li><a id="pacifica">pacifica</a></li>
    <li><a id="penny lane organics">penny lane organics</a></li>
    <li><a id="physicians formula">physicians formula</a></li>
    <li><a id="piggy paint">piggy paint</a></li>
    <li><a id="pure anada">pure anada</a></li>
    <li><a id="rejuva minerals">rejuva minerals</a></li>
    <li><a id="revlon">revlon</a></li>
    <li><a id="sally b's skin yummies">sally b's skin yummies</a></li>
    <li><a id="salon perfect">salon perfect</a></li>
    <li><a id="sante">sante</a></li>
    <li><a id="sinful colours">sinful colours</a></li>
    <li><a id="smashbox">smashbox</a></li>
    <li><a id="stila">stila</a></li>
    <li><a id="suncoat">suncoat</a></li>
    <li><a id="w3llpeople">w3llpeople</a></li>
    <li><a id="wet n wild">wet n wild</a></li>
    <li><a id="zorah">zorah</a></li>
    <li><a id="zorah biocosmetiques">zorah biocosmetiques</a></li>
      </ul>
    </div>`
          );
          area.scrollIntoView({ behavior: "smooth" });
        }
    });
});
