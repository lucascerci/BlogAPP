const puppeteer = require('puppeteer');

async function wikipediaScrapping() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://en.wikipedia.org/wiki/Main_Page');

    //grabbing curiositys from wikipedia
    
    try {
        const p = await page.$eval(
            '#mp-dyk > ul > li:nth-child(1)',
            (el => el.textContent)
        );

        const p2 = await page.$eval(
            '#mp-dyk > ul > li:nth-child(2)',
            (el => el.textContent)
        );

        const p3 = await page.$eval(
            '#mp-dyk > ul > li:nth-child(3)',
            (el => el.textContent)
        );

        const p4 = await page.$eval(
            '#mp-dyk > ul > li:nth-child(4)',
            (el => el.textContent)
        );

        const p5 = await page.$eval(
            '#mp-dyk > ul > li:nth-child(5)',
            (el => el.textContent)
        );

        const p6 = await page.$eval(
            '#mp-dyk > ul > li:nth-child(6)',
            (el => el.textContent)
        );

        const p7 = await page.$eval(
            '#mp-dyk > ul > li:nth-child(7)',
            (el => el.textContent)
        );

        const p8 = await page.$eval(
            '#mp-dyk > ul > li:nth-child(8)',
            (el => el.textContent)
        );

        const curiosities = [
            {curiosity: p}, 
            {curiosity: p2}, 
            {curiosity: p3}, 
            {curiosity: p4}, 
            {curiosity: p5}, 
            {curiosity: p6},
            {curiosity: p7},
            {curiosity: p8}
        ]
        
        await browser.close()

        return curiosities;
    } catch (error) {
        return false;
    }
}

module.exports = wikipediaScrapping;
