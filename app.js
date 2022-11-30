require('dotenv').config();
const fs = require('node:fs');
const edenred = require('edenred-transactions');
const budgetbakers = require('budgetbakers-import');
const edenredAuth = {
    host: process.env.EDENRED_HOST,
    username: process.env.EDENRED_USER,
    password: process.env.EDENRED_PASSWORD
}
const budgetbakersAuth = {
    username: process.env.BUDGETBAKERS_USER,
    password: process.env.BUDGETBAKERS_PASSWORD
}
edenred.exportTransactions(edenredAuth.host, edenredAuth.username, edenredAuth.password)
    .then(res => {
        const data = fs.readFileSync(res, 'utf-8');            
        fs.writeFileSync(res, data.replace('description', 'note'), 'utf-8');
        return budgetbakers.uploadFile(budgetbakersAuth.username, budgetbakersAuth.password, res, true)
    })
    .then(res => console.log(res));
