/* Autheurs : Biloni Kim, Fleury Malik et Bulloni Lucas
 * Description : Script principale de l'application
 */

let fixedPointFunc1;
let fixedPointFunc2;

document.addEventListener('DOMContentLoaded', function(event) {
  let boundaries = [-100, 100];

  fixedPointFunc1 = new FixedPoint(function(x) {
    return Math.sin(x)-x/13;
  }, boundaries, 'function1');

  let solutions1 = fixedPointFunc1.solve();
  fixedPointFunc1.displayPlot();
  fixedPointFunc1.displayValue('f1Zeros');
  console.log(solutions1);

  fixedPointFunc2 = new FixedPoint(function(x) {
    return x/(1-x*x);
}, boundaries, 'function2', [-1,1]);

   let solutions2 = fixedPointFunc2.solve();
  fixedPointFunc2.displayPlot();
  fixedPointFunc2.displayValue('f2Zeros');
  console.log(solutions2);
});

function showPathOnFunction1()
{
   let entryPoint1 = document.getElementById("entryPoint1").value;

   fixedPointFunc1.displayPlot(entryPoint1);
   return true;
}

function showPathOnFunction2()
{
   let entryPoint2 = document.getElementById("entryPoint2").value;

   fixedPointFunc2.displayPlot(entryPoint2);
   return true;
}
