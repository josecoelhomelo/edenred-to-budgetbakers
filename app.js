require('dotenv').config();
const fs = require('fs');
const edenred = require('edenred-transactions');
const budgetbakers = require('budgetbakers-import');
const edenredLogin = {
    host: process.env.EDENRED_HOST,
    username: process.env.EDENRED_USER,
    password: process.env.EDENRED_PASSWORD
}
const budgetbakersLogin = {
    username: process.env.BUDGETBAKERS_USER,
    password: process.env.BUDGETBAKERS_PASSWORD
}
edenred.exportTransactions(edenredLogin.host, edenredLogin.username, edenredLogin.password)
    .then(res => {
        const data = fs.readFileSync(res, 'utf-8');            
        fs.writeFileSync(res, data.replace('description', 'note'), 'utf-8');
        return budgetbakers.uploadFile(budgetbakersLogin.username, budgetbakersLogin.password, res, true)
    })
    .then(res => console.log(res));
