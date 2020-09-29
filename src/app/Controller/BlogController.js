const Blog = require("../Models/Blog");

class BlogController {
  async createPost(req, res) {
    await Blog.create(req.body.blog)
    .then((blog) => {
        //TODO retornar algo pro usuario de que foi criado
        return res.redirect("/blogs");
    })
    .catch(err => { console.log("erro ao criar um post", err) })
  }

  async findPosts(req, res) {
    await Blog.find({})
    .then(blogs => {
        return res.render("index", {blogs: blogs, isLoggedIn: req.isAuthenticated()});
    })
    .catch(err => { console.log("erro ao buscar blogs", err) })
  }
  
  async findPostToShow(req, res) {
    findPost(req, res, false);
  }

  async findPostToEdit(req, res) {
    findPost(req, res, true);
  }

  async findPostByIdAndUpdate(req, res) {
    await Blog.findByIdAndUpdate(req.params.id, req.body.blog)
    .then(() => {
        //TODO retornar algo pro usuario de que foi editado
        return res.redirect("/blogs/" + req.params.id);
    })
    .catch(err => { 
        console.log("erro ao editar um post", err); 
        return res.redirect("/blogs/" + req.params.id);
    })
  }

  async findPostByIdAndRemove(req, res) {
    await Blog.findByIdAndRemove(req.params.id)
    .then(() => {
        //TODO retornar algo pro usuario de que foi deletado
        return res.redirect("/blogs");
    })
    .catch(err => { 
        console.log("erro ao remover um post", err)
        res.redirect("/blogs"); 
    })
  }
}

async function findPost(req, res, isEdit) {
    await Blog.findById(req.params.id)
    .then(foundPost => {
        if(isEdit) {
            return res.render("edit", {blog: foundPost, isLoggedIn: req.isAuthenticated()});
        } else {
            return res.render("show", {blog: foundPost, isLoggedIn: req.isAuthenticated()});
        }
    })
    .catch(err => { 
        console.log("erro ao buscar post", err)
        res.redirect("/blogs"); 
    })
}

module.exports = new BlogController();