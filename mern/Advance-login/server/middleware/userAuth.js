import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const token = req.cookies.token; // Access the token directly

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "User not authorized or logged in",
    });
  }

  try {
    const tokenDecoded = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecoded.id) {
      req.body.userId = tokenDecoded.id; // Attach user ID to the request
      next(); // Proceed to the next middleware or route handler
    } else {
      return res
        .status(403)
        .json({
          success: false,
          message: "Not authorized, send the token again",
        });
    }
  } catch (e) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid token: " + e.message });
  }
};

export default userAuth;
