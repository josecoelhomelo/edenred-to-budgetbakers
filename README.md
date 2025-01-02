This app retrieves transactions from your Edenred's card using module [edenred-transactions](https://github.com/josecoelhomelo/edenred-transactions) and imports them to BudgetBaker's Wallet using module [wallet-budgetbakers-import](https://github.com/josecoelhomelo/wallet-budgetbakers-import).
> **NOTE:** Only tested with the Portuguese version (https://www.myedenred.pt)

# Usage
Create a `.env` file and fill the required information.
```env
EDENRED_USER =
EDENRED_PASSWORD =
WALLET_USER =
WALLET_PASSWORD =
WALLET_IMPORT_EMAIL =
```
You may also specify `EDENRED_ENDPOINT` if you are not using the Portuguese version and `WALLET_ACCOUNT_ID` if you have multiple accounts in Wallet.

You can retrieve the import e-mail in Wallet's account settings and the account identification in the URL, when navigating to the account detail.

Finally, run the file with Node.js:
```
node app.js
```
In order to validate the login process, you will be prompted to enter the 2FA code that is sent to your e-mail.\
Only new/unexisting records will be considered.