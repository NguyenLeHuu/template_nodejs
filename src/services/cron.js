const cron = require('node-cron');
const initializeCron = () => {

cron.schedule('35 18 * * *', 
        () => {
            console.log('Hello, world!');
        }, 
        {
        timezone: 'Asia/Ho_Chi_Minh'
        }
);}
module.exports = initializeCron;

