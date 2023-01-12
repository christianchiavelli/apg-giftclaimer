const dotenv = require("dotenv");

dotenv.config();

const SECOND = 1000;

const Url = {
  HOME_PAGE: "https://gaming.amazon.com/home",
};

const Selector = {
  BUTTON_CLAIM: "[title='Claim']",
  BUTTON_CLAIM_GIFT: "[data-a-target='buy-box_call-to-action']",
  CARDS_GAMES: "[data-a-target='learn-more-card']",
  BUTTON_SIGN_IN: "[data-a-target='sign-in-button']",
  BUTTON_SIGN_IN_SUBMIT: "#signInSubmit",
  INPUT_EMAIL: "#ap_email",
  INPUT_PASSWORD: "#ap_password",
};

const Credentials = {
  USER: process.env.PRIME_GAMING_USERNAME,
  PASSWORD: process.env.PRIME_GAMING_PASSWORD,
};

module.exports.SECOND = SECOND;
module.exports.Url = Url;
module.exports.Selector = Selector;
module.exports.Credentials = Credentials;
