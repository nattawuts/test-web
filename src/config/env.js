const config = {
  baseApi: "http://localhost:8080",
};

export const getConfig = key => {
  return config[key];
};
