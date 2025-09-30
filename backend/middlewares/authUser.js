//* user authentication middleware

import jwt from 'jsonwebtoken'
const authUser = async (req,res,next) => {
    try {
        //* logic for verifying the token
        // & get token from headers
        const { token } = req.headers
        if (!token) {
            return res.json({
                success: false,
                message:"Not Authorized Login again"
            })
        }
        //& decoding the token
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

         req.body.userId = token_decode.id
        
       next()

    }
    catch (error) {
        console.log(error);
        res.json({
            success: false,
            message:error.message
        })
        
    }
}

export default authUser;

//* next add this middleware in adminroute