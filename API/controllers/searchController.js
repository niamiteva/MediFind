const puppeteer = require('puppeteer');

const getDataForItem = (browser, link) => new Promise(async(resolve, reject) => {
  const newPage = await browser.newPage();
  await newPage.goto(link);

  const itemName = await newPage.evaluate('header.product__header > span > h1', text => text.textContent);
  const imgSrc = await newPage.evaluate('div.product__box-img img', img => img.src);
  const price = await newPage.evaluate('.price', text => text.textContent);
  const description = await newPage.evaluate('.slide-box', div => {
    const paragraphs = div.nextSibling.map(p => p.querySelector('span > span').textContent);
    let text = '';
    paragraphs.forEach(p => {
      text = text + p;
    });

    return text;
  });

  data = {
    itemName: itemName,
    imgSrc: imgSrc,
    price: price,
    description: description
  };

  resolve(data);
  await newPage.close();
});

const scrape = (text) => new Promise(async(resolve, reject) => {
  if(!text) reject("No request body data.");

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const url = 'https://sopharmacy.bg/bg/sophSearch?text=' + text + '&pageselect=96&from=&to=&q=' + text + ':relevance';
  await page.goto(url);

  const itemsUrls = await page.evaluate('section ul > li', links => {
    links = links.map(link => link.querySelector('h2 > a').href);
    return links;
  })
  .catch(err => {reject(err)});

  console.log(itemsUrls);
  if(!itemsUrls) reject("Failed to scrape data");

  let allItems = [];
  for(link in itemsUrls){
    const itemData = await getDataForItem(browser ,itemsUrls[link]);
    allItems.push(itemData);
    console.log(itemData);
  }

  await page.close();
  resolve(allItems);
});

module.exports = {
  search(req, res) {
    const text = req.body.searchText;
    console.log(text);
    return scrape(text)
      .then((result) => {
        if(!result){
          return res.status(400).send({
            error: 'No data loaded'
          });
        }

        res.status(200).send(result);
      })
      .catch((err) => {
        return res.status(400).send(err);
      });
  }
}