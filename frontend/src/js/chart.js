const ctx = document.getElementById("myChart");

export const myChart = new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Concluídas", "Pendentes", "Em andamento"],
    datasets: [
      {
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(0, 255, 0, 0.6)",
          "rgb(255, 238, 0)",
          "rgb(3, 62, 255)",
        ],
        borderWidth: 0,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "white",
        },
      },
    },
  },
});

export function updateChart(completed, pending, inProgress) {
  myChart.data.datasets[0].data = [completed, pending, inProgress];
  myChart.update();
}
