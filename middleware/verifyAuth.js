const jwt = require('jsonwebtoken');

const authVerify=async(req,res,next)=>{
  const encodedToken=req.headers.authorization;
  const secret="SRINIBAS"
  try {
    const decoded = jwt.verify(encodedToken, secret);
    if (decoded) {
      return next();
    }
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}

module.exports=authVerify