document.addEventListener('DOMContentLoaded', function () {
  // Prevenir que la página se desplace a la posición anterior
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const main = document.querySelector('main');
  const world = document.getElementById('world');
  const map = document.querySelector('section#home #world #map svg g');
  const bike = document.getElementById('bike');
  const bike_wrapper = document.getElementById('bike_wrapper');

  // Calcular la altura total de la página y el scroll máximo
  const totalHeight = document.body.scrollHeight;
  const maxScrollValue = totalHeight - window.innerHeight;

  window.addEventListener('scroll', function () {
    const scrollValue = window.scrollY;

    // Restaurar valores iniciales cuando el scroll está en la parte superior
    if (scrollValue === 0) {
      map.style.transform = `matrix(4, 0, 0, 4, 200, -600)`;
      world.style.transform = `translateY(${237}vh)`;
      world.style.width = `400vh`;
      world.style.height = `400vh`;
      bike_wrapper.style.height = `400vh`;
      bike_wrapper.style.rotate = `0deg`;
      bike.style.scale = `1`;
      return;
    }

    // Transformación translateY del mundo
    const maxWoldY = Math.min(237 * 9, scrollValue);
    world.style.transform = `translateY(calc(${237}vh - ${maxWoldY / 9}vh))`;

    // Tamaño del mundo y del contenedor de la bicicleta
    let worldScale;
    if (scrollValue <= 1565) {
      worldScale = Math.max(88, (1 - (scrollValue * 0.2) + 400));
    } else if (scrollValue > 1565 && scrollValue < 2600) {
      worldScale = 88;
    } else {
      // Ajustar el progreso para que worldScale llegue a 8 exactamente en maxScrollValue
      const progress = Math.min(1, (scrollValue - 2600) / (maxScrollValue - 2600));
      worldScale = 88 - (88 - 8) * progress;
      worldScale = Math.max(8, worldScale); // Asegura que no baje de 8
    }
    world.style.width = `${worldScale}vh`;
    world.style.height = `${worldScale}vh`;
    bike_wrapper.style.height = `${worldScale}vh`;

    const bikeScale = Math.max(0.5, Math.min(1, 1 - (scrollValue * 0.05) / 100));
    bike.style.scale = `${bikeScale}`;

    // Transformación del mapa y rotación de la bicicleta
    if (scrollValue <= 1565) {
      // Interpolación del mapa hasta scrollValue = 1565
      const progress = scrollValue / 1565;
      const scale = 4 + (1.1 - 4) * progress;
      const tx = 200 + (-259 - 200) * progress;
      const ty = -600 + (-259 - (-600)) * progress;
      map.style.transform = `matrix(${scale}, 0, 0, ${scale}, ${tx}, ${ty})`;

      // Rotación de la bicicleta
      const rotationAngle = (scrollValue / 2600) * 130;
      bike_wrapper.style.rotate = `${rotationAngle}deg`;

      // Controlar la opacidad de bike_wrapper
      bike_wrapper.style.opacity = rotationAngle >= 60 ? 0 : 1;

      // Cambiar el color de fondo basado en la rotación
      main.style.backgroundColor = rotationAngle >= 60 ? 'black' : '#245f7b';


    } else {
      // Mantener la proporción del mapa relativa a worldScale
      const scaleFactor = worldScale / 88; // Relación respecto a worldScale = 88
      const mapScale = 1.1 * scaleFactor; // Escala proporcional
      const mapPos = 259 * scaleFactor; // Posición proporcional
      map.style.transform = `matrix(${mapScale}, 0, 0, ${mapScale}, -${mapPos}, -${mapPos})`;

      // Continuar la rotación de la bicicleta
      const rotationAngle = (scrollValue / 2600) * 130;
      bike_wrapper.style.rotate = `${rotationAngle}deg`;
      bike_wrapper.style.opacity = rotationAngle >= 60 ? 0 : 1;

      // Última posición Y del mundo para scrollValue >= 2600
      if (scrollValue >= 2600) {
        const maxLastWoldY = Math.max(-27, Math.min(0, 1 - (scrollValue - 2600) * 0.02));
        world.style.transform = `translateY(${maxLastWoldY}vh)`;
      }
    }
  });
});