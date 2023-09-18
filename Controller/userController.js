let arr = [];
const jwt=require("jsonwebtoken")
const bcrypt = require("bcrypt");
const secretkey="hyyyyyy07"
const { JsonWebTokenError } = require("jsonwebtoken");
const saltRound = 10
const register = (req, res) => {
    const details = req.body;
    //    console.log(details)
    const find = arr.find((item) => details.email === item.email)
    if (find) {
        return res.send({ Msg: "User already register" })
    }
    // const hashPassword=bcrypt.hash(originalPasswaord,saltRound);
    const generatesalt = bcrypt.genSaltSync(10)
    console.log("Random Sting Generated :", generatesalt)

    const hashPassword = bcrypt.hashSync(details.password, saltRound);
    const temp = {
        email: details.email,
        password: hashPassword,
    };
    arr.push(temp)
    const token=jwt.sign({email:details.email},secretkey,{expiresIn:"3600"})
    res.send({ Msg: "User is register", result: arr,token:token })
}
const login = async (req, res) => {
    const details = req.body;
    const find = arr.find((item) => details.email === item.email)
    if (!find) {
        return res.send({ Msg: "User is Not Register....!" })
    }
    const validate = await bcrypt.compare(details.password, find.password);
    if (!validate) {
        return res.send({ Msg: "User Password is Wrong" })
    }
    const token=jwt.sign({email:details.email},secretkey,{expiresIn:"3600"})
    return res.status(200).send({ Msg: "User is log in succesfully",token:token })
}

module.exports = { register, login }