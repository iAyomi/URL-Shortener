const truncateHash = (hash, store, truncVal = 6) => {
  const truncatedHash = hash.slice(0, truncVal);
  if (store[truncatedHash]) {
    return truncateHash(hash, store, truncVal + 1);
  }
  return truncatedHash;
};

export default truncateHash;
