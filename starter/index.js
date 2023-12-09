// Display the current day at the top of the calendar
$("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

// Function to color-code timeblocks based on past, present, or future
function updateHourStyles() {
  let currentHour = dayjs().format("hA");
  currentHour =
    currentHour.includes("PM") && parseInt(currentHour) !== 12
      ? parseInt(currentHour) + 12
      : parseInt(currentHour);

  $(".time-block").each(function () {
    const eventBlock = $(this);
    let blockHour = eventBlock.data("time");
    blockHour =
      blockHour.includes("PM") && parseInt(blockHour) !== 12
        ? parseInt(blockHour) + 12
        : parseInt(blockHour);

    if (blockHour < currentHour) {
      eventBlock.removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      eventBlock.removeClass("past future").addClass("present");
    } else {
      eventBlock.removeClass("present past").addClass("future");
    }
  });
}

// Call the function to initially set the styles
updateHourStyles();

// Function to handle saving events to local storage
$(".saveBtn").on("click", function () {
  const timeblock = $(this).closest(".time-block");
  const hour = timeblock.data("time");
  const eventText = timeblock.find("textarea").val();

  // Save event to local storage
  localStorage.setItem("event_" + hour, eventText);
});

// Function to load events from local storage
function loadEvents() {
  $(".time-block").each(function () {
    const hour = $(this).data("time");
    const savedEvent = localStorage.getItem("event_" + hour);

    if (savedEvent) {
      $(this).find("textarea").val(savedEvent);
    }
  });
}

// Call the function to load events when the page loads
loadEvents();

// Set up an interval to update the styles every minute
setInterval(updateHourStyles, 60000);
