document.addEventListener('DOMContentLoaded', function () {
  const world = document.getElementById('world');

  window.addEventListener('scroll', function () {
    const scrollValue = window.scrollY;


    if (scrollValue < 5) {
      world.style.transform = `translateY(237vh)`;
      world.style.width = `400vh`;
      world.style.height = `400vh`;
    } else {
      if ((scrollValue / 9) < 239)
        world.style.transform = `translateY(calc(237vh - ${(scrollValue / 9)}vh))`;
    }


    if (scrollValue > 450) {
      // Escala hacia abajo
      if ((scrollValue / 450) < 4.6) {
        world.style.width = `calc(400vh / ${(scrollValue / 450)})`;
        world.style.height = `calc(400vh / ${(scrollValue / 450)})`;

      }
    }


  });
});
