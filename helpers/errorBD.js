

const handlerError = (res, error) => {
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg: 'Fatal error on server'
    });
}

module.exports = handlerError;