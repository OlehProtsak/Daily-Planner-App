$("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

// Function to color-code timeblocks based on past, present, or future
function updateHourStyles() {
  var currentHour = dayjs().hour();

  $(".time-block").each(function () {
    var blockHour = parseInt($(this).data("time"));

    if (blockHour < currentHour) {
      $(this).removeClass("present future").addClass("past");
    } else if (blockHour === currentHour) {
      $(this).removeClass("past future").addClass("present");
    } else {
      $(this).removeClass("past present").addClass("future");
    }
  });
}

// Call the function to initially set the styles
updateHourStyles();

// Function to handle saving events to local storage
$(".saveBtn").on("click", function () {
  var timeblock = $(this).closest(".time-block");
  var hour = timeblock.data("time");
  var eventText = timeblock.find("textarea").val();

  // Save event to local storage
  localStorage.setItem("event_" + hour, eventText);
});

// Function to load events from local storage
function loadEvents() {
  $(".time-block").each(function () {
    var hour = $(this).data("time");
    var savedEvent = localStorage.getItem("event_" + hour);

    if (savedEvent) {
      $(this).find("textarea").val(savedEvent);
    }
  });
}

// Call the function to load events when the page loads
loadEvents();

// Set up an interval to update the styles every minute
setInterval(updateHourStyles, 60000);