import 'dotenv/config';
import edenred from 'edenred-transactions';
import wallet from 'wallet-budgetbakers-import';
const edenredAuth = {
    endpoint: process.env.EDENRED_ENDPOINT,
    username: process.env.EDENRED_USER,
    password: process.env.EDENRED_PASSWORD
}
const walletAuth = {
    username: process.env.WALLET_USER,
    password: process.env.WALLET_PASSWORD,
    importEmail: process.env.WALLET_IMPORT_EMAIL,
    accountId: process.env.WALLET_ACCOUNT_ID
}
try {
    await edenred.login({
        endpoint: edenredAuth.endpoint,
        email: edenredAuth.username,
        password: edenredAuth.password
    });
    let transactions = await edenred.getTransactions();
    transactions = transactions.map(record => {
        return {
            date: new Date(record.transactionDate).toISOString(),
            note: record.transactionName,
            amount: record.amount >= 0 ? record.amount : 0,
            expense: record.amount < 0 ? record.amount : 0
        }
    });
    const path = edenred.saveTransactions(transactions);
    const result = await wallet.uploadFile(walletAuth.username, walletAuth.password, path, walletAuth.importEmail, walletAuth.accountId);
    console.log(result);
} catch(err) {
    console.error(err);
}