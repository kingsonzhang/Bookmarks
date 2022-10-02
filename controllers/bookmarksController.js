const BOOKMARKS = require("../models/bookmarksModel");

module.exports = {
    getBookmarks: async(req, res) =>{
        try{
            const ITEMS = await BOOKMARKS.find({userID:req.user.id});
            res.render("bookmarks.ejs", {
                userName: req.user.userName,
                links : ITEMS
            })
        }
        catch(err){
            console.log(err);
        }
    },
    addBookmark: async (req, res) =>{
        try{
            await BOOKMARKS.create({
                userID: req.user.id,
                name: req.body.linkName,
                link: req.body.URL
            });
            res.redirect("/bookmarks");
        }
        catch(err){
            console.log(err);
        }
    },
    changeBookmarkName: async (req, res)=>{
        try{
            console.log(req.body);
            await BOOKMARKS.findOneAndUpdate({_id: req.body.postID},{
                name: req.body.bookmarkName
            })
            res.json('Bookmark Updated');
        }catch(err){
            console.log(err)
        }
    },
    deleteBookmark: async (req, res) =>{
        try{
            console.log(req.body.linkName);
            await BOOKMARKS.deleteOne({name : req.body.linkName});
            res.json("Item deleted");
        }
        catch(err){
            console.log(err);
        }
    }
}