const inquirer = require("inquirer");
const axios = require("axios"); 
const fs = require("fs"); 
const path = require("path"); 
const puppeteer = require('puppeteer'); 

const askQuestion = require("./askQuestion"); 
const generateHTML = require("./generateHTML"); 


async function callApi(username,color){
    const queryURLusername = `https://api.github.com/users/${username}`;
    const queryURLstarred = `https://api.github.com/users/${username}/starred`;

    const res1 = await axios.get(queryURLusername);
    const res2 = await axios.get(queryURLstarred);

    await generateHTML(username,color,res1,res2);

    const createPDF = async (color,generateHTML) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        const options = {
            path: `${username}.pdf`,
        }

    const contentHtml = await fs.readFileSync(path.resolve(__dirname,`${username}.html`)).toString('utf-8');
    await page.setContent(contentHtml);
    await page.pdf(options);
    await page.screenshot({ path: `${username}.png`, fullPage: true });

    await page.close();
    await browser.close();
    }

    createPDF();
};

module.exports = callApi;