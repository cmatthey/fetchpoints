const Deque = require("collections/deque");

module.exports =
    (req, res) => {
        res.type('application/json');
        const {
            userId,
        } = req.params;
        const {
            payer,
            points,
            transactionDate
        } = req.body;
        console.log('userId', userId);
        console.log('transactionDate', Date.parse('10/31/21 10AM'));
        let data = req.app.get('data');
        if (!data.hasOwnProperty(userId)) {
            data[userId] = {};
        }
        console.log('--data', req.app.get('data'));
        const successResponse = { payer: payer, 
            points: points,
            transactionDate: transactionDate };
        res.status(200).json(successResponse);
    }