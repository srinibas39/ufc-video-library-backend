const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs')
const formatDate = () => dayjs().format("YYYY-MM-DDTHH:mm:ssZ");
const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

const signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    if (email && password && firstName && lastName) {
        const encodedToken = jwt.sign({ id: uuidv4() }, secret);
        const newUser = new userModel({ _id: uuidv4(), email, password, firstName, lastName, createdAt: formatDate(), updatedAt: formatDate() })
        newUser.save()
            .then((createdUser) => res.json({ data: { createdUser, encodedToken }, status: 200 }))
            .catch((error) => res.json({ ErrorMessage: error }))
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;

    if (email && password) {
        try {

            const encodedToken = jwt.sign({ id: uuidv4() }, secret);
            const foundUser = await userModel.findOne({ email })
            if (password === foundUser.password) {

                res.json({ data: { foundUser, encodedToken }, status: 200 })
            }
            else {
                res.json({ message: "Please check your password" })
            }
        }
        catch (error) {
            res.json({ ErrorMessage: error })
        }


    }
}

module.exports = { signup, login }