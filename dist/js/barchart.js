const ctx = document.getElementById('barchart');

let chart;
const createChart = () => {
  if (chart) {
    chart.destroy();
  }

  // datasets for chart
  let datasets = [];  
  for(let i = 0; i < background.length; i++) {
    let dataset = {
      label: setLabel[i],
      backgroundColor: rgbas[i],
      borderColor: borderRgbas[i],
      data: data[i],
      borderWidth: 1
    }
    datasets.push(dataset);
  }
  // options for chart 
  let options = {
    
  }

  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: label,
      datasets: datasets
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}