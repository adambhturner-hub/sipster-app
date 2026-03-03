const puppeteer = require('puppeteer');

(async () => {
    console.log("Launching browser...");
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    const errors = [];
    page.on('console', msg => {
        if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', error => {
        errors.push(error.message);
    });

    console.log("Navigating to menu...");
    try {
        await page.goto('http://localhost:3000/menu', { waitUntil: 'domcontentloaded', timeout: 5000 });
    } catch(e) { }
    
    console.log("Waiting a sec for hydration...");
    await new Promise(r => setTimeout(r, 2000));
    
    console.log("Checking errors:");
    if (errors.length > 0) {
        console.log("ERRORS FOUND:");
        console.log(errors.slice(0, 5).join('\n'));
        console.log(`...and ${Math.max(0, errors.length - 5)} more.`);
    } else {
        console.log("No errors found on load!");
    }
    
    await browser.close();
})();
