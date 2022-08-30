const { Router } = require("express");
const { isValidObjectId } = require("mongoose");
const isLoggedIn = require("../middleware/isLoggedIn.middleware");
const FilmModel = require("../models/Film.model");
const UserModel = require("../models/User.model");

const filmRouter = Router();

filmRouter.get("/", (req, res) => {
  FilmModel.find({}).then((films) => {
    res.render("book/all", { films });
  });
});

filmRouter.get("/add", isLoggedIn, (req, res) => {
  res.render("user/watchlist");
});

filmRouter.post("/add", isLoggedIn, (req, res) => {
  console.log("ICH BIN ROUTE");
  const { title, description, authors, publisher, genre, nsfw, year } =
    req.body; //adapt to film model?

  // const authorArray = authors.split(",").map((author) => author.trim());

  FilmModel.create({
    title,
    authors: authorArray,
    publisher,
    nsfw,
    year,
    description,
    // genre,
  })
    .then((createdFilm) => {
      UserModel.findByIdAndUpdate(
        req.session.userId,
        {
          $push: { filmsCreated: createdFilm._id },
        },
        {
          new: true,
        }
      ).then((updatedUser) => {
        console.log("updatedUser:", updatedUser);
        res.render("user/watchlist", { createdFilm });
      });
    })
    .catch((err) => {
      console.log("Oopsie", err);
      // TODO: Do better error handling
      res.redirect("/");
    });
});

filmRouter.get("/:filmId", (req, res) => {
  const { filmId } = req.params;

  FilmModel.findById(filmId).then((book) => {
    res.render("book/single-book", { book });
  });
});

// bookRouter.get("/:bookId/request", isLoggedIn, (req, res) => {
//   res.render("book/request", { id: req.params.bookId });
// });

bookRouter.get("/:bookId/request", isLoggedIn, (req, res) => {
  const isValidBookId = isValidObjectId(req.params.bookId);

  if (!isValidBookId) {
    return res.status(404).redirect("/book/all");
  }

  BookModel.findById(req.params.bookId).then((possibleBook) => {
    if (!possibleBook) {
      return res.status(404).redirect("/book/all");
    }

    if (possibleBook.stock < 1) {
      return res
        .status(400)
        .redirect(`/book/${req.params.bookId}?error='basically sold out'`);
    }

    BookModel.findByIdAndUpdate(req.params.bookId, {
      $inc: { stock: -1 },
    }).then((updatedBook) => {
      UserModel.findByIdAndUpdate(req.session.userId, {
        $push: { booksRented: possibleBook._id },
      }).then(() => {
        res.redirect(`/user/${req.session.userId}`);
      });
    });
  });
});

bookRouter.get("/:bookId/return", isLoggedIn, async (req, res) => {
  const { bookId } = req.params;
  const isValidBookId = isValidObjectId(bookId);

  if (!isValidBookId) {
    return res.status(404).redirect("/book/all");
  }

  const { userId } = req.session;

  const possibleUser = await UserModel.findOne({
    _id: userId,
    $in: { booksRented: bookId },
  });

  if (!possibleUser) {
    return res.status(400).redirect("/book/all");
  }

  await UserModel.findByIdAndUpdate(userId, { $pull: { booksRented: bookId } });

  await BookModel.findByIdAndUpdate(bookId, { $inc: { stock: 1 } });
  // const book = await BookModel.findById(bookId);

  // await BookModel.findByIdAndUpdate(bookId, { stock: book.stock + 1 });

  res.redirect(`/user/${userId}`);

  // UserModel.findOne({
  //   _id: req.session.userId,
  //   $in: { booksRented: req.params.bookId },
  // }).then((possibleUser) => {
  //   if (!possibleUser) {
  //     return res.status(400).redirect("/book/all");
  //   }

  //   UserModel.findByIdAndUpdate(possibleUser._id, {
  //     $pull: { booksRented: req.params.bookId },
  //   }).then(() => {
  //     BookModel.findById(req.params.bookId).then((book) => {
  //       BookModel.findByIdAndUpdate(book._id, { stock: book.stock + 1 });
  //     });
  //   });
  // });
});

module.exports = bookRouter;
