/* Autheurs : Biloni Kim, Fleury Malik et Bulloni Lucas
 * Description : Class représentant un résolveur d'équation avec la méthode du point x
 */
class FixedPoint
{
  constructor(fx, boundaries, divTargetID, holes=[])
  {
    this.fx = fx;
    this.boundaries = boundaries;
    this.divTarget = divTargetID;
    this.solutions = null;
    this.holes = holes;

    this.holes.sort();
  }

  //lance l'algorithme et trouve toutes les réponses
  //renvoie les solutions
  solve()
  {
    let from = this.boundaries[0];
    let solutions = [];
    let lambda = 1;
    //si on renvient à la même valeur ou qu'aucune solution n'est trouvé pour cette tranche
    //on doit avancer petit à petit
    const step = 1;
    const decimals = 5;

    while(from < this.boundaries[1])
    {
      let solution = this.fixedPointAlgorithm(from, 100, lambda);

      //vérifie que la valeur n'est pas déjà présente
      if(solution !== undefined && !this.arrIncludeDouble(solutions, solution))
      {
        solutions.push(solution);
      }
      else
      {
          from += step;
      }
    }

    this.solutions = solutions;
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

  //vérifie qu'un double soit dans un array avec la marge d'erreur epsilon
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

  //permet de calculer tous les points de la fonction
  computeEachPoint(min, max, step, fx, holes=[])
  {
   let xData = [];
   let yData = [];
   let holeIndex = 0;

   for(let i = min;i <= max; i += step)
   {
      xData.push(i);
      let y = fx(i);

      //on gère les trous de la fonction
      if(this.holes.length > 0 && this.doubleEquals(holes[holeIndex], i))
      {
         yData.push(undefined);
         holeIndex++;
      }
      else
      {
         yData.push(y);
      }
   }

   return [xData, yData];
  }

  //affiche le plot dans this.divTarget
  displayPlot()
  {
   let fxPoints = this.computeEachPoint(this.boundaries[0], this.boundaries[1],
                  0.1, this.fx, this.holes);
 	let fxPlot =
 	{
      name: 'f(x)',
 		x: fxPoints[0],
 		y: fxPoints[1],
 		type: 'scatter'
 	};

   let hx = function(x){return x};
   let hxPoints = this.computeEachPoint(this.boundaries[0], this.boundaries[1],
                  0.1, hx);
   let hxPlot =
   {
      name: 'x',
      x: hxPoints[0],
 		y: hxPoints[1],
 		type: 'scatter'
   };

   let gx = this.findGX(this.fx, 1);
   let gxPoints = this.computeEachPoint(this.boundaries[0], this.boundaries[1],
                  0.1, gx, this.holes);
   let gxPlot =
   {
      name: 'x+\u039B*x',
      x: gxPoints[0],
 		y: gxPoints[1],
 		type: 'scatter'
   };

 	let layout =
 	{
      width: 768,
      height: 768,

 		xaxis:
 		{
 			range: [this.boundaries[0], this.boundaries[1]],
         autorange: false
 		},
 		yaxis:
 		{
 			range: [-30,30],
         autorange: false
 		},
 		hovermode: "closest"
 	};

 	let data = [fxPlot, hxPlot, gxPlot];

 	Plotly.newPlot(this.divTarget, data, layout);
  }

  displayValue(IDp)
  {
    let tab = "<table>"
    tab += "<th>Zeros de la fonction</th>";
    this.solutions.forEach(function(element)
    {
      tab += "<tr>";
      tab += "<td>";
      tab += element;
      tab += "</td>";
      tab += "</tr>";
    });
    tab += "</table>"
    document.getElementById(IDp).innerHTML = tab;
  }
}
