<script>
  import { userSession } from "../createUserSession.js";
  import {
    hash160,
    bufferCV,
    tupleCV,
    parseAssetInfoString,
    bufferCVFromString,
    NonFungibleConditionCode,
    createNonFungiblePostCondition,
    standardPrincipalCV,
    someCV,
    PostConditionMode,
  } from "@stacks/transactions";
  import { utf8ToBytes } from "@stacks/common";
  import { makeContractCall } from "../makeContractCall.js";

  //transfer form field values
  let transferBnsName;
  let transferBnsNamespace;
  let newOwnerAddress;
  let transferZonefile;

  const transferName = async () => {
    const zonefileHash = hash160(utf8ToBytes(transferZonefile));

    const functionArguments = [
      bufferCVFromString(transferBnsNamespace),
      bufferCVFromString(transferBnsName),
      standardPrincipalCV(newOwnerAddress),
      someCV(bufferCV(zonefileHash)),
    ];

    const postConditionSender = createNonFungiblePostCondition(
      userSession.loadUserData().profile.stxAddress.testnet,
      NonFungibleConditionCode.Sends,
      parseAssetInfoString(`ST000000000000000000002AMW42H.bns::names`),
      tupleCV({
        name: bufferCVFromString(transferBnsName),
        namespace: bufferCVFromString(transferBnsNamespace),
      })
    );

    const postConditionReceiver = createNonFungiblePostCondition(
      newOwnerAddress,
      NonFungibleConditionCode.DoesNotSend,
      parseAssetInfoString(`ST000000000000000000002AMW42H.bns::names`),
      tupleCV({
        name: bufferCVFromString(transferBnsName),
        namespace: bufferCVFromString(transferBnsNamespace),
      })
    );
    const postConditions = [postConditionSender, postConditionReceiver];

    makeContractCall(
      "name-transfer",
      functionArguments,
      PostConditionMode.Deny,
      postConditions
    );

    //clearing the form fields
    transferBnsName = "";
    transferBnsNamespace = "";
    newOwnerAddress = "";
    transferZonefile = "";
  };
</script>

<main>
  <form on:submit|preventDefault={transferName}>
    <input type="text" placeholder="name" bind:value={transferBnsName} />
    <input
      type="text"
      placeholder="namespace"
      bind:value={transferBnsNamespace}
    />
    <input
      type="text"
      placeholder="New Owner Address"
      bind:value={newOwnerAddress}
    />
    <input type="text" placeholder="Zonefile" bind:value={transferZonefile} />
    <button type="submit">Transfer!</button>
  </form>
  <br /><br />
</main>
