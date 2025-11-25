import {creatUser} from "../services/signupService.js";

 const signupUser=async(req,res)=>{
    try{
        //receives user data
        const {username,email,password}=req.body;
    //validate input
    if(!username||!password||!email){
     return res.status(400).send({
        message:"All fields are required"
     })
    }
 //call services (where allreal logic happens)
 const result=await creatUser({username,email,password})
 //respond to client
 res.status(201).json({
    message:"user created successfully"
 })

}catch(err){
 res.status(500).json({message:err.message})
}
}
export default signupUser;