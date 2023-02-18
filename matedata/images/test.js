const console = require("console");
const fs = require("fs")


async function main(){ const highSVG = fs.readFileSync("./abstractsurfers-j4p4n.svg", { encoding: "utf8" })
console.log(highSVG);}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });