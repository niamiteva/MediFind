const puppeteer = require("puppeteer");
//const redis = require("redis");
//const client = redis.createClient();
const mcache = require("memory-cache");
const memCache = new mcache.Cache();
const { all } = require("../routers");

const getDataForItem = (browser, link) =>
  new Promise(async (resolve, reject) => {
    const newPage = await browser.newPage();
    await newPage.goto(link);

    const itemName = await newPage.evaluate(() => {
      return document.querySelector("header.product__header h1").textContent;
    });

    const imgSrc = await newPage.evaluate(() => {
      const img = document.querySelector("div.product__box-img img");
      return "https://sopharmacy.bg" + img.srcset;
    });

    const price = await newPage.evaluate(() => {
      return document.querySelector(".price").textContent;
    });

    // const description = await newPage.evaluate(() => {
    //   const items = Array.from(document.querySelectorAll('div.text p span span'));
    //   // const paragraphs = items.nextSibling.map(p => p.querySelector('span > span').textContent);
    //   // let text = '';
    //   // paragraphs.forEach(p => {
    //   //   text = text + p;
    //   // });

    //   return items;
    // });

    const data = {
      itemUrl: link,
      itemName: itemName,
      imgSrc: imgSrc,
      price: price,
      //description: description
    };

    resolve(data);
    await newPage.close();
  });

const scrape = (text) =>
  new Promise(async (resolve, reject) => {
    if (!text) reject("No request body data.");

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const url =
      "https://sopharmacy.bg/bg/sophSearch?text=" +
      text +
      "&pageselect=96&from=&to=&q=" +
      text +
      ":relevance";
    await page.goto(url);
    await page.waitForSelector(".wrap-content__main");

    const itemsUrls = await page.evaluate(() => {
      const items = Array.from(
        document.querySelectorAll("section ul li h2 > a")
      );
      const links = items.map((link) => link.href);
      return links;
    });

    if (!itemsUrls) reject("Failed to scrape data");

    let allItems = [];
    for (link in itemsUrls) {
      const itemData = await getDataForItem(browser, itemsUrls[link]);
      allItems.push(itemData);
    }

    await page.close();
    resolve(allItems);
  });

// scrape("магнезий")
//   .then((res) => console.log(res))
//   .catch(err => console.log(err));

module.exports = {
  search(req, res, next) {
    const key = "__cache__" + req.originalUrl || req.url;

    let cacheContent = memCache.get(key);
    if (cacheContent) {
      res.status(200).send(JSON.stringify(cacheContent));     
      res.end(); 
    }else {
        const text = req.body.q;
        console.log(req.body);
        console.log(text);
        return scrape(text)
          .then((result) => {
            if (!result) {
              return res.status(400).send({
                error: "No data loaded",
              });
            }
            console.log("to send:");
            console.log(result);
            memCache.put(key, result, 200000);
            res.status(200).send(JSON.stringify(result));
            res.end();
          })
          .catch((err) => {
            return res.status(400).send(err);
          });
      }
  },
};
