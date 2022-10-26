import { storage } from "../createUserSession";

const fetchTransactions = async () => {
  try {
    let transactionData = await storage.getFile("transaction_data.json");
    transactionData = JSON.parse(transactionData);
    return transactionData;
  } catch (e) {}
};

export const saveUpdatedFile = async (transactionType, txid) => {
  const transactionData = await fetchTransactions(); // an array
  const txObject = {
    txid,
    type: transactionType,
  };
  const updatedArray = [...(transactionData || []), txObject];
  const fileUrl = await storage.putFile(
    "transaction_data.json",
    JSON.stringify(updatedArray)
  );
};
