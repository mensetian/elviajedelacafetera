document.addEventListener('DOMContentLoaded', function () {

  // This prevents the page from scrolling down to where it was previously.
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  // This is needed if the user scrolls down during page load and you want to make sure the page is scrolled to the top once it's fully loaded. This has Cross-browser support.
  window.scrollTo(0, 0);

  const world = document.getElementById('world');
  const map = document.querySelector('section#home #world #map svg g');
  const bike = document.getElementById('bike');
  const bike_wrapper = document.getElementById('bike_wrapper');

  window.addEventListener('scroll', function () {
    const scrollValue = window.scrollY;

    // Restore initial values when scroll is at the top
    if (scrollValue === 0) {
      //world
      // map.style.transform = `matrix(${1.3}, ${0}, ${0}, ${1.15}, ${-378}, ${-366})`;    
      map.style.transform = `matrix(2.5, 0, 0, 2.5, -259, -259)`;
      world.style.transform = `translateY(${237}vh)`;
      world.style.width = `400vh`;
      world.style.height = `400vh`;
      world.style.backgroundColor = `#476338`;
      bike_wrapper.style.height = `400vh`;

      return; // Exit the function to avoid executing the rest of the code
    }

    // Handle world translateY transformation
    const maxWoldY = Math.min(237 * 9, scrollValue);
    world.style.transform = `translateY(calc(${237}vh - ${maxWoldY / 9}vh))`;


    //worde size and wrapper bike same
    const worldScale = Math.max(88, (1 - (scrollValue * 0.2) + 400));
    world.style.width = `${worldScale}vh`;
    world.style.height = `${worldScale}vh`;

    bike_wrapper.style.height = `${worldScale}vh`;

    const bikeScale = Math.max(0.5, Math.min(1, 1 - (scrollValue * 0.05) / 100));
    bike.style.scale = `${bikeScale}`;

    const mapScale = Math.max(1.1, (1 - (scrollValue * 0.001) + 1.5));
    map.style.transform = `matrix(${mapScale}, 0, 0, ${mapScale}, -259, -259)`;



    // Handle scaling down based on scrollValue after Y value 450
    if (scrollValue < 2600) {

      const worldScaleRatio = Math.min(400 / 88, scrollValue / 450);
      const bikeRotateRatio = (Math.pow(((worldScaleRatio - 2.5) * 100), 1.09)) / 2;

      
      if (worldScaleRatio >= 2.5) {
        console.log(worldScaleRatio);
        //bike rotation control
        bike_wrapper.style.rotate = `${bikeRotateRatio}deg`;

        if (bikeRotateRatio >= 125) {
          bike_wrapper.style.opacity = 0;
          world.style.backgroundColor = `#19435f`;
        } else {
          bike_wrapper.style.opacity = 1;
          world.style.backgroundColor = `#476338`;

        }

      } else {
        //reset
        bike_wrapper.style.rotate = `0deg`;
      }

    } else if (scrollValue > 2600) {
      //last size
      const maxLastWoldSize = Math.max(8, 88 - (scrollValue - 2600) * 0.045);
      world.style.width = `${maxLastWoldSize}vh`;
      world.style.height = `${maxLastWoldSize}vh`;

      const mapPos = Math.max(15, 259 - (scrollValue - 2600) * 0.14);
      const mapScale = Math.max(0.08, 1.1 - (scrollValue - 2600) * 0.00058);
      map.style.transform = `matrix(${mapScale}, 0, 0, ${mapScale}, -${mapPos}, -${mapPos})`;

      //last y
      const maxLastWoldY = Math.max(-27, Math.min(0, 1 - (scrollValue - 2600) * 0.02));
      world.style.transform = `translateY(${maxLastWoldY}vh)`;
    }



  });
});
