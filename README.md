This app retrieves transactions from your Edenred's card using module [edenred-transactions](https://github.com/josecoelhomelo/edenred-transactions) and imports them to BudgetBaker's Wallet using module [wallet-budgetbakers-import](https://github.com/josecoelhomelo/wallet-budgetbakers-import).
<p><sup>Only tested with the Portuguese host/version (https://www.myedenred.pt).</sup></p>

# Usage

Create a `.env` file and fill the required information:

```env
EDENRED_HOST =
EDENRED_USER =
EDENRED_PASSWORD =
WALLET_USER =
WALLET_PASSWORD =
WALLET_IMPORT_EMAIL =
WALLET_ACCOUNT_ID = 
```

Only new/unexisting records will be considered.