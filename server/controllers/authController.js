import prisma from "../lib/prisma.js";
import { AuthFactory } from "../services/authFactory.js";

const authService = AuthFactory();

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!!" });
    }

    const account = await prisma.account.findUnique({
      where: { username },
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });

    if (!account) {
      return res.status(401).json({ success: false, message: "Invalid account!" });
    }

    const isMatch = await authService.comparePassword(password, account.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid password!" });
    }

    const token = authService.generateToken({
      id: account.user.personId,
      role: account.user.role.userRole,
    });

    return res.status(200).json({success: true,token,message: "Login Successfully",person: {
        personId: account.personId,
        username: account.username,
        personCode: account.user.personCode,
        firstName: account.user.firstName,
        lastName: account.user.lastName,
        role: account.user.role.userRole,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error " + error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { personId, username, password } = req.body;

    if (!personId || !username || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required!!" });
    }

    const hashedPassword = await authService.hashPassword(password);

    const existingAccount = await prisma.account.findFirst({
      where: { personId },
    });

    const existingUsername = await prisma.account.findUnique({
      where: { username },
    });

    if (existingAccount) {
      return res
        .status(401)
        .json({ success: false, message: "This person already has an account!" });
    }

    if (existingUsername) {
      return res
        .status(401)
        .json({ success: false, message: "This username already exists!" });
    }

    const newAccount = await prisma.account.create({
      data: {
        personId,
        username,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Account Created Successfully!",
      account: newAccount,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error " + error.message,
    });
  }
};

export { login, register };
