
/* This function change the counter numbers color to red
when the counter number is negative and turn it back to 
gray when it is positive*/

$("#tweet-text").on("input",function() {
    const characters = this.value.length
    const counter = $("output").first()

    let availableCharacters = 140 - characters

    counter.html(`${availableCharacters}`)

    if (availableCharacters < 0) {
        $(counter).addClass("negative")
    }
    if (availableCharacters >= 0) {
        $(counter).removeClass("negative")
    }
}) 
