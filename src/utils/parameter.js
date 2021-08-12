export const getParameters = (url) => {
  const queryparams = url.split("?")[1];

  if (queryparams) {
    const params = queryparams.split("&");

    let pair = null;
    const data = {};

    params.forEach((d) => {
      pair = d.split("=");
      const keyValue = String(pair[0]);
      const value = pair[1];
      data[keyValue] = value;
    });
    return data;
  }
  return {};
};
