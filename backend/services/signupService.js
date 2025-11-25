import {supabase} from '../config/supabaseClient.js';
import bcrypt from 'bcryptjs'

export const creatUser=async({username,email,password})=>{
  //1,check if user already exist
const {data:existingUser,error:userError
}= await  supabase.from('users').select("*").eq('email',email).single();
if(existingUser){
  throw new Error("user already exist")
}
//Hashe password
const hashedPassword=await bcrypt.hash(password,10);
//inser the new user
const {data:newUser,error:insertError}=await supabase.from("users").insert([
  {username,email,password:hashedPassword}
])
.select().single();
if(insertError){
  throw new Error(insertError.message);
}
//return created user to controller
return newUser;
};