require('dotenv').config();
const fs = require('node:fs');
const ObjectsToCsv = require('objects-to-csv');
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
edenred.getTransactions(edenredAuth.host, edenredAuth.username, edenredAuth.password)
    .then(async res => { 
        const object = res.map(record => {
            return {
                date: record.transactionDate,
                note: record.transactionName,
                amount: record.amount >= 0 ? record.amount : 0,
                expense: record.amount < 0 ? record.amount : 0
            }
        });
          
        const folder = 'transactions'; 
        if (!fs.existsSync(folder)) { fs.mkdirSync(folder); }
        const date = new Date(); 
        const timestamp = `${date.getFullYear()}-${(`0` + parseInt(date.getMonth()+1)).slice(-2)}-${(`0` + date.getDate()).slice(-2)}T${(`0` + date.getHours()).slice(-2)}-${(`0` + date.getMinutes()).slice(-2)}`;
        const path = `${folder}/${timestamp}.csv`;        
        const csv = new ObjectsToCsv(object); 
        await csv.toDisk(path);

        return budgetbakers.uploadFile(budgetbakersAuth.username, budgetbakersAuth.password, path, true)
    })
    .then(res => console.log(res));
