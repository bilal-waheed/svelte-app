<script>
  import {
    hash160,
    bufferCV,
    bufferCVFromString,
    PostConditionMode,
  } from "@stacks/transactions";
  import { utf8ToBytes } from "@stacks/common";
  import { makeContractCall } from "../helpers/makeContractCall.js";

  // register form fields
  let registerBnsName;
  let registerBnsNamespace;
  let registerSalt;
  let registerZonefile;

  const registerName = async () => {
    const zonefileHash = hash160(utf8ToBytes(registerZonefile));

    const functionArguments = [
      bufferCVFromString(registerBnsNamespace),
      bufferCVFromString(registerBnsName),
      bufferCVFromString(registerSalt),
      bufferCV(zonefileHash),
    ];

    makeContractCall(
      "name-register",
      functionArguments,
      PostConditionMode.Deny
    );

    // clearing the form fields
    registerBnsName = "";
    registerBnsNamespace = "";
    registerSalt = "";
    registerZonefile = "";
  };
</script>

<main>
  <form on:submit|preventDefault={registerName}>
    <input type="text" placeholder="name" bind:value={registerBnsName} />
    <input
      type="text"
      placeholder="namespace"
      bind:value={registerBnsNamespace}
    />
    <input type="text" placeholder="Salt" bind:value={registerSalt} />
    <input type="text" placeholder="Zonefile" bind:value={registerZonefile} />
    <button type="submit">Register!</button>
  </form>
  <br /><br />
</main>
