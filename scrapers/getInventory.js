require("dotenv").config();
const puppeteer = require("puppeteer");
const url = "https://orders.deanfoods.com/";

const getInventory = async (login, password) => {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "-disable-setuid-sandbox"],
    defaultViewport: {
      width: 380,
      height: 800,
    },
    headless: false,
    slowMo: 10,
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
    // select inventory
    await page.click(
      "#listView > div > div.col-3.col-md-2.col-lg-1 > span > a"
    );
    // click add new
    await page.waitForSelector("#addNew", { timeouter: 5000, visible: true });
    await page.click("#addNew");
    // switch to full inventory
    await page.waitForSelector(".k-widget.k-dropdown", {
      timeout: 5000,
      visible: true,
    });
    await page.click(".k-widget.k-dropdown");
    await page.keyboard.press("ArrowUp");
    await page.keyboard.press("Enter");
    await page.click("button[type='submit'");
    // collect inventory data
    await page.waitForSelector("#grouped-gridview");
    const milks = await page.evaluate(() => {
      const milkList = [];
      const tableRows = document.querySelectorAll("tbody > tr");
      for (let i = 0; i < tableRows.length; i++) {
        const name = tableRows[i].querySelector("td:nth-child(9)").innerText;
        const multiplier =
          tableRows[i].querySelector("td:nth-child(11)").innerText;
        const id = tableRows[i].querySelector("td:nth-child(10)").innerText;
        milkList.push({ id, name, multiplier });
      }
      return milkList;
    });

    // close browser
    await browser.close();
    return milks;
  } catch (error) {
    console.log(error);
    await browser.close();
    return { error: "failed to get milks" };
  }
};

getInventory("gedm6386", "gemm21");
