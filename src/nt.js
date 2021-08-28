$(document).ready(function () {
  $('#logo').change( function(event) {
    var img = $('.logo')[0];
    var url = URL.createObjectURL(event.target.files[0]);
    img.src = url;
  })
});

function cardNumberFormat() {
  var _newVal = document.getElementById("cardNumber").value;

  var foo = _newVal.split(" ").join("");

  if (foo.length > 0) {
    foo = foo.match(new RegExp('.{1,4}', 'g')).join(" ");
  }

  document.getElementById("cardNumber").value = foo;
}

// MENU
function handleSmallScreens() {
  let navbarMenu = document.querySelector('.navbar-menu')

  if (navbarMenu.style.display === 'flex') {
    navbarMenu.style.display = 'none'
    return
  }

  navbarMenu.style.display = 'flex'
}
