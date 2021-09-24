
// Modules

module.exports = function (err, req, res, next) {
    console.log(err);
    if (err instanceof Error) {
        res.status(err.status).json({message: err.message, error: err.errors});
    }
    return res.status(500).json({message: 'Something went wrong'});
}