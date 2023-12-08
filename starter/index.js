$("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

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

updateHourStyles();
