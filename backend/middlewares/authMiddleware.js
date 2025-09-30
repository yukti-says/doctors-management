//* adimin authentication middleware

import jwt from 'jsonwebtoken'
const authAdmin = async (req,res,next) => {
    try {
        //* logic for verifying the token
        // & get token from headers
        const { atoken } = req.headers
        if (!atoken) {
            return res.json({
                success: false,
                message:"Not Authorized Login again"
            })
        }
        //& decoding the token
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);

        //& after getting the decoded token in token_Decode variable that is going to be our email and password so we will check this also

        if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
            //* IF this does not match so-
            return res.json({
                success: false,
                message:"Invalid Token"
            })
        }

        //& but if token match then simply call the next() callback function
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

export default authAdmin;

//* next add this middleware in adminroute