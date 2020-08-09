
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');

const handlerError = (res, error) => {
    console.log(error);
    return res.status(500).json({
        ok: false,
        msg: 'Fatal error on server'
    });
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json(
                {
                    ok: false,
                    msg: 'User already exists',
                }
            )
        }

        user = new User(req.body);

        //Encrypt user password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate a JWT

        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });

    } catch (e) {
        handlerError(res, e);
    }


};

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: "Email not found"
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is incorrect'
            });
        }

        const token = await generateJWT(user.id, user.name);

        return res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });


    } catch (e) {
        handlerError(res, e);
    }

};

const renewToken = async (req, res) => {
    try {
        const { uid, name } = req;
        const token = await generateJWT(uid, name);

        return res.status(201).json({
            ok: true,
            uuid: uid,
            name: name,
            token,
        });
    } catch (e) {
        handlerError(res, e);
    }
}




module.exports = {
    createUser,
    loginUser,
    renewToken
}