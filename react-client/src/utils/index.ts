export const API_ENDPOINTS = {
  ENCODE: "/api/encode",
  DECODE: "/api/decode",
  LIST: "/api/list?search=",
};

export const handleCopyShortURL = (url: string) => {
  navigator.clipboard.writeText(url).then(() => {
    alert("Short URL copied to clipboard!");
  });
};
