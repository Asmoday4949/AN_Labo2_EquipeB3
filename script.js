/* Autheurs : Biloni Kim, Fleury Malik et Bulloni Lucas
 * Description : Script principale de l'application
 */
document.addEventListener('DOMContentLoaded', function(event) {
  let boundaries = [-100, 100];

  let fixedPointFunc1 = new FixedPoint(function(x) {
    return Math.sin(x)-x/13;
  }, boundaries, 'function1');

  fixedPointFunc1.displayPlot();
  let solutions1 = fixedPointFunc1.solve();
  fixedPointFunc1.displayValue('f1Zeros');
  console.log(solutions1);

  let fixedPointFunc2 = new FixedPoint(function(x) {
    return x/(1-x*x);
}, boundaries, 'function2', [-1,1]);

  fixedPointFunc2.displayPlot();
  let solutions2 = fixedPointFunc2.solve();
  fixedPointFunc2.displayValue('f2Zeros');
  console.log(solutions2);
});
