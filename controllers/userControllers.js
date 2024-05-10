import cryptoHash from 'crypto';
import User from '../models/user.model.js';
import { signUpValidator } from '../user.validator.js';
import { formatZodError } from '../errorMessage.js';

 function hashValue(value) {
     const hash = cryptoHash.createHash('sha256');
     hash.update(value);
     return hash.digest('hex');
 }
 
  function comparePasswords(inputPassword, hashedPassword) {
     return hashValue(inputPassword) === hashedPassword;
   }
 

export const signUp = async (req, res) => {
    const registerResults = signUpValidator.safeParse(req.body)
    if (!registerResults) {
        return res.status(400).json(formatZodError(registerResults.error.issues))
    }
    try {
        const {userName, phoneNumber, email}=req.body 
        const user = await User.findOne({for:[{email},{phoneNumber},{userName}]})
        if (user) {
            res.status(409).json({messaage:'User with email already exists'})
        } else {
            const {
                name,
                userName,
                password,
                confirmPassword,
                email,
                phoneNumber,
                bio,
                gender
            } = req.body

             if (password !== confirmPassword) {
                 return res.status(403).json({ message: 'Password and confirmPassword do not match' });
              }   
            const encryption = hashValue(password, confirmPassword)
            const newUser = new User({
                name,
                userName,
                password: encryption,
                confirmPassword :encryption,
                email,
                phoneNumber,
                bio,
                gender
            })
            await newUser.save()
            res.status(200).json({message: 'User registered succesfully',newUser})
            console.log('User registered succesfully',newUser);
        }
    } catch (error) {
        res.status(500).json({message: error.message})
        console.log('INTERNAL SERVER ERROR',error.message)
    }
}




export default {signUp};