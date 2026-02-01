const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// REGISTER
exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username dan password wajib diisi" });
    }

    const user = await prisma.user.create({
      data: {
        username,
        password, // tanpa hash
      },
    });

    res.json({
      message: "Register berhasil",
      userId: user.id,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// LOGIN (USERNAME + PASSWORD)
exports.login = async (req, res) => {
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
exports.getUsers = async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
};
