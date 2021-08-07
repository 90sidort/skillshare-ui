const getErrorMessage = (err) => {
  if (err.data) {
    if (err.data.message) return err.data.message;
  }
  return "Request failed!";
};

export default getErrorMessage;
