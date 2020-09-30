const SavedPosts = require("../Models/SavedPosts");

class SavedPostsController {
    async savePost(req, res) {  
        const post = {author: req.user._id, post: req.params.postID}
        await SavedPosts.create(post)
        .then((post) => {
            console.log("post after create", post);
            //TODO retornar algo pro usuario de que foi criado
            return res.redirect("/posts");
        })
        .catch(err => { console.log("erro ao salvar um post", err) })
    }
}

module.exports = new SavedPostsController();