import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const authentication = (req, res, next) => {
    const authToken = req.headers.authorization
    const token = authToken.split(" ")[1]
    jwt.verify(token, process.env.jwtsecretcode, async (error, decoded) => {
        if (error) {
            next(error);
        } else {
            req.body.user = decoded.data;
            next();
        }
    });

}


export default authentication;