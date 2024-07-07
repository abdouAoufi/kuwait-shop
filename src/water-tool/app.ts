declare global {
  interface Window {
    fbq: any;
  }
}

import { fetchLocationData } from "../api/queries-mutations/getLocation";
import { createLead, trackViewLead } from "../api/queries-mutations/lead";
import {
  COUNTRIES,
  disallowedCountries,
  getCurrencyByreg,
  getCurrencyCodeByreg,
  getQueryParam,
} from "../util/util";

// const normalOfferDiv = document.getElementById("normal-offer");
// const specialOfferDiv = document.getElementById("special-offer");
// const specialOfferPar: HTMLParagraphElement | null =
    document.querySelector("#total-displayer");

const ctaBtn: HTMLButtonElement | null = document.querySelector("#cta-btn");
const userNameInput: HTMLInputElement | null =
    document.querySelector("#user-name-input");
const userPhoneInput: HTMLInputElement | null =
    document.querySelector("#user-phone-input");
const userCityInput: HTMLInputElement | null =
    document.querySelector("#user-city-input");

const basicInfo = {
  productId: 10,
  productName: "water tool",
  currency: getCurrencyByreg[COUNTRIES.KUWAIT],
  price: 9,
  fbc: getQueryParam("fbclid"),
  currencyCode: getCurrencyCodeByreg[COUNTRIES.KUWAIT],
};

let total = basicInfo.price;

document.addEventListener("DOMContentLoaded", async () => {
  const locationData = await fetchLocationData();
  // ! CHECK USER COUNTRY ==============================
  if (disallowedCountries.includes(locationData?.country)) return;
  handleAddGoogleAnalytics();
  initFbPixel();      
  ({
    country: locationData?.country,
    fbc: getQueryParam("fbclid"),
  }).then(console.log);
  setTimeout(() => {
    if (window?.fbq)
      window?.fbq("track", "ViewContent", {
        content_name: basicInfo.productName,
        content_category: "Home goods",
        content_ids: [basicInfo.productId],
        content_type: "product",
        value: basicInfo.price,
        currency: "SAR",
      });
  }, 3000);

  // specialOfferDiv?.addEventListener("click", () => {
  //   total = 160;
  //   if (specialOfferPar && normalOfferDiv) {
  //     specialOfferPar.innerText =
  //         total + "  " + getCurrencyByreg[COUNTRIES.SAUDIA] + "  ";
  //     specialOfferDiv.classList.add("selected-offer");
  //     normalOfferDiv.classList.remove("selected-offer");
  //   }
  // });
  // normalOfferDiv?.addEventListener("click", () => {
  //   total = basicInfo.price;
  //   if (specialOfferPar && specialOfferDiv) {
  //     specialOfferPar.innerText =
  //         total + "  " + getCurrencyByreg[COUNTRIES.SAUDIA] + "  ";
  //     specialOfferPar.innerText = total + getCurrencyByreg[COUNTRIES.SAUDIA];
  //     specialOfferDiv.classList.remove("selected-offer");
  //     normalOfferDiv.classList.add("selected-offer");
  //   }
  // });
  ctaBtn?.addEventListener("click", () => {
    ctaBtn.innerHTML = `<div class="loader"></div>`;
    handleSubmit();
  });
});

const handleSubmit = () => {
  const payload = {
    name: userNameInput?.value,
    phone: userPhoneInput?.value,
    city: userCityInput?.value,
    country: COUNTRIES.KUWAIT,
    ...basicInfo,
    total,
  };
  createLead(payload)
      .then(() => {
        if (window?.fbq) {
          window?.fbq("track", "Lead", {
            content_name: "Lead Form Submission",
            value: 0.0,
            currency: "USD",
          });
        }
        window.location.href = "/thank-you";
      })
      .catch(() => {
        alert("حدث خطأ أثناء إرسال البيانات المرجو تحديث الصفحة");
      })
      .finally(() => {
        if (ctaBtn) ctaBtn.innerHTML = `أطلب و إدفع عند الإستلام`;
      });
};

const handleAddGoogleAnalytics = () => {
  const script1 = document.createElement("script");
  script1.async = true;
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-F4R8P0FLY2";

  // Create the second script tag
  const script2 = document.createElement("script");
  script2.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-F4R8P0FLY2");
  `;

  // Create the third script tag
  const script3 = document.createElement("script");
  script3.textContent = `
    (function (w, d, s, l, i) {
      w[l] = w[l] || [];
      w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
      var f = d.getElementsByTagName(s)[0],
        j = d.createElement(s),
        dl = l != "dataLayer" ? "&l=" + l : "";
      j.async = true;
      j.src = "https://www.googletagmanager.com/gtm.js?id=" + i + dl;
      f.parentNode.insertBefore(j, f);
    })(window, document, "script", "dataLayer", "GTM-N5G9FFW3");
  `;

  // Create the noscript tag
  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = "https://www.googletagmanager.com/ns.html?id=GTM-N5G9FFW3";
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";
  noscript.appendChild(iframe);

  // Append all the created elements to the body
  document.body.appendChild(script1);
  document.body.appendChild(script2);
  document.body.appendChild(script3);
  document.body.appendChild(noscript);
};

const initFbPixel = () => {
  var fbScript = document.createElement("script");
  fbScript.innerHTML = `
    !(function (f, b, e, v, n, t, s) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", "460539890063316");
    fbq("track", "PageView");
  `;

  // Append script element to head
  document.head.appendChild(fbScript);

  // Create noscript element
  var noScript = document.createElement("noscript");
  noScript.innerHTML = `
    <img
      height="1"
      width="1"
      style="display: none"
      src="https://www.facebook.com/tr?id=460539890063316&ev=PageView&noscript=1"
    />
  `;

  // Append noscript element to body
  document.body.appendChild(noScript);
};
