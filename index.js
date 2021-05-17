const axios = require("axios");
const fs = require("fs");
const colName = require("./colName");
const q = "dong+ho";
const router = `https://tiki.vn/api/v2/products?limit=48&include=advertisement&aggregations=1&q=dong+ho`;

const writeHeaderWoo = () => {
  let str = "";
  for (const property in colName) {
    str += '"' + property + '"' + "@";
  }
  str = str.slice(0, -1);
  fs.writeFileSync(`woo1.data.txt`, str);
};

const writerProds = (prods) => {
  prods.forEach((e) => {
    let str = "\n";
    for (const property in colName) {
      if (typeof colName[property] === "string") {
        str += '"' + e[colName[property]] + '"' + "@";
      } else {
        str += '"' + colName[property].value + '"' + "@";
      }
    }
    str = str.slice(0, -1);
    fs.appendFileSync(`woo1.data.txt`, str);
  });
};

async function getProduct() {
  // writer col name
  writeHeaderWoo();
  // get data page three page, 48prods/page
  for (let i = 1; i <= 3; i++) {
    const url = router + `&page=${i}`;
    console.log(url);
    const res = await axios.get(url);
    const prods = res.data.data;

    // append prods into file
    writerProds(prods);
  }
}

// run process
getProduct();
