var playerX; 
var playerY;
var enemyCoords;
// start slingin' some d3 here.
var svg = d3.select('body')
            .append('svg')
            .attr('width', 500)
            .attr('height', 500)
            .style('background-color', 'black');

var drag = d3.behavior.drag().on('drag', function() {
  player.attr('cx', d3.event.x)
        .attr('cy', d3.event.y);
        // console.log('player', d3.event.x);
  // console.log('enemies', d3.selectAll('circle.enemy'));
  playerX = d3.event.x;
  playerY = d3.event.y;
  collision();
  findXandY();
  d3.select('.collisions span').text(highscore);
});

// console.log(playerX);
// console.log(playerY);
// console.log('enemies', d3.selectAll('circle.enemy')[0][0].cx.animVal.value);

var player = d3.select('svg')
           .append('circle')
           .attr('class', 'player') 
           .attr({
             'cx': 250,
             'cy': 250,
             'r': 10,
             'fill': 'orange'

           }).call(drag);
var enemies = [1, 2, 3, 4, 5, 6, 7];
var enemy = d3.select('svg')
              .selectAll('circle')
              .data(enemies)
              .enter().append('circle')
              .attr('class', 'enemy')
              .attr({
                'cx': 80,
                'cy': 60,
                'r' : 10,
                'fill': 'white'
              });

var step = function() {
  setTimeout(function() {
    newStep();
  }, 1000);
};

var newStep = function() {
  d3.selectAll('circle.enemy')
    .transition()
    .duration(750)
    .delay(function(d, i) { return i * 10; })
    .attr('cx', function() { return Math.random() * 550; })
    .attr('cy', function() { return Math.random() * 550; });
  step();

};

var highscore = 0;

var collision = function() {
  for (var key in enemyCoords) {
    var x = enemyCoords[key].x - playerX; 
    var y = enemyCoords[key].y - playerY;
    var distance = Math.sqrt(x * x + y * y);
    if (distance < 20) {
      highscore++;
    }
  }
};

var selection = d3.select('circle');


newStep();

var findXandY = function() {
  var results = {};
  var enemiesTroops = d3.selectAll('circle.enemy')[0];
  for (var i = 0; i < enemiesTroops.length; i++) {
    //console.log(enemiesTroops[i].cx.animVal.value);
    var x = enemiesTroops[i].cx.animVal.value;
    var y = enemiesTroops[i].cy.animVal.value;
    results[i] = {x: x, y: y};
  }
  enemyCoords = results;
};

// findXandY();


