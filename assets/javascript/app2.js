$(function() {
	    populateButtons(comics, 'comicButton', '#comicButtons');

});


var comics = ["Robin Williams", "Steve Martin", "Steven Wright", "Mitch Hedberg", "Stephen Colbert", "Aziz Ansari", "Will Ferrell", "John Candy"];


//function to make buttons and add to page
function populateButtons(arrayToUse, classToAdd, areaToAddTo){
    $(areaToAddTo).empty();

    for (var i = 0; i < arrayToUse.length; i++){
        var a = $('<button>')
        a.addClass(classToAdd);
        a.attr('data-type', arrayToUse[i]);
        a.text(arrayToUse[i]);
        $(areaToAddTo).append(a);
    }

}

//When you click on the comic button
$(document).on('click', '.comicButton', function(){
    $('#addComic').removeClass('active');
    $(this).addClass('active');
//sets the type on the giphy search
    var type = $(this).data('type');
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({url: queryURL, method: 'GET'})
     .done(function(response) {
         var results = response.data;


//Loop that switches between still and animated
         for(var i=0; i < results.length; i++){
             var comicDiv = $('<div class="comic-item">')
//puts in the rating for the giphy
             var rating = results[i].rating;
             var p = $('<p>').text( "Rating: " + rating);

             var animated = results[i].images.fixed_height.url;
             var still = results[i].images.fixed_height_still.url;

             var comicImage = $('<img>');
             comicImage.attr('src', still);
             comicImage.attr('data-still', still);
             comicImage.attr('data-animate', animated);
             comicImage.attr('data-state', 'still')
             comicImage.addClass('comicImage');
//Made it prepend, so the user can see the new images once button is clicked
             comicDiv.prepend(p)
             comicDiv.prepend(comicImage)

             $('#comics').prepend(comicDiv);
         }
});
});

//switches the state, if it's still, it will animate and vice versa
$(document).on('click', '.comicImage', function(){
    var state = $(this).attr('data-state'); 
    
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})

//adds new comic by user
$('#addComic').on('click', function(){
    var newComic = $('input').eq(0).val();

    if (newComic.length > 2){
        comics.push(newComic);
    }

    populateButtons(comics, 'comicButton', '#comicButtons');

    return false;
});