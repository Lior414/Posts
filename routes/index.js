var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test1'
})

var posts = [];
var last_id = 0;

router.get('/', function(req, res, next){
  res.send('home');
})

router.get('/getAllPosts', function(req, res, next){
  connection.query(`SELECT * FROM posts`, function (err,posts){
    if (err) throw (err);
    console.log(err)
    console.log("result:", posts);
    res.json(posts);
    //res.redirect('/')
  });
  
})

router.post('/addPost', function(req, res, next){
      var title = req.body.title;
      var text = req.body.text;
      var image = req.body.img;
      var like = 0;

      connection.query(`INSERT INTO posts (title, text, image) VALUES ('${title}','${text}','${image}')`, function (err, result){
        if(err) throw (err);
        console.log("result after add post", result);
        posts.push(result);
        res.send('post added');
      });    
});

// router.get('/likePost/:id', function(req, res, next){
//   var idFromClient = req.params.id;
//   for( var i = 0; i < posts.length ; i++){
//     if(posts[i].id == idFromClient){
//       posts[i].like = 1;
//     }
//   }
//   res.send('like');  
// })

// router.get('/dislikePost/:id', function(req, res, next){
//   var idFromClient = req.params.id;
//   for( var i = 0; i < posts.length ; i++){
//     if(posts[i].id == idFromClient){
//       posts[i].like = 2;
//     }
//   }
//   res.send('dislike');  
// })

router.delete('/deletePost/:id', function(req, res, next){
  let id = req.params.id;

  connection.query(`DELETE FROM posts WHERE id = '${id}'`, function (err, result){
    if(err) throw (err);
    console.log("post updated", result);
    res.send('post deleted');
  });  
  // for( var i = 0; i < posts.length ; i++){
  //     if( posts[i].id == idFromClient ){
  //         posts.splice(i,1);
  //     }
  // }
  // res.send('success'); 
});

router.put('/editPost/:id', function(req, res, next){
  
  let id = req.params.id;
  var title = req.body.title;
  var text = req.body.text;
  var image = req.body.img;

  connection.query(`UPDATE posts SET title='${title}',text='${text}',image='${image}' WHERE id = '${id}'`, function (err, result){
    if(err) throw (err);
    console.log("post updated", result);
    res.send('post added');
  });
  // var idFromClient = req.params.id;
  // for( var i = 0; i < posts.length ; i++){
  //   if( posts[i].id == idFromClient ){
  //     var newTitle = req.body.title;
  //     var newText = req.body.text;
  //     var newImage = req.body.img;

  //     posts[i].title = newTitle;
  //     posts[i].text = newText;
  //     posts[i].image = newImage;

    //  res.redirect('/');
  //   }
  // }  
  // res.send('success'); 
 })

module.exports = router;