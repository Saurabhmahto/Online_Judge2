const JWT_SECRET_KEY='$#saurabhmahto28102002';
const jwt =require('jsonwebtoken');

function authenticate(req,res,next){
const token =req.headers['x-access-token'];
if(!token)return res.status('400').json({
    status:'error',
    msg:'Please Log in or refresh',
});
try {
const user =jwt.verify(token,JWT_SECRET_KEY);
const {username} =jwt.decode(token);
req.user=username;
// console.log(username);
} catch (error) {
    return res.status(400).json({
        status:'error',
        msg:'Please Log in or refresh',
    });
}
next();
}

module.exports={
    authenticate,
}