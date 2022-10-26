import { openContractCall } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";
import { saveUpdatedFile } from "./saveUpdatedFile";

export const makeContractCall = async (
  functionName,
  functionArgs,
  postConditionMode,
  postConditions
) => {
  openContractCall({
    network: new StacksTestnet(),
    anchorMode: 3,
    contractAddress: "ST000000000000000000002AMW42H",
    contractName: "bns",
    functionName,
    functionArgs,
    postConditionMode,
    postConditions,
    onFinish: async (data) => {
      saveUpdatedFile(functionName, data.txId);
    },
    onCancel: () => {
      console.log("onCancel:", "Transaction was canceled");
    },
  });
};
