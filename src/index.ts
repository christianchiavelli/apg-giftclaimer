import puppeteer, { Page } from "puppeteer";
import fs from "fs";

import { SECOND, Url, Selector, Credentials } from "./constants";

async function login(page: Page) {
  const hasSessionSaved = fs.existsSync("cookies.json");

  if (hasSessionSaved) {
    const cookiesString = fs.readFileSync("cookies.json", "utf8");
    const parsedCookies = JSON.parse(cookiesString);
    await page.setCookie(...parsedCookies);

    await page.goto(Url.HOME_PAGE);
    await page.waitForNetworkIdle();

    return;
  }

  await page.goto(Url.HOME_PAGE);
  await page.waitForNetworkIdle();

  await page.click(Selector.BUTTON_SIGN_IN);
  await page.waitForNetworkIdle();

  await page.click(Selector.INPUT_EMAIL);
  await page.type(Selector.INPUT_EMAIL, Credentials.USER);

  await page.click(Selector.INPUT_PASSWORD);
  await page.type(Selector.INPUT_PASSWORD, Credentials.PASSWORD);

  await page.click(Selector.BUTTON_SIGN_IN_SUBMIT);
  await page.waitForNetworkIdle();

  const cookies = await page.cookies();

  fs.writeFileSync("./cookies.json", JSON.stringify(cookies, null, 2));

  return;
}

async function start() {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
    args: ["--start-maximized"],
  });
  const [page] = await browser.pages();

  await login(page);

  let links: string[] = await page.$$eval(Selector.CARDS_GAMES, (cards) => {
    const uniqueLinks = new Set<string>();
    cards.forEach((el: any) => uniqueLinks.add(el.href.split("?")[0]));
    return [...uniqueLinks].reverse();
  });

  const lastLink = fs.readFileSync("lastLink.txt", "utf-8");
  const lastLinkIndex = links.findIndex((link) => link === lastLink);

  links = links.slice(lastLinkIndex + 1);

  for (let link of links) {
    await page.goto(link, { waitUntil: "networkidle2" });

    const hasButtonClaimGift = await page.$(Selector.BUTTON_CLAIM_GIFT);
    if (!hasButtonClaimGift) {
      continue;
    }

    const isButtonClaimGiftDisable = await page.$eval(
      Selector.BUTTON_CLAIM_GIFT,
      (button: any): boolean => {
        return button.disabled;
      }
    );

    if (isButtonClaimGiftDisable) {
      fs.writeFileSync("lastLink.txt", link);
      continue;
    }

    await page.click(Selector.BUTTON_CLAIM_GIFT, { delay: SECOND });
    await page.waitForNetworkIdle({ idleTime: SECOND });

    fs.writeFileSync("lastLink.txt", link);
  }

  await browser.close();
}

start();
