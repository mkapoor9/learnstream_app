export const authContext = (req, res, next) => {
  const userId = req.headers["x-user-id"];
  const email = req.headers["x-user-email"];

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = { id: userId, email };
  next();
};