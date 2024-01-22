const { readFileSync } = require("fs");
const http = require("http");
console.log("Reading Data... 🔃");
const data = JSON.parse(
  readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);
console.log("Finished reading Data ☑️");
console.log("Reading Templates... 🔃");
let overview = readFileSync(`${__dirname}/templates/overview.html`, "utf-8");

let cardTemplate = readFileSync(
  `${__dirname}/templates/template-product-card.html`,
  "utf-8"
);
let product = readFileSync(`${__dirname}/templates/product.html`, "utf-8");

console.log("Finished reading Template ☑️");
console.log("Modifying Templates... 🚧");
console.log("Generating Product Cards... ⚒️");
const cardHTML = data.map((product) => {
  let modifyableTemplate = cardTemplate;
  modifyableTemplate = modifyableTemplate.replace(
    /{%PRODUCT_IMAGE%}/g,
    product.image
  );
  modifyableTemplate = modifyableTemplate.replace(
    /{%PRODUCT_NAME%}/g,
    product.productName
  );
  modifyableTemplate = modifyableTemplate.replace(
    /{%IS_ORGANIC%}/g,
    product.organic ? "" : "not-organic"
  );
  modifyableTemplate = modifyableTemplate.replace(
    /{%QUANTITY%}/g,
    product.quantity
  );
  modifyableTemplate = modifyableTemplate.replace(/{%PRICE%}/g, product.price);
  modifyableTemplate = modifyableTemplate.replace(
    /{%PRODUCT_ID%}/g,
    product.id
  );

  return modifyableTemplate;
});

let cards = "";
cardHTML.forEach((element) => {
  cards += element;
});
console.log("Filling cards into Overview... ➕➕");

overview = overview.replace("{%PRODUCT_CARDS%}", cards);
const server = http.createServer((req, res) => {
  const url = req.url;
  if (url === "/api/products") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(JSON.stringify(data));
  }
  if (url === "/overview") {
    res.writeHead(200, {
      "Content-type": "text/html",
    });
    res.end(overview);
  }
});
server.listen(8000, () => {
  console.log("server started at port 8000");
});
