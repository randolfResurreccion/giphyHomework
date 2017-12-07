
$(document).ready(function () {

    // renderbutton 
    function renderButton(input) {
        var newBtn = $("<button>");
        newBtn.addClass("gif");
        newBtn.text(input);
        newBtn.attr("data-name", input);
        $(".button-container").append(newBtn);
    }
    // run ajax for new button

    function runGifs(userInput) {
        var input = $(this).attr("data-name") || userInput;
        $("#gifs").empty();
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=H5GT7A551s0Eqb73TvpjlcWJhmeuCrp5&q=" + input + "&limit=10&offset=0&rating=G&lang=en"
        $.ajax({
            url: queryURL,
            method: "get"
        }).done(function (response) {
            var data = response.data;
            for (var i = 0; i < data.length; i++) {
                var newImg = $("<img>");
                newImg.attr("src", data[i].images.downsized.url);
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
    $(document).on("click", ".gif", runGifs);

});














