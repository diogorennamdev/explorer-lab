import "./css/index.css";
import IMask, { MaskedPattern } from "imask";
const alterarcolors1 = document.querySelector(
  ".cc-bg svg > g g:nth-child(1) path"
);
const alterarcolors2 = document.querySelector(
  ".cc-bg svg > g g:nth-child(2) path"
);

function setCardType(type) {
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#C69347", "#DF6F29"],
    default: ["black", "gray"],
  };
  alterarcolors1.setAttribute("fill", colors[type][0]);
  alterarcolors2.setAttribute("fill", colors[type][1]);
}
setCardType("mastercard");

const securityCode = document.querySelector("#security-code");
const securyCodePattern = {
  mask: "0000",
};
const securityCodeMasked = IMask(securityCode, securyCodePattern);

const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2), // fomarta a data pegando o ano atual
      to: String(new Date().getFullYear() + 10).slice(2),
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
  },
};
const expireDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector("#card-number");

const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      type: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-6-7]\d{0,2})\d{0,12}/,
      type: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      type: "default",
    },
  ],

  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "");
    const foundmask = dynamicMasked.compiledMask.find(function(item){
      return number.match(item.regex)
    })
    console.log(foundmask)
    return foundmask
  },
 
};
 const cardNumberMasked = IMask(cardNumber, cardNumberPattern);