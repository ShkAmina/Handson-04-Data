let arr = [];
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")
// const secretkey="hyyyyyy07"
// const { JsonWebTokenError } = require("jsonwebtoken");
const saltRound = 10

const register = async(req, res) => {
    const details = req.body;
    //    console.log(details)
    const comp = arr.find((item) => details.email === item.email)
    if (comp) {
        return res.send({ Msg: "User already register" })
    }
    // const hashPassword=bcrypt.hash(originalPasswaord,saltRound);
    // const generatesalt = bcrypt.genSaltSync(10)
    // console.log("Random Sting Generated :", generatesalt)

    const hashPassword = await bcrypt.hash(details.password, saltRound);
    const data = {
        name : details.name,
        phone : details.phone,
        email: details.email,
        password: hashPassword,
    };
    arr.push(data)
    const token=jwt.sign({email:details.email},process.env.secretkey,{expiresIn:"2d"})
    res.send({ Msg: "User is register", result: data,token:token })
}
const login = async (req, res) => {
    const details = req.body;
    const Match = arr.find((item) => details.email === item.email)
    if (!Match) {
        return res.send({ Msg: "User is Not Register....!" })
    }
    const validate = await bcrypt.compare(details.password, Match.password);
    if (!validate) {
        return res.status(401).send({ Msg: "User Password is Wrong" })
    }
    const token=jwt.sign({email:details.email},process.env.secretkey,{expiresIn:"2d"})
    return res.status(200).send({ Msg: "User is log in succesfully",token:token })
}

module.exports = { register, login }