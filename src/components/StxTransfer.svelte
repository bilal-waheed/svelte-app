<script>  
    import { openSTXTransfer } from '@stacks/connect';

    let address;
    let amount;
    const sendToken = async () => {
        const options = {
            recipient: address,
            amount: amount
        };
        await openSTXTransfer(options);
        address = '';
        amount = '';
    }
</script>

<main>
    <form on:submit|preventDefault={sendToken}>
        <input type="text" placeholder="Address" bind:value={address}>
        <input type="number" placeholder="Amount" bind:value={amount}>
        <button type="submit">Send!</button>
    </form>
    <br><br>
</main>