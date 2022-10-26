<script>
  import { fetchTransactions } from "../helpers/saveUpdatedFile";
</script>

<main>
  <h2>Transactions</h2>
  {#await fetchTransactions() then transactions}
    <ol>
      {#each transactions as tx}
        <li>{tx.type} - {tx.txid}</li>
      {/each}
    </ol>
  {/await}
</main>
