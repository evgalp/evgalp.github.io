/**
 * Each Color Rect is a link <a>.
 * You nead to make these links clickable, each link should color its own container
 * into the color from data-color attribute.
 *
 * Link ".animate-all" should animate color switching of each container, from left to right with time interval of 2 seconds.
 */

const main = function(){
  let animationController = {
    _paintContainerByIdx: function (containerIdx, colorIdx) {
      containersArray[containerIdx].style.background = colors[colorIdx];
    },
    _animateContainerLoop: function (containerIdx) {
      let time = 2000;
      let timeShift = 1;

      for (var colorIdx = 0; colorIdx < colors.length; colorIdx++) {
        setTimeout(animationController._paintContainerByIdx.bind(null, containerIdx, colorIdx), time * timeShift);
        timeShift += 1;
      }
    },
    _getColors: function() {
      let colorListItems = containersArray[0].children[0].children[0].children;
      let colors = [];
      for (var i = 0; i < colorListItems.length; i++) {
        colors.push(colorListItems[i].firstChild.dataset.color);
      }
      colors.push('black');
      return colors;
    },
    allContainersLoop: function () {
      let time = 2000 * containersArray.length;
      let timeShift = 0;

      for (var containerIdx = 0; containerIdx < containersArray.length; containerIdx++) {
        setTimeout(animationController._animateContainerLoop.bind(null, containerIdx), time * timeShift);
        timeShift += 1;
      }
    },
    paintContainer: function(e) {
      let clickedColor = e.target.dataset.color;
      let closestContainer = e.target.closest('.container');
      closestContainer.style.background = clickedColor;
    }
  };

  const wrapper = document.getElementsByClassName('wrapper')[0];
  const animateAll = document.getElementsByClassName('animate-all')[0];
  const containersArray = document.getElementsByClassName('container');
  const colors = animationController._getColors();

  wrapper.addEventListener('click', animationController.paintContainer);
  animateAll.addEventListener('click', animationController.allContainersLoop);
}

window.onload = main();
