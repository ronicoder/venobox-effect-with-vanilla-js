// Polyfill (closest())
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}
// Polyfill ends

var links = document.querySelectorAll('.gallery_img-link');

document.body.addEventListener('click', function (e) {
  var button = e.target.closest('#close-box');

  if (button !== null) {
    document.body.removeChild(document.body.lastElementChild);
  }
});

for (var i = 0; i < links.length; i++) {
  links[i].addEventListener('click', function (e) {
    e.preventDefault();

    var url = this.getAttribute('href');
    viewImgBox(url);
  });
}

function viewImgBox(url) {
  var html =
    '<div class="box" id="box"><button class="close-box" id="close-box"><i class="fas fa-times"></i></button><div class="preloader"><span class="preloader_ball"></span><span class="preloader_ball"></span></div><div class="img-wrapper"><img src="' +
    url +
    '" alt=""></div></div>';

  document.body.insertAdjacentHTML('beforeend', html);

  setTimeout(function () {
    var box = document.getElementById('box');
    box.classList.add('is-visible');
  }, 0);
}
