document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");

  function getHeaderToolbar() {
    if (window.innerWidth < 768) {
      return {
        left: "prev,next",
        center: "title",
        right: "today",
      };
    } else {
      return {
        left: "prev,next today",
        center: "title",
        right: "dayGridMonth,timeGridWeek,timeGridDay",
      };
    }
  }

  let calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "pt-br",
    initialView: "dayGridMonth",
    headerToolbar: getHeaderToolbar(),
    windowResize: function () {
      calendar.setOption("headerToolbar", getHeaderToolbar());
    },
  });

  calendar.render();
});
