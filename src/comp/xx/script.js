
const hash = "ef23b2350cb1ec12e463d25920fc8f0b";
const sums = []
for (let i = 0; i < 8; i++) {
  let sum = 0
  for (let j = 0; j < 4; j++) {
    sum += parseInt(hash[i * 4 + j], 16)
  }
  sums.push(sum)
}

// Create a chart using Chart.js
const ctx = document.getElementById('myChart').getContext('2d');
const chart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['1-4', '5-8', '9-12', '13-16', '17-20', '21-24', '25-28', '29-32'],
    datasets: [{
      label: 'Number of bits',
      data: sums,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 1
    }]
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
