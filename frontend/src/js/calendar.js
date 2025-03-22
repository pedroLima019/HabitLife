document.addEventListener("DOMContentLoaded", function () {
  let calendarEl = document.getElementById("calendar");
  let calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      center: "title",
      left: "prev,next today",
      right: "dayGridMonth,timeGridWeek",
    },
    locale: "pt-br",
    initialView: "dayGridMonth",
    windowResize: true,
    handleWindowResize: true,
  });
  calendar.render();
});
