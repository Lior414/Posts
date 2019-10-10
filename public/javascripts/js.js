var isPostInEditMode = 0;
var postToEdit = 0;

$(document).ready(function(){
    getPostsFromServer();  
});

function getPostsFromServer(){
    $.get("/getAllPosts", function(dataFromServer, status){
        console.log(dataFromServer);
        renderPost(dataFromServer);
      });
}

function openNewPostPopup(){
    isPostInEditMode = 0;
    $("#editPostTitle").html("Add Post");
    $(".popup").show();
}

function editPost(id) {
    isPostInEditMode = 1;
    postToEdit = id;
    $("#editPostTitle").html("Edit Post");
    $(".popup").show();
};

function closePopup(){
    $("#title").val("");
    $("#text").val("");
    $("#img").val("");
    $(".popup").hide();
};

// function addPost(){
//     var title = $("#post_title").val();
//     var text = $("#post_text").val();
//     var image = $("#post_img").val();

//     let post = {
//         title: title,
//         text: text,
//         img: image
//     }
//     posts.push(post);
//     console.log(post);
//     closePopup();
//     getPosts();
// };

function renderPost(posts){
    var html = "";
    var like_class = "";
    var dislike_class = "";
    for(var i = 0; i < posts.length; i++){
        if(posts[i].like == 0){
            like_class = "";
            dislike_class = "";
        }
        if(posts[i].like == 1){
            like_class = "blue";
            dislike_class = "";
        }
        if(posts[i].like == 2){
            like_class = "";
            dislike_class = "red";
        }
        var post = "<div class='post'>";
            post += "<div class='title'>" + posts[i].title + "</div>";
            post += "<div class='text'>" + posts[i].text + "</div>";
            post += "<div class='img'><img src='"+ posts[i].image +"'/></div>";
            post += "<div class='bottom-bar'>";
            post += "<div class='like-dislike'><i class='fa fa-thumbs-up " + like_class + "' onclick='likePost(" + posts[i].id + ")'></i>|<i class='fa fa-thumbs-down " + dislike_class + "' onclick='dilikePost(" + posts[i].id + ")'></i></div>";
            post += "<div class='delete-edit'><i class='fa fa-cog' onclick='editPost(" + posts[i].id + ")'></i> | <i class='fa fa-trash' onclick='deletePost(" + posts[i].id + ")'></i> | ID: " + posts[i].id + "</div>";
            post += "</div>";
            post += "</div>";
        html += post;
    }
    $(".posts-list").html(html);
};

function deletePost(id){
    $.ajax({
        url: '/deletePost/'+id,
        type: 'DELETE',
        success: function(dataFromServer) {
            document.location.reload();
        }
    });
};

function likePost(id){
    $.ajax({
        url: '/likePost/'+id,
        type: 'GET',
        success: function(dataFromServer) {
            document.location.reload();
        }
    });
};

function dilikePost(id){
    $.ajax({
        url: '/dislikePost/'+id,
        type: 'GET',
        success: function(dataFromServer) {
            document.location.reload();
        }
    });
};



function editOrCreatePost(){
    if (isPostInEditMode==0) {
        $.ajax({
            url: '/addPost',
            type: 'POST',
            data: {
                "title": $('#title').val(),
                "text": $('#text').val(),
                "img": $('#img').val(),
            },
            success: function(dataFromServer) {
                document.location.reload();
            }
        });
    } else if (isPostInEditMode==1) {
        $.ajax({
            url: '/editPost/'+postToEdit,
            type: 'PUT',
            data: {
                    "id":$('#id').val(),
                "title": $('#title').val(),
                "text": $('#text').val(),
                "img": $('#img').val(),
            },
            success: function(dataFromServer) {
                document.location.reload();
            }
        });
    }
   
};