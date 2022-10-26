import { openContractCall } from "@stacks/connect";
import { StacksTestnet } from "@stacks/network";

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
    onFinish: (data) => {
      console.log("onFinish:", data);
      window
        .open(
          `https://explorer.stacks.co/txid/${data.txId}?chain=testnet`,
          "_blank"
        )
        .focus();
    },
    onCancel: () => {
      console.log("onCancel:", "Transaction was canceled");
    },
  });
};
