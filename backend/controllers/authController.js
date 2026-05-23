const db = require("../database/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    // GET DATA FROM FRONTEND
    const { name, email, password, role } = req.body;

    // CHECK EMPTY FIELDS
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // HASH PASSWORD
    const hashedPassword = await bcrypt.hash(password, 10);

    // INSERT USER INTO DATABASE
    db.run(
      `
      INSERT INTO users
      (
        name,
        email,
        password,
        role
      )
      VALUES (?, ?, ?, ?)
      `,
      [name, email, hashedPassword, role],
      function (err) {
        // DATABASE ERROR
        if (err) {
          // EMAIL ALREADY EXISTS

          if (err.message.includes("UNIQUE constraint failed")) {
            return res.status(400).json({
              message: "Email already registered",
            });
          }

          return res.status(500).json({
            message: err.message,
          });
        }

        // SUCCESS
        res.status(201).json({
          message: "User registered successfully",
        });
      },
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

// LOGIN USER
const loginUser = (req, res) => {
  // GET LOGIN DATA
  const { email, password } = req.body;

  // FIND USER
  db.get(
    `
    SELECT * FROM users
    WHERE email = ?
    `,
    [email],
    async (err, user) => {
      // USER NOT FOUND
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      // CHECK PASSWORD
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      // WRONG PASSWORD
      if (!isPasswordCorrect) {
        return res.status(400).json({
          message: "Wrong password",
        });
      }

      // CREATE JWT TOKEN
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      // SUCCESS RESPONSE
      res.json({
        message: "Login successful",
        token,
        user,
      });
    },
  );
};

module.exports = {
  registerUser,
  loginUser,
};
