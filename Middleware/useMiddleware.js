/////*****DAY-4 Controller****///
///Routing lavel middleware
const validated = (req, res, next) => {
    // const age = req.params.age;

    res.send("User")
    next();
    // const age = req.query.age
    // if (req.query.age >= 18) {
    // }
    // else{
    //     res.send("User Not Allowed")
    // }
    
}
module.exports = validated