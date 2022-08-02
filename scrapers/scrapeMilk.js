require("dotenv").config();
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const scrapeMilk = async (username, password) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "-disable-setuid-sandbox"],
    defaultViewport: {
      width: 380,
      height: 800,
    },
    // headless: false,
    // slowMo: 10,
  });

  const page = await browser.newPage();
  try {
    // login
    await page.goto(url);
    await page.type("#ProfileID", username);
    await page.type("#AppPwd", password);
    await page.keyboard.press("Enter");
    // check if login successfull
    try {
      await page.waitForSelector(".store-button", { timeout: 5000 });
    } catch (error) {
      await browser.close();
      return { error: "invalid login or password" };
    }
    // get store info
    const storeInfo = await page.evaluate(() => {
      const store = document.querySelector(
        "#listView > div > div.col-5.col-md-3 > span"
      ).innerText;
      return store;
    });
    // select order and next delivery data
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Enter");
    await page.waitForSelector(".delivery");
    await page.click(".delivery");
    // collect milk data
    await page.waitForTimeout(1000);
    const milks = await page.evaluate(() => {
      const milkList = [];
      const tableRows = document.querySelectorAll(
        "#grouped-gridview > div.k-grid-content.k-auto-scrollable > table > tbody > tr"
      );
      for (let i = 0; i < tableRows.length; i++) {
        const id = tableRows[i].querySelector("td:nth-child(8)").innerText;
        const previous =
          tableRows[i].querySelector("td:nth-child(1)").innerText;
        const name = tableRows[i].querySelector("td:nth-child(7)").innerText;
        const multiplier =
          tableRows[i].querySelector("td:nth-child(13)").innerText;
        const fourWeekAvg =
          tableRows[i].querySelector("td:nth-child(14)").innerText;
        const newMilk = {
          id,
          previous,
          name,
          multiplier: Number(multiplier),
          perWeekAvg: Math.floor(Number(fourWeekAvg) / 4),
        };
        milkList.push(newMilk);
      }
      return milkList;
    });

    await browser.close();
    return { storeInfo, milks };
  } catch (error) {
    console.log(error);
    await browser.close();
    return { error: "failed to get milks" };
  }
};

module.exports = scrapeMilk;
