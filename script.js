/* Autheurs : Biloni Kim, Fleury Malik et Bulloni Lucas
 * Description : Script principale de l'application
 */
document.addEventListener('DOMContentLoaded', function(event) {
  let fixedPointFunc1 = new FixedPoint(function(x) {
    return Math.sin(x)-x/13
  }, [-100, 100], '#function1');

  fixedPointFunc1.displayPlot();
  let solutions1 = fixedPointFunc1.solve();

  let fixedPointFunc2 = new FixedPoint(function(x) {
    return x/(1-x*x)-x/13
  }, [-100, 100], '#function2');

  fixedPointFunc2.displayPlot();
  let solutions2 = fixedPointFunc2.solve();

  /*let function2 = 'x/(1-x*x)';
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
  });*/
});
