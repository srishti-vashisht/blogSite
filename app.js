//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");                                /*Require lodash library, giving constant name as _ when using lodash */

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
var posts=[];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{homeContent: homeStartingContent,postDetails:posts});
                    
})

app.get("/contact",function(req,res){
  res.render("contact",{contactDetails:contactContent});
})

app.get("/about",function(req,res){
  res.render("about",{aboutContent:aboutContent });
})

app.get("/compose",function(req,res){
  res.render("compose");
});

/*Express routing parameters to tap into the url */

 /* tapping into dynamic url , The name of route parameters must be made up of “word characters” ([A-Za-z0-9_]), don't use - or . also*/

app.get("/posts/:anotherPost",function(req,res){                                  
  //  console.log(req.params.anotherPost);   

  //  for(var i=0 ; i<posts.length;i++){
  //  if(req.params.anotherPost===posts[i].title){
  //    console.log("Match Found");
  //    res.redirect("/");

  //  }
   
  // }

  const requestedTitle = _.lowerCase(req.params.anotherPost);                               /*converting requestedTitle to lowercase using lodash,kebab case also removed,day-1,day1,Day1,day 1 all will be treated same */
  
  posts.forEach(function(post){                                        /*Using for Each loop to loop into all title in posts arrray */
    const storedTitle = _.lowerCase(post.title);                        /*converting storedTitle's to lowercase case using lodash,Converts string, as space separated words, to lower case.*/
         
    if(requestedTitle === storedTitle)
    {
      res.render("post",{
        requestedTitle:_.upperFirst(post.title),        /*using lodash library to convert first letter of title to upper case */
        requestedContent:post.content});
    }                       
  })
   
})

app.post("/compose",function(req,res){

  
  
  var details={                                                     /*Javascript object */
    
    title: _.upperFirst(req.body.blogTitle),         /*_.upperFirst - converts the title's first letter to uppercase irrespective of what user has given,using lodash library*/
    content: req.body.blogContent

  }
  posts.push(details);
  res.redirect("/");
})














app.listen(3000, function() {
  console.log("Server started on port 3000");
});
