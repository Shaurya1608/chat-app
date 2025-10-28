import jwt from "jsonwebtoken";

export const generateToken = (userId , res) => {
    const {JWT_SECRET} = process.env;
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }


    const token = jwt.sign({userId}, JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        maxAge: 30*24*60*60*1000,
        httpOnly: true,// prevent access from client side
        sameSite: "strict",
        secure: process.env.NODE_ENV === "development" ? false : true,
    });

    return token;
};