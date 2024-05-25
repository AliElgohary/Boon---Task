import pool from "../../../../db/initConnection";
import { Request, Response, NextFunction } from "express";
import User from "../../../../db/models/user.model";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT * FROM users");
    connection.release();
    res.status(200).json({ message: "success", data: rows });
  } catch (err) {
    console.error("Error retrieving users:", err);
    res.status(500).json({ message: "Error retrieving users" });
  }
};


export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newUser: User = {
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    phoneNumber: req.body.phoneNumber,
  };

  try {
    const connection = await pool.getConnection();
    await connection.query(
      `INSERT INTO users (name, email, age, phoneNumber) VALUES (?, ?, ?, ?)`,
      [newUser.name, newUser.email, newUser.age, newUser.phoneNumber]
    );
    connection.release();
    res.locals.user = newUser;
    next();
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ message: "Error creating user", err: err });
  }
};
