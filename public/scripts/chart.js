fetch('/api/chartTeam')
  .then(response => response.json())
  .then(teamPerformance => {
    const labels = teamPerformance.map(team => team.team);
    const data = teamPerformance.map(team => team.points);
    const backgroundColor = teamPerformance.map(team => team.color);

    const teamPerformanceChart = new Chart(document.getElementById('teamPerformanceChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Points',
          data: data,
          backgroundColor: backgroundColor,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
      }
    });
  })
  .catch(error => console.error('Error fetching team performance data:', error));



fetch('/api/chartScore')
  .then(response => response.json())
  .then(topScorers => {
    const topScorersNames = topScorers.map(player => player.name);
    const topScorersGoals = topScorers.map(player => player.goals);
    const topScorersColors = topScorers.map(player => player.color);

    const topScorersData = {
      labels: topScorersNames,
      datasets: [{
        label: 'Goals',
        data: topScorersGoals,
        backgroundColor: topScorersColors,
      }]
    };

    const topScorersChart = new Chart(document.getElementById('topScorersChart'), {
      type: 'bar',
      data: topScorersData,
      options: {
        indexAxis: 'y',
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const goals = context.raw || 0;
                return `${goals} goals`;
              }
            }
          }
        },
        scales: {
          x: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching score data:', error));


fetch('/api/chartGoals')
  .then(response => response.json())
  .then(goalsScoredOverTime => {
    const labels = goalsScoredOverTime.map(record => record.matchday);
    const data = goalsScoredOverTime.map(record => record.goals);

    const goalsScoredChart = new Chart(document.getElementById('goalsScoredChart'), {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Goals Scored',
          data: data,
          backgroundColor: '#e34f4f',
          borderColor: '#de4040',
          borderWidth: 1,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Matchday',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Goals',
            },
            beginAtZero: true,
          }
        }
      }
    });
  })
  .catch(error => console.error('Error fetching goals scored:', error));