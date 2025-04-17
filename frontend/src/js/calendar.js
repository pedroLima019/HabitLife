let calendar;

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

export function initCalendar() {
  const calendarEl = document.getElementById("calendar");

  calendar = new FullCalendar.Calendar(calendarEl, {
    locale: "pt-br",
    initialView: "dayGridWeek",
    headerToolbar: getHeaderToolbar(),
    windowResize: function () {
      calendar.setOption("headerToolbar", getHeaderToolbar());
    },
    events: [],
  });

  calendar.render();
}

export function addHabitCalendar({
  name,
  date,
  category,
  startTime = "00:00",
  id,
}) {
  const fullDateTime = `${date}T${startTime}`;

  calendar.addEvent({
    id,
    title: `${name} (${category})`,
    start: fullDateTime,
    allDay: false,
  });
}
export function removeHabitCalendar(id) {
  const event = calendar.getElementById(id);

  if (event) {
    event.remove();
  }
}
