(function ( $ ) {
  $.fn.moveImages = function(filename) {
    // Close your eyes for what follows might be terrible frontend code
    img_copy = $('#newest_image').clone();
    img_copy.removeAttr("id");

    // only add thumbnail if newest image has a source
    if($("#thumbnails ul li").size() == 0 && $('#newest_image').attr("href")) {
      $("#thumbnails ul").prepend("<li></li>");
      $("#thumbnails li").first().html(img_copy);
    }
    else if($("#thumbnails ul li").size() == 1) {
      oldFirstLi = $("#thumbnails li").first();
      newFirstLi = oldFirstLi.clone().prependTo(oldFirstLi.parent());
      newFirstLi.attr("class", "first");
      oldFirstLi.attr("class", "last");
      newFirstLi.html(img_copy);
    }
    else {
      oldFirstLi = $("#thumbnails li").first();
      //Remove the class attr of the first element
      oldFirstLi.removeAttr("class");

      // Remove the last list element if the limit is reached
      if($('#thumbnails ul li').size() > 6) {
        $("#thumbnails ul li").last().remove();
      }

      // Set the class of the new last element to "last"
      $("#thumbnails li").last().attr("class", "last");

      //Copy the big image to the thumbnails
      newFirstLi = oldFirstLi.clone().prependTo(oldFirstLi.parent());
      newFirstLi.attr("class", "first");
      newFirstLi.html(img_copy);
    }

    $('#newest_image').attr("href", "/screenshots/" + filename);
    $('#newest_image img').attr("src", "/screenshots/" + filename);
  };
}( jQuery ));
