export const PORT = 4000;
export const API_BASE_URL = `http://localhost:${PORT}/api`;

export const API_ENDPOINTS = {
  ENCODE: "/encode",
  DECODE: "/decode",
  LIST: "/list?search=",
};

export const API_URL = {
  ENCODE: `${API_BASE_URL}${API_ENDPOINTS.ENCODE}`,
  DECODE: `${API_BASE_URL}${API_ENDPOINTS.DECODE}`,
  LIST: `${API_BASE_URL}${API_ENDPOINTS.LIST}`,
};

export const handleCopyShortURL = (url: string) => {
  navigator.clipboard.writeText(url).then(() => {
    alert("Short URL copied to clipboard!");
  });
};
