import jwt from 'jsonwebtoken';
import 'dotenv/config'

const authenticate = (req, res, next) => {
let token =  req.headers['authorization'] || req.headers['x-access-token'] ;
if(!token) {
  return res.status(401)
  .json({
    msg: 'please login to continue'
  })
}
if (token.startsWith('Bearer ')) {
  token = token.slice(7, token.length);
}

jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded)=> {
  if(err) {
    return res.status(401)
    .json({
      msg: 'token expired, please login again'
    })
  }
  req.user = decoded;
  next();
})
}


export default authenticate;
