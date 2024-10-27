const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

const cheerio = require("cheerio");

const [length, width, depth] = process.argv.slice(2).map(Number);
if (!length || !width || !depth) {
  console.error(
    "Usage: node index.js <length front to back> <width> <depth top to bottom>"
  );
  process.exit(1);
}

async function main() {
  const rsp = await fetch(
    "https://reallyusefulproducts.co.uk/uk/html/boxdetails.php"
  );

  const html = await rsp.text();

  const $ = cheerio.load(html);

  const boxes = [];

  $("table.bluetable tr").each((index, element) => {
    if (index === 0) return;
    if (index === 1) return;

    const tds = $(element).find("td");
    const name = $(tds[0]).text();
    const dimensions = $(tds[1]).text();

    const [length, width, depth] = dimensions
      .split("x")
      .map((s) => s.trim())
      .map(Number);

    boxes.push({ name, length, width, depth });
  });

  const suitableBoxes = boxes.filter(
    (box) => box.length <= length && box.width <= width && box.depth <= depth
  );

  if (suitableBoxes.length === 0) {
    return "No suitable boxes found";
  }

  const sortedSuitableBoxes = suitableBoxes.sort((a, b) => {
    const aVolume = a.length * a.width * a.depth;
    const bVolume = b.length * b.width * b.depth;

    return bVolume - aVolume;
  });

  const topBox = sortedSuitableBoxes[0];

  return `${topBox.name}: ${topBox.length}x${topBox.width}x${topBox.depth}`;
}

main().then(console.log.bind(console)).catch(console.error.bind(console));
