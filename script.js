
document.addEventListener("DOMContentLoaded", function(event) {
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

    target: '#function1',
    data:
    [{
      fn: function1
    }]
  });

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
