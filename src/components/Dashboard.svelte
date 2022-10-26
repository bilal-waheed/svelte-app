<script>
  import { userSession } from "../createUserSession";
  import { SECP256K1Client } from "jsontokens";
  import StxTransfer from "./StxTransfer.svelte";
  import Register from "./Register.svelte";
  import Transfer from "./Transfer.svelte";
  import Preorder from "./Preorder.svelte";
  import Transactions from "./Transactions.svelte";

  let authResponse;
  let publicKey;

  const authenticate = async () => {
    const transitKey = userSession.generateAndStoreTransitKey();
    const redirectUri = document.location.origin;
    const manifestUri = `${document.location.origin}/manifest.json`;
    const sendToSignIn = true;
    const appDetails = {
      name: "Svelte App",
      icon: window.location.origin + "/svelte.svg",
    };

    const authRequest = userSession.makeAuthRequest(
      transitKey,
      redirectUri,
      manifestUri,
      userSession.appConfig.scopes,
      document.location.origin,
      undefined,
      { sendToSignIn, appDetails }
    );

    try {
      const provider = window.StacksProvider || window.BlockstackProvider;
      authResponse = await provider.authenticationRequest(authRequest);
      await userSession.handlePendingSignIn(authResponse);
      const privateKey = userSession.loadUserData().appPrivateKey;
      publicKey = SECP256K1Client.derivePublicKey(privateKey);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  };

  const signout = () => {
    userSession.signUserOut("/");
  };
</script>

<main>
  {#if userSession.isUserSignedIn()}
    <button on:click={signout}> Sign out </button>
    <p>
      Testnet Address: {userSession.loadUserData().profile.stxAddress.testnet}
    </p>
    <br />
    <StxTransfer />
    <Preorder />
    <Register />
    <Transfer />
    <Transactions />
  {:else}
    <button on:click={authenticate}> Connect Wallet! </button>
  {/if}
</main>
