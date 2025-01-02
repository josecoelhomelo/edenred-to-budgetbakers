import 'dotenv/config';
import edenred from 'edenred-transactions';
import wallet from 'wallet-budgetbakers-import';
const edenredAuth = {
    endpoint: process.env.EDENRED_ENDPOINT,
    user: process.env.EDENRED_USER,
    password: process.env.EDENRED_PASSWORD
}
const walletAuth = {
    user: process.env.WALLET_USER,
    password: process.env.WALLET_PASSWORD
}
const walletConfig = {    
    email: process.env.WALLET_IMPORT_EMAIL,
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
            amount: record.amount >= 0 ? record.amount : 0,
            expense: record.amount < 0 ? record.amount : 0
        }
    });
    const path = edenred.saveTransactions(transactions);
    await wallet.login(walletAuth.user, walletAuth.password);
    const result = await wallet.importFile({
        file: path,
        email: walletConfig.email,
        accountId: walletConfig.accountId
    });
    console.log(result);
} catch(err) {
    console.error(err);
}