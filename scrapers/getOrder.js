require("dotenv").config();
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const getOrder = async (login, password) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "-disable-setuid-sandbox"],
    defaultViewport: {
      width: 380,
      height: 800,
    },
    headless: false,
    slowMo: 20,
  });

  const page = await browser.newPage();
  try {
    // login
    await page.goto(url);
    await page.type("#ProfileID", login);
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

    // await browser.close();
  } catch (error) {
    console.log(error);
    await browser.close();
  }
};

getOrder("gedm6386", "gemm22");
