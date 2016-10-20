var points = (function () {
  var container = document.querySelector('.main');
  var containerWidth = container.clientWidth;
  var containerHeight = window.innerHeight-20;
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
    scale: '0.1'
  },
                {
    id: 2,
    name: 'Venus',
    texture: 'https://gara501.github.io/stars/textures/venus.jpg',
    size: '0.4'
  },
                {
    id: 3,
    name: 'Tierra',
    texture: 'https://gara501.github.io/stars/textures/tierra.jpg',
    size: '0.5'
  },
                {
    id: 4,
    name: 'Marte',
    texture: 'https://gara501.github.io/stars/textures/mars.jpg',
    size: '0.3'
  },
                {
    id: 5,
    name: 'Jupiter',
    texture: 'https://gara501.github.io/stars/textures/jupiter.jpg',
    size: '0.9'
  },
                {
    id: 6,
    name: 'Saturno',
    texture: 'https://gara501.github.io/stars/textures/saturn.jpg',
    size: '0.8'
  },
                {
    id: 7,
    name: 'Urano',
    texture: 'https://gara501.github.io/stars/textures/uranus.png',
    size: '0.3'
  },
                {
    id: 8,
    name: 'Neptuno',
    texture: 'https://gara501.github.io/stars/textures/neptune.jpg',
    size: '0.3'
  },
                {
    id: 9,
    name: 'Pluton',
    texture: 'https://gara501.github.io/stars/textures/pluto.jpg',
    size: '0.1'
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

  var putPlanet = function(planet) {
    var leftPos = getRandomPosition(1, containerWidth);
    var topPos = getRandomPosition(1, containerHeight);
    planet.style.left = leftPos + "px";
    planet.style.top = topPos + "px";

    container.appendChild(planet);
  }

  var solarSystem = {
    generateSolarSystem: function() {
     if (!generatedSolarSystemPlanets) {
      planets.map(function(planet) {
       var planetL = createElement('planet planet-texture');
       planetL.setAttribute('data-texture', planet.texture);
       planetL.setAttribute('data-name', planet.name);
        planetL.style.transform = 'scale(' + planet.size + ')'
       planetL.classList.add(planet.name);
       planetL.style.backgroundImage = 'url(' + planet.texture  + ')';
       putPlanet(planetL);
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
