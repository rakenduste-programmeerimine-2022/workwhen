const Bookmark = require("../models/Bookmark.model")

exports.add = async (req, res) => {
    Bookmark.add(req.body)
        .then((data) => res.send(`Success ${data}`))
        .catch((err) => res.send(`Oh no ${err}`))
}