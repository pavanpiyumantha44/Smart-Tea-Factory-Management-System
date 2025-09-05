import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const AuthFactory = () => ({

  hashPassword: async (password) => await bcrypt.hash(password, 10),

  comparePassword: async (password, hash) => await bcrypt.compare(password, hash),

  generateToken: (payload) =>
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1d" }),
});
