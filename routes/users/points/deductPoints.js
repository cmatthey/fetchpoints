module.exports =
    (req, res) => {
        res.type('application/json');
        const {
            userId,
        } = req.params;
        const {
            points,
        } = req.body;
        console.log('--params', req.params);
        const successResponse = {
            points: points };
        res.status(200).json(successResponse);
    }