import express from "express";
import bodyParser from "body-parser";
import _ from "lodash";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;


const homeStartingContent =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin placerat libero nec finibus sagittis. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse potenti. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed pulvinar ullamcorper est. Quisque eget imperdiet justo. In sed convallis purus. Morbi consequat in nisl sit amet dignissim.";

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }));

const posts = []

app.get("/", (req, res) => {
  res.render("home", {
    homeContent: homeStartingContent,
    posts
  });
});

app.get("/login", (req, res) => {
  res.render('login.ejs')
})

app.get("/about", (req, res) => {
  res.render('about');
});

app.get("/contact", (req, res) => {
  res.render("contact");
});


app.get("/compose", (req, res) => {
  res.render('compose')
})



app.get('/posts/:postID', (req, res) => { 
  let postID = parseInt(req.params.postID);
  const post = posts.find(p => p.id === postID);

  if (post) {
    res.render('post', {
      title: post.title,
      content: post.content
    });
  } else {
    res.redirect('/');
  }
});

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent
  const postObj = {
    id: Date.now(),
    title: postTitle,
    content: postContent
  }
  posts.push(postObj)
 
  res.redirect('/')
})

app.post('/delete/:postID', (req, res) => {
  const id = parseInt(req.params.postID);
  const index = posts.findIndex(post => post.id === id);

  if (index !== -1) {
    posts.splice(index, 1);
  }

  res.redirect('/');
});

app.get("/edit/:postID", (req, res) => {
  const id = parseInt(req.params.postID);
  const post = posts.find(p => p.id === id);
  if (post) {
    res.render("edit", { post });
  } else {
    res.redirect("/");
  }
});

app.put("/posts/:postID", (req, res) => {
  const id = parseInt(req.params.postID);
  const index = posts.findIndex(p => p.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Post not found" });
  }

  posts[index].title = req.body.title;
  posts[index].content = req.body.content;

  res.json({ message: "Post updated successfully" });
});



app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
