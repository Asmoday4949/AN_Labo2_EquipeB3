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
    const step = 1;
    const decimals = 5;

    while(from < this.boundaries[1])
    {
      let solution = this.fixedPointAlgorithm(from, 100, lambda);

      if(solution !== undefined && !this.arrIncludeDouble(solutions, solution))
      {
        solutions.push(solution);
        from = solutions[solutions.length-1];
      }
      else
      {
          from += step;
      }
    }

    return solutions;
  }


  //Vérifie que deux doubles soient égaux à lambda près
  doubleEquals(a, b, epsilon = 1e-6)
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

  arrIncludeDouble(arr, val, epsilon = 1e-6)
  {
    for(let i = 0; i < arr.length; i++)
    {
      if(this.doubleEquals(arr[i], val, epsilon))
      {
        return true;
      }
    }

    return false;
  }

  //trouve une des racine depuis from
  //i étant le nombre d'essai max pour ne partie en boucle infinie
  fixedPointAlgorithm(from, i, lambda)
  {
    let gx = this.findGX(this.fx, lambda);

    //résultats intermédiaires
    let x0 = from;
    let x1 = gx(from);

    //va être utile par savoir si f(x) et g(x) divergent
    let delta1 = Math.abs(x0-x1);
    let delta2 = 0;

    while(!this.doubleEquals(x0, x1))
    {
      x0 = x1;
      x1 = gx(x1);

      delta2 = Math.abs(x0-x1);

      //Si ça diverge on inverse lambda et on reprend depuis le début
      if(delta1 < delta2)
      {
        lambda *= -1;
        gx = this.findGX(this.fx, lambda);
        x0 = from;
        x1 = gx(from);
        delta1 = Math.abs(x0-x1);
      }

      i--;
      if(i <= 0)
      {
        return undefined;
      }
    }

    return x1;
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
