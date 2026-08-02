import jwt from 'jsonwebtoken';

// Authenticate user token
export const protect = async (req, res, next) => {
  let token;

  // Check karo ki header mein Token hai ya nahi
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // "Bearer <token>" se actual token alag karo
      token = req.headers.authorization.split(' ')[1];

      // Token ko verify karo JWT Secret key se
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // User ki info (ID etc.) request object mein daal do
      req.user = decoded;

      // Sab sahi hai toh agle route/controller par jaane do
      next();
    } catch (error) {
      res.status(401).json({ message: 'Token sahi nahi hai, authorization denied!' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Koi token nahi mila, access denied!' });
  }
};