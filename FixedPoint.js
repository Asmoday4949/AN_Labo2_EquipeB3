/* Autheurs : Biloni Kim, Fleury Malik et Bulloni Lucas
 * Description : Class représentant un résolveur d'équation avec la méthode du point x
 */
class FixedPoint
{
  constructor(fx, boundaries, divTarget)
  {
    this.fx = fx;
    this.boundaries = boundaries;
    this.divTarget = divTarget;
  }

  //lance l'algorithme et trouve toutes les réponses
  //renvoie les solutions
  solve()
  {
    let from = this.boundaries[0];
    let solutions = [];
    let lambda = 1;

    //while(from < this.boundaries[1])
    //{
      solutions.push(this.fixedPointAlgorithm(from, 0.5, lambda));
      from = solutions[solutions.length-1];
    //}

    return solutions;
  }


  //Vérifie que deux doubles soient égaux à lambda près
  doubleEquals(a, b, epsilon = 1e-10)
  {
    if (a != 0 && b != 0)
		{
		return Math.abs((a - b) / a) <= epsilon;
		}
		else
		{
		return Math.abs(a - b) <= epsilon;
		}
  }

  //trouve une des racine depuis from
  fixedPointAlgorithm(from, maxTry, lambda)
  {
    // dans le cas où les fonctions ne divergent pas il ne faut pas partir en boucle infinie
    let i = maxTry;
    let gx = this.findGX(this.fx, lambda);

    //résultats intermédiaires
    let x0 = from;
    let x1 = gx(from);

    //va être utile par savoir si f(x) et g(x) divergent
    let delta0 = Math.abs(x0-x1);
    let delta1 = 0;

    while(this.doubleEquals(x0, x1))
    {
      x0 = x1;
      x1 = gx(x1);
      delta1 = Math.abs(x0-x1);

      //Si ça diverve on inverse lambda et on reprend depuis le début
      if(delta1 > delta2)
      {
        lambda *= -1;
        gx = this.findGX(this.fx, lambda);
        x0 = from;
        x1 = gx(from);
      }

      i--;
      if(i <= 0)
      {
        return undefined;
      }
    }

    return x0;

  }

  //trouve g(x) avec this.fx et le lambda
  //retourne une fonction anonyme
  findGX(func, lambda)
  {
    return function(x)
    {
      return lambda*func(x)+x;
    };
  }


  //affiche le plot dans this.divTarget
  displayPlot()
  {
    let function1 = 'sin(x)-x/13';

    functionPlot(
    {
      title: function1,
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

      target: this.divTarget,
      data:
      [{
        fn: function1
      }]
    });
  }
}
