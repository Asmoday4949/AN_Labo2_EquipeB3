/* Autheurs : Biloni Kim, Fleury Malik et Bulloni Lucas
 * Description : Script principale de l'application
 */
document.addEventListener('DOMContentLoaded', function(event) {
  let fixedPointFunc1 = new FixedPoint(function(x) {
    return Math.sin(x)-x/13
  }, [-100, 100], '#function1');
  fixedPointFunc1.displayPlot();

  let function2 = 'x/(1-x*x)';
  functionPlot({
    title: function2,
    width:580,
    height:400,
    disableZoom: false,

    xAxis:
    {
      label: 'x - axis',
      domain: [-100, 100]
    },

    yAxis:
    {
      label: 'y - axis',
      domain: [-20, 20]
    },

    target: '#function2',
    data:
    [{
      fn: function2
    }]
  });
});
