import jwt from 'jsonwebtoken';


export const protect = async (req, res, next) => {
  let token;

 
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      
      token = req.headers.authorization.split(' ')[1];

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      
      req.user = decoded;

      
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token sahi nahi hai, authorization denied!' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Koi token nahi mila, access denied!' });
  }
};
