import 'dotenv/config';
import edenred from 'edenred-transactions';
import wallet from 'wallet-budgetbakers-import';
const edenredAuth = {
    endpoint: process.env.EDENRED_ENDPOINT,
    user: process.env.EDENRED_USER,
    password: process.env.EDENRED_PASSWORD
}
const walletAuth = {
    email: process.env.WALLET_EMAIL,
    importEmail: process.env.WALLET_IMPORT_EMAIL,
    accountId: process.env.WALLET_ACCOUNT_ID
}
try {
    await edenred.login({
        endpoint: edenredAuth.endpoint,
        user: edenredAuth.user,
        password: edenredAuth.password
    });
    let transactions = await edenred.getTransactions();
    transactions = transactions.map(record => {
        return {
            date: new Date(record.transactionDate).toISOString(),
            note: record.transactionName,
            income: record.amount >= 0 ? record.amount : 0,
            expense: record.amount < 0 ? record.amount : 0
        }
    });
    const path = edenred.saveTransactions(transactions);
    await wallet.login(walletAuth.email);
    const importResult = await wallet.importFile({
        file: path,
        importEmail: walletAuth.importEmail,
        accountId: walletAuth.accountId
    });
    console.log(importResult);
} catch(err) {
    console.error(err);
}