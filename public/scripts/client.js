

const loadTweets = () => {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/tweets",
    success: function(data) {
      
    },
    error: function(errorMessage) {
      console.log(errorMessage)
    }
  })
  .then((data) => {
    renderTweets(data)
  })
}



const createTweetElement = (tweetData) => {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
    
    const $tweet = `
    <article class="article-tweet">
        <header class="header-tweet">
          <div class="header-tweet-user">
           <i class="fa-solid fa-user"></i>
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
    
        },
        error: function(errorMessage) {
          console.log(errorMessage)
        }
      })
      .then(() => {

        $.ajax({
          type: "GET",
          url: "http://localhost:8080/tweets",
          success: function(data) {
            
          },
          error: function(errorMessage) {
            console.log(errorMessage)
          }
        })
        .then((data) => {
          let newdata = data[0]
          let tweet = createTweetElement(newdata)
          $("#tweets").prepend(tweet);
        })
        
        
        
      })
        
      clearTextarea()
      resetCounter()
    }

  });

  
    
})

 
  

