
$(document).ready(function () {

    // pausing giff
   

    // function animate(gif) {
        
    //             if (gif.attr("src") === gif.attr("data-old")) {
    //                 gif.attr("src", gif.attr("data-new"));
    //             } else if (gif.attr("src") === gif.attr("data-new")) {
    //                 gif.attr("src", gif.attr("data-old"));
    //             } else {
    //                 return
    //             }
    //         }
    //     $(".gif").on("click", function(){
    //         animate(gif);
    //     });
    
   // renderbutton 
    function renderButton(input) {
        var newBtn = $("<button>");
        newBtn.addClass("button-gif");
        newBtn.text(input);
        newBtn.attr("data-name", input);
        $(".button-container").append(newBtn);
    }
    // run ajax for new button

    function runGifs(userInput) {
        var input = $(this).attr("data-name") || userInput;
        $("#gifs").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=H5GT7A551s0Eqb73TvpjlcWJhmeuCrp5&q=" + input + "&limit=15&offset=0&rating=G&lang=en"
        $.ajax({
            url: queryURL,
            method: "get"
        }).done(function (response) {
            var data = response.data;
            console.log(data);
            for (var i = 0; i < data.length; i++) {
                var p = $("<p>").text("Rating: " + data[i].rating);
                console.log(data[i].rating);
                
                var newImg = $("<img>");
                
                
                newImg.attr("src", data[i].images.original.url);
                newImg.attr("data-still", data[i].images.original_still.url);
                
                newImg.attr("data-animate", data[i].images.original.url);
                newImg.attr("data-state", "still");
               
                newImg.addClass("imgClass");
                $("#gifs").append(p);
                $("#gifs").append(newImg);
               
                
            }
        });
        $("#user-input").val("");
    }

    $("#submit").on("click", function (event) {
        event.preventDefault();
        var userInput = $("#user-input").val();
        renderButton(userInput);
        runGifs(userInput);
    });
    $(document).on("click", ".button-gif", runGifs);
    
    $(document).on("click", ".imgClass", function() {
        // $(".imgClass").on("click", function(){
            var state = $(this).attr("data-state");
            if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
        });

});














