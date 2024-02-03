const jwt = require("jsonwebtoken");

const verifyUser = (req, res, next) => {
    try {
      
      const token = req.cookies.token;
  
      if (!token) {
        return res.status(401).json({
          message: 'Unauthorized: Missing token',
        });
      }
  
     const decoded = jwt.verify(token, "Nucmaan"); 
  
      req.email = decoded.email; 
      req.fullname = decoded.fullname;
  
      next();
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized: Invalid token',
      });
    }
  };

  module.exports = verifyUser;