const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  page.on('pageerror', err => console.log('PAGE ERROR:', err));
  page.on('console', msg => {
    if (msg.type() === 'error') console.log('CONSOLE ERROR:', msg.text());
  });
  await page.goto('http://localhost:3000/journal');
  await new Promise(r => setTimeout(r, 10000));
  await browser.close();
})();
