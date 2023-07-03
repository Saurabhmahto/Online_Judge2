const User =require('../models/user');

async function handleUserSignup(req,res){
    const {username,email,password}=req.body;
    if(!username){
       return  res.status(400).json({
            success:"false",
            msg:"username required",
        })
    }
    if(!email){
        return  res.status(400).json({
             success:"false",
             msg:"email id required",
         })
     }
     if(!password){
        return  res.status(400).json({
             success:"false",
             msg:"password required",
         })
     }
    try {
        const user =await User.create({
            username,
            email,
            password
        });
        return res.status(200).json({
            success:"true",
            user,
        });
    } catch (error) {
        if(error.code===11000){
           return res.status(400).json({
                success:"false",
                msg:"user already exits",
                res:error,
            })
        }
        return res.status(400).json({
            success:"false",
            msg:"user not created ",
            res:error,
        });
    }
   
}
async function handleUserLogin(req,res){
    const {username,password}=req.body;
    if(!username){
        return  res.status(400).json({
             success:"false",
             msg:"username required",
         })
     }
      if(!password){
         return  res.status(400).json({
              success:"false",
              msg:"password required",
          })
      }
      try {
        const user =await User.findOne({
            username,
            password
        });
        if(!user){
            return res.status(400).json({
                success:"false",
                msg:"username or password invalid",
            })
        }
        return res.status(200).json({
            success:"true",
            user,
        });
      } catch (error) {
        console.log(error);
      }
   ;
}
module.exports={
    handleUserSignup,
    handleUserLogin,
}