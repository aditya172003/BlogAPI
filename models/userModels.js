
const mongoose = require("mongoose");
const bcrypt   = require('bcrypt')
const jwt      = require('jsonwebtoken')
const userSchema = mongoose.Schema(
  {
    
    name: {
      type: String,
      required: [true, "Please enter user name "],
    },
    email: {
      type: String,
      required: [true, "Please enter user email"],
    },
    phone:{
        type :String,
        required:[true,"Please enter user phone number"]
    },
    password:{
        type:String,
        required:[true,"Please enter user password"]
    },
    created_at    : { type: Date, required: true, default: Date.now }
     ,
    tokens:[{
        token:{
            type:String,
            required:true
        }
        }]
    
  },
  {
    timestamps: true,
  }
);




userSchema.methods.generateAuthToken  = async function(){
    try{  // this sectete key we have to keep secrete in env file 
    
           let token =jwt.sign({_id: this._id}, process.env.JWT_PASS);
          //  this.tokens=this.tokens.concat({token:token});
          //  await this.save();
           return token
           
    }catch(err){
         console.log(err);
    }
}


userSchema.pre('save',async function(next){
    if(this.isModified('password')){
         this.password=await bcrypt.hash(this.password,12)
    }
    next();
 })

 module.exports=mongoose.model('User',userSchema);
