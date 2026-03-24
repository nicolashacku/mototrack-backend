import jwt from "jsonwebtoken";

export const authRequired = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

export const requireOwner = (req, res, next) => {
  if (req.user?.role !== "OWNER") {
    return res.status(403).json({ message: "Acceso solo para dueño" });
  }
  next();
};