const jwt =require('jsonwebtoken');
const JWT_SECRET_KEY='$#saurabhmahto28102002';
function setUser(user){
    const {username,email}=user;
    const payload ={
        username,
        email,
    };
    return jwt.sign(payload,JWT_SECRET_KEY);
}

function getUser(token){
if(!token)return null;
return jwt.verify(token,JWT_SECRET_KEY);
}
module.exports={
    setUser,
    getUser
}