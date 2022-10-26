import { storage } from "../createUserSession.js";

export const saveTransaction = async (txType, txid) => {
  // save the txid and tx type
  const txData = JSON.stringify({
    txType,
    txid,
  });
  const fileUrl = await storage.putFile("transaction_data.json", txData);
  return fileUrl;
};
