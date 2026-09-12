import Book from "../models/bookstore.model.js";
import { validationResult } from "express-validator";

export const createData = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({ errors: errors.array() });
    }
    const book = await Book.create(req.body);

    return res.json({
      msg: "Book Published",
      data: book,
    });
  } catch (error) {
    console.error(error.msg);
    return res.json({
      msg: "Internal Server Error",
      error: error.msg,
    });
  }
};

export const getallData = async (req, res) => {
  try {
    const Search = req.query.search || "";

    let Sort = req.query.sort || "";
    let Sortval = 1;

    if (Sort === "desc") {
      Sortval = -1;
    }

    const book = await Book.find({
      title: { $regex: Search, $options: "i" },
    }).sort({ title: Sortval });

    return res.json(book);
  } catch (error) {
    console.log(error.msg);

    return res.json({
      msg: error.msg,
    });
  }
};

export const deleteData = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Book.findByIdAndDelete(id);

    return res.json({ msg: "book deleted", bookId: data.id });
  } catch (error) {
    console.log(error.msg);

    return res.json({ msg: error.msg });
  }
};

export const updateData = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await Book.findByIdAndUpdate(id, req.body);

    return res.json({ msg: "Book update", bookId: data.id });
  } catch (error) {
    console.log(error.msg);
    return res.json({ msg: error.msg });
  }
};