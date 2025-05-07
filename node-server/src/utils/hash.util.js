import crypto from "crypto";

const hashURL = (URL) => {
  const hash = crypto.createHash("sha256");
  hash.update(URL);
  return hash.digest("hex");
};

export default hashURL;
