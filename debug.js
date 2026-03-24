const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        page.on('pageerror', error => console.error('PAGE ERROR:', error.message));
        page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure()?.errorText));

        console.log("Navigating to /journal...");
        try {
            await page.goto('http://localhost:3000/journal', { waitUntil: 'networkidle0', timeout: 15000 });
            console.log("Navigation complete.");
        } catch (e) {
            console.error("Navigation threw:", e.message);
        }
        
        await new Promise(r => setTimeout(r, 2000));
        await browser.close();
    } catch(e) {
        console.error(e);
    }
})();
