/* The URL variable is for storing the url of your server*/


let URL = "http://localhost:8080"

const loadTweets = () => {
  $.ajax({
    type: "GET",
    url: `${URL}/tweets`,
    success: function(data) {
      renderTweets(data)
    },
    error: function(errorMessage) {
      console.log(errorMessage)
    }
  })
}



const createTweetElement = (tweetData) => {
  /* The escape function avoid the execution of javascript
  code inserterd by a user in the textarea */
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  /* The format function provided by the timeago script
  receives the created_at of the new tweet as a parameter and 
  returns the time that has passed since the tweet was posted */
    
  const $tweet = `
  <article class="article-tweet">
      <header class="header-tweet">
        <div class="header-tweet-user">
          <img class="avatar" src="${tweetData.user.avatars}">
          <p> ${tweetData.user.name}  </p>
        </div>
          <p> ${tweetData.user.handle}  </p>
      </header>
          <p class="content-tweet"> ${escape(tweetData.content.text)} </p>
      <footer class="footer-tweet">
          <p class="time-tweet"> ${timeago.format(tweetData.created_at)} </p>
          <div class="icons-tweet">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
          </div>
      </footer>
  </article>
   `
  return $tweet
}



const renderTweets = function(tweets) {
    
  tweets.map((e) => {
  let tweet = createTweetElement(e)
  $("#tweets").append(tweet);
  })
   
}

const clearTextarea = () => {
  $("#tweet-text").val("")
    
}

const resetCounter = () => {
  $("output").first().html("140")
}
  

$(document).ready(function() {
  loadTweets() 

  $("form").submit((event) => {
      event.preventDefault() 
  
      
    if ($("#tweet-text").val() === "") {
        $("#errorMsg").html("<span>No content for your tweet!</span>")
    }
    if ($("#tweet-text").val().length > 140) {
        $("#errorMsg").html("<span>Your tweet is too long!</span>")
    }

    $("#tweet-text").on("keyup", () => {
      if($("#errorMsg span").length) $("#errorMsg span").remove()
    })

   if($("#tweet-text").val() !== "" && $("#tweet-text").val().length <= 140) {
    
      let formData = $("#tweet-text").serialize()

      $.ajax({
        type: "POST",
        url: "/tweets", 
        data: formData,
        success: function(data) {
          $.ajax({
            type: "GET",
            url: `${URL}/tweets`,
            success: function(data) {
              let newdata = data[0]
              let tweet = createTweetElement(newdata)
              $("#tweets").prepend(tweet);
            },
            error: function(errorMessage) {
              console.log(errorMessage)
            }
          })
        },
        error: function(errorMessage) {
          console.log(errorMessage)
        }
      })
        
      clearTextarea()
      resetCounter()
    }

  });

  
    
})

 
  

