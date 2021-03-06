$(document).ready(function () {
// MENU
  function handleSmallScreens() {
    document.querySelector('.navbar-toggler')
      .addEventListener('click', () => {
        let navbarMenu = document.querySelector('.navbar-menu')

        if (navbarMenu.style.display === 'flex') {
          navbarMenu.style.display = 'none'
          return
        }

        navbarMenu.style.display = 'flex'
      })
  }

  handleSmallScreens()

  $('#logo').change( function(event) {
    var img = $('.logo')[0];
    var url = URL.createObjectURL(event.target.files[0]);
    img.src = url;
  })
});

