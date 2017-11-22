'use strict';

window.renderStatistics = function (ctx, names, times) {

  function createShadowRectangle() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
  }

  function createBackgroundRectangle() {
    ctx.fillStyle = 'white';
    ctx.fillRect(100, 10, 420, 270);
  }

  function addWinText() {
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = 'black';
    ctx.fillText('Ура вы победили!', 115, 30);
    ctx.fillText('Список результатов:', 115, 50);
  }

  function createHistogram(nameArray, timeArray) {
    var offsetLeft = 125;
    var stepBetweenColumns = 50;
    var columnWidth = 40;
    var columnColor;
    for (var i = 0; i < nameArray.length; i++) {
      columnColor = defineColumnColor(nameArray[i]);
      createHistogramColumns(timeArray[i], offsetLeft, columnColor);
      addNameToColumn(nameArray[i], offsetLeft);
      offsetLeft += stepBetweenColumns + columnWidth;
    }
  }

  function defineColumnColor(name) {
    var columnColor;
    var randomNumber = getRandomNumberRounded(0, 256);
    if (name === 'Вы') {
      columnColor = 'rgba(255, 0, 0, 1)';
    } else {
      columnColor = 'rgba(0, 0, ' + randomNumber + ', 1)';
    }
    return columnColor;
  }

  function getRandomNumberRounded(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function createHistogramColumns(columnTime, columnOffsetLeft, columnColor) {
    var maxTimeRounded = getMaxTimeRounded(times);
    var columnHeight = getColumnHeight(columnTime, maxTimeRounded);
    var columnWidth = 40;
    var columnBottom = 250;
    var textLevelHeight = columnBottom - columnHeight - 20;
    ctx.fillStyle = columnColor;
    ctx.fillRect(columnOffsetLeft, columnBottom, columnWidth, -columnHeight);
    addTimeToColumn(Math.round(columnTime), columnOffsetLeft, textLevelHeight);
  }

  function getMaxTimeRounded(timeArray) {
    var maxTime = Math.max.apply(null, timeArray);
    return Math.round(maxTime);
  }

  function getColumnHeight(columnTime, maxTime) {
    var histogramHeight = 150;
    return histogramHeight * columnTime / maxTime;
  }

  function addNameToColumn(name, textOffsetLeft) {
    ctx.fillStyle = 'black';
    ctx.fillText(name, textOffsetLeft, 255);
  }

  function addTimeToColumn(roundedTime, textOffsetLeft, height) {
    ctx.fillStyle = 'black';
    ctx.fillText(roundedTime, textOffsetLeft, height);
  }

  createShadowRectangle();
  createBackgroundRectangle();
  addWinText();
  createHistogram(names, times);

};
