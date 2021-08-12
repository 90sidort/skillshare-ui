export const createURL = (params) => {
  let newUrl = "";
  for (const [key, value] of Object.entries(params)) {
    newUrl = newUrl + `${key}=${value}&`;
  }
  if (newUrl.length > 0) {
    newUrl = "?" + newUrl;
    newUrl = newUrl.slice(0, -1);
  }
  return newUrl;
};
