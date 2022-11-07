const { Schema, model } = require("mongoose")

const bookmarkSchema = new Schema(
    {
        category: {type: String },
        title: { type: String },
        description: { type: String },
        link: { type: String },
        deleted: { type: Boolean, default: false}
    },
    { timestamps: true }
)

bookmarkSchema.statics.add = async ({ category, title, description, link }) => {
    return new Promise(async (resolve, reject) => {
        const bookmark = await Bookmark.findOne({ link }, { deleted: false})
        if(bookmark) reject(`Bookmark already exists under "${bookmark.title}"`)
        else {
            const newBookmark = new Bookmark({
                category,
                title,
                description,
                link
            })
    
            newBookmark.save((err) => {
                if(err) return reject(err)
                resolve(newBookmark)
            })
        }
    })
}

bookmarkSchema.statics.remove = async ({ category, title, link }) => {
    return new Promise(async (resolve, reject) => {
        const bookmark = await Bookmark.findOne({ category, title, link }, { deleted: false})
        if(!bookmark) reject("Bookmark doesn't exist!")
        else {
            bookmark.deleted = true
            bookmark.save((err) => {
                if(err) return reject(err)
                resolve("Bookmark successfully deleted!")
            })
        }
    })
}

bookmarkSchema.statics.all = async () => {
    return new Promise(async (resolve, reject) => {
        const bookmarks = await Bookmark.find({ deleted: false }, "-_id category title link", {})
        resolve(bookmarks)
    })
}

const Bookmark = model("Bookmark", bookmarkSchema)

module.exports = Bookmark