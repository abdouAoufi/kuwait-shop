export const PIXEL_STATUS: string = "ON";

export const disallowedCountries = ["DZ", "MA"];

export function getQueryParam(param: string) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

export const GTM_ID = "GTM-K5KFHQR8";

export type countriesCodes = { SA: string; KW: string; QA: string };

export const getCurrencyByreg: countriesCodes = {
  SA: "ريال سعودي ",
  KW: "دينار كويتي",
  QA: "ريال قطري",
};
export const getCurrencyCodeByreg: countriesCodes = {
  SA: "SAR",
  KW: "KWD",
  QA: "QAR",
};
export const getCountryCodeByreg: countriesCodes = {
  SA: "SA",
  KW: "KW",
  QA: "QA",
};

export const getCountriesFlag3d: countriesCodes = {
  SA: "https://lh3.googleusercontent.com/-wTfTbCsoIBU/VhEr1qvhxeI/AAAAAAAAiMc/h1TbUobWFPo/s1600/saudi-arabia-flag-reflection.jpg",
  QA: "https://lh3.googleusercontent.com/-KhT8U_PTaKI/VhErTja8TEI/AAAAAAAAiDY/7Gz3jkGniXk/s1600/qatar-flag-reflection.jpg",
  KW: "https://lh3.googleusercontent.com/-UX_gqVPf8_g/VhEoaB_j1KI/AAAAAAAAhWY/uxl-k2UMId4/s1600/kuwait-flag-reflection.jpg",
};

export enum COUNTRIES {
  SAUDIA = "SA",
  KUWAIT = "KW",
  OMAN = "omn",
  QATAR = "QA",
  UAE = "uae",
}
export const isValidRegion = (key: string) => {
  return Object.values(COUNTRIES).includes(key as COUNTRIES);
};

export const selectRandomValueFromList = (list: any[]) => {
  return list[Math.floor(Math.random() * list.length)];
};
