
$("#tweet-text").on("input",function() {
    const characters = this.value.length
    const counter = $("output").first()

    let r = 140 - characters
    
    counter.html(`${r}`)
    
    if (r < 0) {
        $(counter).addClass("negative")
    }
    if (r >= 0) {
        $(counter).removeClass("negative")
    }
}) 

