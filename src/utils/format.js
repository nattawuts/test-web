export const verifyTextNumber = str => {
  if (str?.length > 0) {
    let n = "";
    for (let i = 0; i < str.length; i++) {
      let s = str[i];
      if (/^[0-9]*$/.exec(str[i])) {
        n = n + s;
      }
    }
    return n;
  }
  return str;
};

export const toMobileFormat = str => {
  if (str) {
    str = str.replaceAll("-", "");
    if (str.length > 6) {
      return str
        .substring(0, 10)
        .replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3");
    } else if (str.length > 3) {
      return str.replace(/(\d{3})(\d{0,3})/, "$1-$2");
    }
  }
  return str;
};

export const fileToBase64 = file => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = error => {
      reject(error);
    };
  });
};
