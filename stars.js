var points = (function () {
  var container = document.querySelector('.main');
  var containerWidth = container.clientWidth;
  var containerHeight = window.innerHeight-20;
  var startInterval = document.querySelector('.start');
  var stopInterval = document.querySelector('.stop');
  var createPoint = function() {
    var el = document.createElement('div');
    el.className = "point";
    return el;
  };

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
    }
    if (topCuad && !widthCuad) {
     animation = 'flybr';
    }
    if (!topCuad && widthCuad) {
     animation = 'flytr';
    }
    if (!topCuad && !widthCuad) {
     animation = 'flytl';
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

  var newPoint =  {
    generatePoint: function() {
      var point = createPoint();
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
   newPoint: newPoint
  };

})();

var point = points.newPoint;
document.querySelector('.start').addEventListener('click', function() {
point.generateSky();
});

document.querySelector('.stop').addEventListener('click', function() {
point.stop();
});