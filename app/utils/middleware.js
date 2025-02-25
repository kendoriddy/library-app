import { verifyToken } from "../utils/auth";

export function authenticate(req) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return { error: "Unauthorized", status: 401 };
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);

  if (!decoded) {
    return { error: "Invalid token", status: 401 };
  }

  return { userId: decoded.id };
}
