const express = require("express");
const { authenticateToken } = require("../middleware/auth");
const books = require("../data/users");

const router = express.Router();

router.put("/:isbn", authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const { review } = req.body;
  const user = req.user.username;

  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });

  books[isbn].reviews[user] = review;
  res.json({ message: "Review added/updated", reviews: books[isbn].reviews });
});


router.delete("/:isbn", authenticateToken, (req, res) => {
  const { isbn } = req.params;
  const user = req.user.username;

  if (!books[isbn]) return res.status(404).json({ message: "Book not found" });
  if (!books[isbn].reviews[user]) return res.status(403).json({ message: "Not your review" });

  delete books[isbn].reviews[user];
  res.json({ message: "Review deleted", reviews: books[isbn].reviews });
});

module.exports = router;
