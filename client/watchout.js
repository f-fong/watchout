// start slingin' some d3 here.
var svg = d3.select('body')
            .append('svg')
            .attr('width', 500)
            .attr('height', 500)
            .style('background-color', 'black');

var drag = d3.behavior.drag().on('drag', function() {
  player.attr('cx', d3.event.x)
          .attr('cy', d3.event.y);
});

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
                'fill' : 'blue'
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

newStep();


