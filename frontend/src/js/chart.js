const ctx = document.getElementById("myChart");

new Chart(ctx, {
  type: "line",
  data: {
    labels: ["Tarefas"],
    datasets: [
      {
        label: "Concluídas",
        data: [12],
        backgroundColor: "rgba(0, 255, 0, 0.6)",
        borderWidth: 1,
      },
      {
        label: "Não concluídas",
        data: [19],
        backgroundColor: "rgb(255, 0, 0)",
        borderWidth: 1,
      },
      {
        label: "A concluir",
        data: [3],
        backgroundColor: "rgb(255, 230, 0)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    animations: {
      tension: {
        duration: 1000,
        easing: "linear",
        from: 1,
        to: 0,
        loop: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: "white",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
      y: {
        ticks: {
          color: "white",
          font: {
            weight: "bold",
          },
        },
        grid: {
          color: "rgba(255, 255, 255, 0.2)",
        },
      },
    },
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
