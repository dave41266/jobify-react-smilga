import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid #1");
  }
  let token = authHeader.split(" ")[1];

  // when get token from local storage it has leading and
  // trailing quotes, so remove them or else jwt.verify will fail
  // let a = token.split('"');
  // if (a[1]) {
  //   token = a[1];
  //   //console.log(`a[0]: ${a[0]}`);
  //   //console.log(`a[1]: ${a[1]}`);
  // }
  console.log(token);
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid #2");
  }
};

export default auth;
