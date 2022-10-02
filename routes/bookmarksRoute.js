const EXPRESS = require("express");
const ROUTER = EXPRESS.Router();
const BOOKMARKSCONTROLLER = require("../controllers/bookmarksController");
const { ensureAuth } = require('../middleware/auth')

ROUTER.get("/", ensureAuth, BOOKMARKSCONTROLLER.getBookmarks);
ROUTER.post("/addBookmark", BOOKMARKSCONTROLLER.addBookmark);
ROUTER.put("/changeBookmarkName", BOOKMARKSCONTROLLER.changeBookmarkName);
ROUTER.delete("/deleteBookmark", BOOKMARKSCONTROLLER.deleteBookmark);

module.exports = ROUTER;