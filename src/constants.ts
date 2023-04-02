import dotenv from "dotenv";

dotenv.config();

export const SECOND = 1000;

export interface UrlConfig {
  HOME_PAGE: string;
}

export const Url: UrlConfig = {
  HOME_PAGE: "https://gaming.amazon.com/home",
};

export interface SelectorConfig {
  BUTTON_CLAIM: string;
  BUTTON_CLAIM_GIFT: string;
  CARDS_GAMES: string;
  BUTTON_SIGN_IN: string;
  BUTTON_SIGN_IN_SUBMIT: string;
  INPUT_EMAIL: string;
  INPUT_PASSWORD: string;
}

export const Selector: SelectorConfig = {
  BUTTON_CLAIM: "[title='Claim']",
  BUTTON_CLAIM_GIFT: "[data-a-target='buy-box_call-to-action']",
  CARDS_GAMES: "[data-a-target='learn-more-card']",
  BUTTON_SIGN_IN: "[data-a-target='sign-in-button']",
  BUTTON_SIGN_IN_SUBMIT: "#signInSubmit",
  INPUT_EMAIL: "#ap_email",
  INPUT_PASSWORD: "#ap_password",
};

export interface CredentialsConfig {
  USER: string;
  PASSWORD: string;
}

export const Credentials: CredentialsConfig = {
  USER: process.env.PRIME_GAMING_USERNAME ?? "",
  PASSWORD: process.env.PRIME_GAMING_PASSWORD ?? "",
};

export interface ConfigFiles {
  COOKIES: string;
  LAST_LINK: string;
}

export const ConfigFiles: ConfigFiles = {
  COOKIES: "cookies.json",
  LAST_LINK: "lastLink.txt",
};

export interface BrowserConfig {
  HEADLESS: boolean;
}

export const BrowserConfig: BrowserConfig = {
  HEADLESS: ["true", "1"].includes(
    process.env.BROWSER_HEADLESS?.toLowerCase() ?? ""
  ),
};
