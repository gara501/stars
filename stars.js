var points = (function () {
  var container = document.querySelector('.main');
  var containerWidth = container.clientWidth;
  var containerHeight = window.innerHeight-20;
  var tooltipEl = document.querySelector('.tooltip ul');
  var tooltipCont = document.querySelector('.tooltip');
  var startInterval = document.querySelector('.start');
  var stopInterval = document.querySelector('.stop');
  var generatedSolarSystemPlanets = false;
  var createElement = function(elem) {
    var el = document.createElement('div');
    el.className = elem;
    return el;
  };

  var planets = [{
    id: 1,
    name: 'Mercurio',
    texture: 'https://gara501.github.io/stars/textures/mercury.png',
    size: '0.1',
    length: '4.880 km',
    radius: '2.440 km',
    distance: '57.910.000',
    moons: '0',
    rotation: '58.6 dias',
    orbit: '87.97 dias',
    axis: '0 grados',
    incorbit: '7 grados'
  },
                {
    id: 2,
    name: 'Venus',
    texture: 'https://gara501.github.io/stars/textures/venus.jpg',
    size: '0.4',
    length: '12.104 km',
    radius: '6.052 km',
    distance: '108.200.000',
    moons: '0',
    rotation: '-243 dias',
    orbit: '224.7 dias',
    axis: '177.36 grados',
    incorbit: '3.39 grados'
  },
                {
    id: 3,
    name: 'Tierra',
    texture: 'https://gara501.github.io/stars/textures/tierra.jpg',
    size: '0.5',
    length: '12.756 km',
    radius: '6,378 km',
    distance: '149.600.000',
    moons: '1',
    rotation: '23.93 horas',
    orbit: '365 dias',
    axis: '23.45 grados',
    incorbit: '0 grados'
  },
                {
    id: 4,
    name: 'Marte',
    texture: 'https://gara501.github.io/stars/textures/mars.jpg',
    size: '0.3',
    length: '6.794 km',
    radius: '3.397 km',
    distance: '227.940.000',
    moons: '2',
    rotation: '24.62 horas',
    orbit: '686,98 dias',
    axis: '25,19 grados',
    incorbit: '1,85 grados'
  },
                {
    id: 5,
    name: 'Jupiter',
    texture: 'https://gara501.github.io/stars/textures/jupiter.jpg',
    size: '1.2',
    length: '142.984 km',
    radius: '71.492 km',
    distance: '778.330.000',
    moons: '16',
    rotation: '9.84 horas',
    orbit: '11,86 años',
    axis: '3,13 grados',
    incorbit: '1,31 grados'
  },
                {
    id: 6,
    name: 'Saturno',
    texture: 'https://gara501.github.io/stars/textures/saturn.jpg',
    size: '1',
    length: '108.728 km',
    radius: '60.268 km',
    distance: '1.429.400.000',
    moons: '18',
    rotation: '10,23 horas',
    orbit: '29,46 años',
    axis: '25.33 grados',
    incorbit: '2.49 grados'
  },
                {
    id: 7,
    name: 'Urano',
    texture: 'https://gara501.github.io/stars/textures/uranus.png',
    size: '0.4',
    length: '51.118 km',
    radius: '25.559 km',
    distance: '2.870.990.000',
    moons: '15',
    rotation: '17.9 horas',
    orbit: '84,01 años',
    axis: '97.86 grados',
    incorbit: '0,77 grados'
  },
                {
    id: 8,
    name: 'Neptuno',
    texture: 'https://gara501.github.io/stars/textures/neptune.jpg',
    size: '0.3',
    length: '49.532 km',
    radius: '24.746 km',
    distance: '4.504.300.000',
    moons: '8',
    rotation: '16.11 horas',
    orbit: '164.8 años',
    axis: '28.31 grados',
    incorbit: '1.77 grados'
  },
                {
    id: 9,
    name: 'Pluton',
    texture: 'https://gara501.github.io/stars/textures/pluto.jpg',
    size: '0.1',
    length: '2.320 km',
    radius: '1.160 km',
    distance: '5.913.520.000',
    moons: '1',
    rotation: '-6.39 dias',
    orbit: '248,54 años',
    axis: '122.72 grados',
    incorbit: '17,15 grados'
  },];
  var colors = [{
                 id: 1,
                 name: 'Alnitak',
                 color: '#f2c76b',
                 definition: 'Estrellas rojizas'
                },
                {
                 id: 2,
                 name: 'Rigel',
                 color: '#f2ce9c',
                 definition: 'Estrellas anaranjadas'
                },
                {
                 id: 3,
                 name: 'Sirio',
                 color: '#f8f2e6',
                 definition: 'Estrellas amarillo pálido'
                },
                {
                 id: 4,
                 name: 'Canopo',
                 color: '#f8f1e7',
                 definition: 'Estrellas amarillas '
                },
                {
                 id: 5,
                 name: 'Sol',
                 color: '#f6f6f8',
                 definition: 'Estrellas azul pálido'
                },
                {
                 id: 6,
                 name: 'Epsilon Eridani',
                 color: '#c1d1e8',
                 definition: 'Estrellas Azules'
                },
                {
                 id: 7,
                 name: 'Proxima Centauri',
                 color: '#abbbdc',
                 definition: 'Estrellas azules violaceas'
                }
               ];

  var getRandomPosition = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomColor = function() {
    return getRandomPosition(0, colors.length-1);
  }

  var getRandomOpacity = function() {
    return Math.random();
  }

  var getAnimation = function (left, top) {
    var midWidth = Math.round(containerWidth/2);
    var midHeight = Math.round(containerHeight/2);
    var topCuad = top > midHeight ? true: false;
    var widthCuad = left > midWidth ? true: false;
    var animation = 'fly';
    if (topCuad && widthCuad) {
     animation = 'flybl';
     //animation = 'elipse';
    }
    if (topCuad && !widthCuad) {
     animation = 'flybr';
      //animation = 'elipse';
    }
    if (!topCuad && widthCuad) {
     animation = 'flytr';
      // animation = 'elipse';
    }
    if (!topCuad && !widthCuad) {
     animation = 'flytl';
      // animation = 'elipse';
    }
    return animation;
  }

  var remark = function(point) {
    var remarkEl = document.querySelectorAll('.legend ul li');
    point.addEventListener('mouseover', function() {
      var ulId = parseInt(point.dataset.id, 10) - 1;
      remarkEl[ulId].style.color = 'red';
    });

    point.addEventListener('mouseout', function() {
      var ulId = parseInt(point.dataset.id, 10) - 1;
      remarkEl[ulId].style.color = point.dataset.color;
      point.classList.remove('elipse');
    });
  };

  var addListItem = function(text, value) {
    var listItem = document.createElement('li');
    var node = document.createTextNode(text + value)
    listItem.appendChild(node);
    return listItem;
  }

  var tooltip = function(element) {
    element.addEventListener('mouseover', function() {
     tooltipEl.innerHTML = '';
     var name = document.querySelector('.tooltip h3').innerText = element.dataset.name;
     var size = addListItem('Tamaño: ', element.dataset.length);
     tooltipEl.appendChild(size);
     var radius = addListItem('Radio Ecuatorial: ', element.dataset.radius);
     tooltipEl.appendChild(radius);
     var distance =  addListItem('Distancia al sol: ', element.dataset.distance);
     tooltipEl.appendChild(distance);
     var moons = addListItem('Lunas: ', element.dataset.moons);
     tooltipEl.appendChild(moons);
     var rotation = addListItem('Periodo de rotación: ', element.dataset.rotation);
     tooltipEl.appendChild(rotation);
     var orbit = addListItem('Orbita: ', element.dataset.orbit);
     tooltipEl.appendChild(orbit);
     var axis = addListItem('Inclinación del eje: ', element.dataset.axis);
     tooltipEl.appendChild(axis);
     var incorbit = addListItem('Inclinación orbital: ', element.dataset.incorbit);
     tooltipEl.appendChild(incorbit);
     tooltipCont.style.display = 'block';
    });

    element.addEventListener('mouseout', function() {
     tooltipEl.innerHTML = '';
     tooltipCont.style.display = 'none';
    });
  }

  var putPoint = function (point) {
    var leftPos = getRandomPosition(1, containerWidth);
    var topPos = getRandomPosition(1, containerHeight);
    var animation = getAnimation(leftPos, topPos);
    point.style.left = leftPos + "px";
    point.style.top = topPos + "px";
    point.classList.add(animation);
    container.appendChild(point);
    remark(point);
  };

  var putPlanet = function(planet, x, y) {
    planet.style.left = x + "%";
    planet.style.top = y + "%";
    container.appendChild(planet);
    tooltip(planet);
  }

  var solarSystem = {
    generateSolarSystem: function() {
     if (!generatedSolarSystemPlanets) {
      var count = 0;
      planets.map(function(planet) {
       var planetL = createElement('planet planet-texture');
       var x = 10 * count;
       var y = 7 * count;
       planetL.setAttribute('data-texture', planet.texture);
       planetL.setAttribute('data-name', planet.name);
       planetL.setAttribute('data-length', planet.length);
       planetL.setAttribute('data-radius', planet.radius);
       planetL.setAttribute('data-distance', planet.distance);
       planetL.setAttribute('data-moons', planet.moons);
       planetL.setAttribute('data-rotation', planet.rotation);
       planetL.setAttribute('data-orbit', planet.orbit);
       planetL.setAttribute('data-axis', planet.axis);
       planetL.setAttribute('data-incorbit', planet.incorbit);
       planetL.style.transform = 'scale(' + planet.size + ') rotate(20deg)';
       planetL.classList.add(planet.name);
       planetL.style.backgroundImage = 'url(' + planet.texture  + ')';
       putPlanet(planetL, x, y);
       count++;
      });
      }
      generatedSolarSystemPlanets = true;
    }

  };

  var newPoint =  {
    generatePoint: function() {
      var point = createElement('point');
      var color = getRandomColor();
      var opacity = getRandomOpacity();
      point.style.backgroundColor = colors[color].color;
      point.style.opacity = opacity;
      point.setAttribute('data-id', colors[color].id);
      point.setAttribute('data-color', colors[color].color);
      point.classList.add('fly');
      putPoint(point);
    },
    generateSky: function() {
      var self = this;
      startInterval.classList.remove('stopped');
      setInterval(function() {
        if (!startInterval.classList.contains('stopped')) {
          self.generatePoint();
        } else {
          clearInterval();
        }
      }, 10);
    },

    stop: function() {
      startInterval.classList.add('stopped');
    }
  };

  return {
   newPoint: newPoint,
   planets: solarSystem
  };

})();

var point = points.newPoint;
var planets = points.planets;
document.querySelector('.start').addEventListener('click', function() {
point.generateSky();
});

document.querySelector('.stop').addEventListener('click', function() {
point.stop();
});

document.querySelector('.solar').addEventListener('click', function() {
planets.generateSolarSystem();
});
