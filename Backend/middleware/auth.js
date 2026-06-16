import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'supersecret_fallback';

export const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Format: "Bearer TOKEN"
    if (!token) return res.status(403).json({ message: "Un jeton d'authentification est requis" });

    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Jeton invalide ou expiré" });
  }
};

export const isRecruiter = (req, res, next) => {
  if (req.user && req.user.role === 'recruiter') {
    if (req.user.isApproved) {
      next();
    } else {
      res.status(403).json({ message: "Votre compte recruteur n'a pas encore été validé par un administrateur." });
    }
  } else {
    res.status(403).json({ message: "Accès refusé. Réservé aux recruteurs." });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé. Réservé aux administrateurs." });
  }
};
