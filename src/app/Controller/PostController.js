const Post = require("../Models/Post");

class PostController {
  async createPost(req, res) {
    req.body.post.author = req.user._id;
    await Post.create(req.body.post)
    .then((post) => {
      console.log("post after create", post);
        //TODO retornar algo pro usuario de que foi criado
        return res.redirect("/posts");
    })
    .catch(err => { console.log("erro ao criar um post", err) })
  }

  async findPosts(req, res) {
    await Post.find({}).populate('author')
    .then(posts => {
        return res.render("index", {posts: posts, isLoggedIn: req.isAuthenticated()});
    })
    .catch(err => { console.log("erro ao buscar Posts", err) })
  }
  
  async findPostToShow(req, res) {
    findPost(req, res, false);
  }

  async findPostToEdit(req, res) {
    findPost(req, res, true);
  }

  async findPostByIdAndUpdate(req, res) {
    console.log("inside edit")
    await Post.findByIdAndUpdate(req.params.id, req.body.Post)
    .then(() => {
        //TODO retornar algo pro usuario de que foi editado
        return res.redirect("/posts/" + req.params.id);
    })
    .catch(err => { 
        console.log("erro ao editar um post", err); 
        return res.redirect("/posts/" + req.params.id);
    })
  }

  async findPostByIdAndRemove(req, res) {
    await Post.findByIdAndRemove(req.params.id)
    .then(() => {
        //TODO retornar algo pro usuario de que foi deletado
        return res.redirect("/posts");
    })
    .catch(err => { 
        console.log("erro ao remover um post", err)
        res.redirect("/posts"); 
    })
  }
}

async function findPost(req, res, isEdit) {
    await Post.findById(req.params.id)
    .then(foundPost => {
        if(isEdit) {
            return res.render("edit", {post: foundPost, isLoggedIn: req.isAuthenticated()});
        } else {
            return res.render("show", {post: foundPost, isLoggedIn: req.isAuthenticated()});
        }
    })
    .catch(err => { 
        console.log("erro ao buscar post", err)
        res.redirect("/posts"); 
    })
}

module.exports = new PostController();