var initBanner = (function (){
  var getVariables = function () {
    var banner = document.getElementById('banner');
    var rangeContainer = banner.querySelector('.range-container');
    var range = rangeContainer.querySelector('.range-container__range');
    var assetsList = document.querySelector('.assets');
    var images = assetsList.querySelectorAll('.asset');
    var innerAssets = assetsList.querySelectorAll('.asset-inner');
    var assetInner = assetsList.querySelector('.asset-inner');
    var player = assetsList.querySelector('#player');
    var featureText = banner.querySelectorAll('.feature__caption');
    var dropsContainer = banner.querySelector('#drops-container');

    var variablesObj = {banner, rangeContainer, range, assetsList, images, innerAssets, assetInner, player, featureText, dropsContainer};

    return variablesObj;
  }

  var configureRange = function (range) {
    range.setAttribute("min", 0);
    range.setAttribute("max", 58);
    range.setAttribute("step", 1);
    range.setAttribute("value", 0);
  }

  return {getVariables, configureRange}
})();

var changeBanner = (function(){
  var imageChange = function (range, images){
    for (i = 0; i < images.length; i++){
      if(range.value == images[i].dataset.asset){
        images[i].classList.add('asset--active');
      } else {
        images[i].classList.remove('asset--active');
      }
    }
  }

  var changeText = function (range, featureText){
    if (range.value < 15) {
      featureText[0].classList.add('feature__caption--active');
      featureText[1].classList.remove('feature__caption--active');
      featureText[2].classList.remove('feature__caption--active');
      featureText[3].classList.remove('feature__caption--active');
    } else if (range.value >= 15 && range.value < 30) {
      featureText[1].classList.add('feature__caption--active');
      featureText[0].classList.remove('feature__caption--active');
      featureText[2].classList.remove('feature__caption--active');
      featureText[3].classList.remove('feature__caption--active');
    } else if (range.value >= 30 && range.value < 45) {
      featureText[2].classList.add('feature__caption--active');
      featureText[0].classList.remove('feature__caption--active');
      featureText[1].classList.remove('feature__caption--active');
      featureText[3].classList.remove('feature__caption--active');
    } else if (range.value >= 45 && range.value < 58) {
      featureText[3].classList.add('feature__caption--active');
      featureText[0].classList.remove('feature__caption--active');
      featureText[1].classList.remove('feature__caption--active');
      featureText[2].classList.remove('feature__caption--active');
    }
  }

  function changeInnerAsset(range, assetInner, innerAssets, player) {
    if (range.value == 58) {
      setTimeout(function(){
        assetInner.classList.add('asset-inner--active');
      }, 0)
    } else if (range.value == 0) {
      player.classList.add('asset-inner--active');
    } else {
      for (var i = 0; i < innerAssets.length; i++) {
        innerAssets[i].classList.remove('asset-inner--active');
      }
    }
  }

  return {imageChange, changeText, changeInnerAsset};
})();

var rain = (function(){
  var dropsContainer = document.getElementById('drops-container');
  var isRaining = false;
  var dropsArray = [];
  var rainDropTimer;

  var generateDrop = function() {
    var drop = document.createElement('div');
    dropsArray.push(drop);
    drop.classList.add('drop');
    var dropType = getRandomInt(1, 5);
    var dropClassName = 'drop--' + dropType;
    drop.classList.add(dropClassName);
    var leftPos = getRandomInt(0, 500);
    var topPos = getRandomInt(0, 200);
    drop.style.left = leftPos + 'px';
    drop.style.top = topPos + 'px';
    dropsContainer.appendChild(drop);
  }

  var startRain = function() {
    if(isRaining === true){
      return
    } else {
      isRaining = true;
      rainDropTimer = setInterval(generateDrop, 100);
      setInterval(function(){stopRain()}, 10000);
    }
  }

  var stopRain = function() {
    if(isRaining === false){
      return
    } else {
      window.clearInterval(rainDropTimer);
      while (dropsContainer.hasChildNodes()) {
          dropsContainer.removeChild(dropsContainer.lastChild);
      }
    }
  }

  var trackRangeRain = function(range){
    if (range.value > 30 && range.value < 50) {
      startRain();
    } else {
      stopRain();
    }
  }

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  return {trackRangeRain}
})();

function runBanner(){
  var variables = initBanner.getVariables();
  initBanner.configureRange(variables.range);
  variables.range.addEventListener('mousemove', function() {
    changeBanner.imageChange(variables.range, variables.images);
    changeBanner.changeText(variables.range, variables.featureText);
    changeBanner.changeInnerAsset(variables.range, variables.assetInner, variables.innerAssets, variables.player);
    rain.trackRangeRain(variables.range)
  });
}

window.onload = function() {
  runBanner();
}
