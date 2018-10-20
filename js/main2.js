$('#toTop').on('click', function(event) {

  var target = $(this.getAttribute('href'));

  if (target.length) {
    event.preventDefault();
    $('html, body').stop().animate({
      scrollTop: target.offset().top
    }, 1000);
  }

});


var images = document.getElementById("divId").getElementsByTagName("span");

        for (var i = 0; i < images.length; i++) {
            images[i].onmouseover = function () {
                this.style.cursor = 'hand';
                this.style.borderColor = '#afafaf';
            }
            images[i].onmouseout = function () {
                this.style.cursor = 'pointer';
                this.style.borderColor = '#ddd';
            }
        }

        function changeImageOnClick(event)
        {
            event = event || window.event;
            var targetElement = event.target || event.srcElement;

            if(targetElement.tagName == "IMG")
            {
                mainImage.src = targetElement.getAttribute("src");
            }
        }
