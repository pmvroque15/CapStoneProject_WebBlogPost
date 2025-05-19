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
  res.render('about', 
  {
    aboutContent
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", 
  {
    contactContent
  });
});

app.get("/compose", (req, res) => {
  res.render('compose')
})

app.post("/compose", (req, res) => {
  const postTitle = req.body.postTitle
  const postContent = req.body.postContent
  const postObj = {
    title: postTitle,
    content: postContent
  }
  posts.push(postObj)
 
  res.redirect('/')
})



app.get('/posts/:postID', (req, res) => { 
  let postTitle = req.params.postID
  let postContent = ''  
  let title = ''        
  let currentContent = '' 

  posts.forEach((post) => {
    
    if(_.toLower(postTitle) === _.toLower(post.title)) {
      title = post.title
      currentContent = post.content  
    }
  })

  if(title) {  
    res.render(
      'post',
      {
        title,
        content: currentContent  
      })
  } else {
    res.redirect('/')  
  }
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
