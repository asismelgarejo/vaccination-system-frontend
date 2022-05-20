export const FAKE_SERVICE = (response = "success") => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(response);
    }, 1000);
  });
};


