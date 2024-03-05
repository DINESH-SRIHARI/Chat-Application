const User =require('../Models/User')
const bcrypt=require('bcrypt')
module.exports.register=async(req,res,next)=>{
    try {
        const { username, email, password } = req.body;
        const usernameCheck = await User.findOne({ username });
        if(usernameCheck){
            return res.json({ msg: "Username already used", status: false });
        }
        const emailCheck = await User.findOne({ email });
        if(emailCheck){
            return res.json({ msg: "Email already used", status: false });
        }
        const hashedpass=await bcrypt.hash(password,10)
        const newuser=await User.create({
            username,
            email,
            password:hashedpass,
        })
        delete newuser.password;
        return res.json({ status: true,newuser});

    } catch (error) {
        next(error)
    }
}
module.exports.login=async(req,res,next)=>{
    try {
        
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if(!user){
            return res.json({ msg: "Username does not exist already", status: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });

    } catch (error) {
        next(error)
    }
}
module.exports.setAvat=async(req,res,next)=>{
    
    try {
        const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });

    } catch (error) {
        next(error)
    }
}
module.exports.allusers=async(req,res,next)=>{
    
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
          ]);
          return res.json(users);

    } catch (error) {
        next(error)
    }
}