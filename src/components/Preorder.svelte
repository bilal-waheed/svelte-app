<script>
  import { userSession } from "../createUserSession";
  import {
    hash160,
    bufferCV,
    uintCV,
    createSTXPostCondition,
    parseAssetInfoString,
    AddressVersion,
    createStacksPublicKey,
    FungibleConditionCode,
    PostConditionMode,
  } from "@stacks/transactions";
  import { utf8ToBytes } from "@stacks/common";
  import { SECP256K1Client } from "jsontokens";
  import { makeContractCall } from "../makeContractCall.js";

  // preorder form field values
  let preorderBnsName;
  let preorderBnsNamespace;
  let preorderSalt;
  let stxToBurn;

  const preorderName = async () => {
    const utfBytes = utf8ToBytes(
      `${preorderBnsName}.${preorderBnsNamespace}${preorderSalt}`
    );
    const hashedBytes = hash160(utfBytes);

    const burnSTXPostCondition = createSTXPostCondition(
      userSession.loadUserData().profile.stxAddress.testnet,
      FungibleConditionCode.Equal,
      stxToBurn
    );
    const postConditions = [burnSTXPostCondition];

    makeContractCall(
      "name-preorder",
      [bufferCV(hashedBytes), uintCV(stxToBurn)],
      PostConditionMode.Deny,
      postConditions
    );

    //clearing the form fields
    preorderBnsName = "";
    preorderBnsNamespace = "";
    preorderSalt = "";
    stxToBurn = "";
  };
</script>

<main>
  <form on:submit|preventDefault={preorderName}>
    <input type="text" placeholder="Name" bind:value={preorderBnsName} />
    <input
      type="text"
      placeholder="Namespace"
      bind:value={preorderBnsNamespace}
    />
    <input type="text" placeholder="Salt" bind:value={preorderSalt} />
    <input type="number" placeholder="STX to burn" bind:value={stxToBurn} />
    <button type="submit">Preorder!</button>
  </form>
  <br /><br />
</main>
