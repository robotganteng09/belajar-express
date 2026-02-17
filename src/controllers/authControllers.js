import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// REGISTER
export const register = async (req, res) => {
  try {
    console.log("BODY:", req.body); // 🔥 DEBUG WAJIB

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Username, email, dan password wajib diisi",
      });
    }

    const user = await prisma.user.create({
      data: {
        username,
        email, // ✅ BUKAN String
        password,
      },
    });

    res.status(201).json({
      message: "Register berhasil",
      userId: user.id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
// LOGIN (USERNAME + PASSWORD)
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password wajib diisi" });
    }

    const user = await prisma.user.findFirst({
      where: {
        username: username,
        password: password,
      },
    });

    if (!user) {
      return res.status(401).json({ message: "Username atau password salah" });
    }

    res.json({
      message: "Login berhasil",
      userId: user.id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET USERS
export const getUsers= async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
