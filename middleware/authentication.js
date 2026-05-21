import jwt from "jsonwebtoken";
import getEnv from "../config.js";

const accessToken = getEnv("accessToken");


const authentication = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  if (!authHeader) return res.status(401).json({message: "No token provided!!"});

  const token = authHeader.split(' ')[1] || '';
  const secret = accessToken;
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  }
  catch(error){
    res.status(401).json({message: "You you failed!"});
  }
}

export default authentication;