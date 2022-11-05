const { Schema, model } = require("mongoose")

const bookmarkSchema = new Schema(
    {
        category: {type: String },
        title: { type: String },
        link: { type: String },
        deleted: { type: Boolean, default: false}
    },
    { timestamps: true }
)

bookmarkSchema.statics.add = async ({ category, title, link }) => {
    return new Promise(async (resolve, reject) => {
        const bookmark = await Bookmark.findOne({ link }, { deleted: false})
        if(bookmark) reject(`Bookmark already exists under "${bookmark.title}"`)
        const newBookmark = new Bookmark({
            category,
            title,
            link
        })

        newBookmark.save((err) => {
            if(err) return reject(err)
            resolve(newBookmark)
        })
    })
}

bookmarkSchema.statics.remove = async ({ category, title, link }) => {
    return new Promise(async (resolve, reject) => {
        const bookmark = await Bookmark.findOne({ category, title, link }, { deleted: false})
        
    })
}

const Bookmark = model("Bookmark", bookmarkSchema)

module.exports = Bookmark