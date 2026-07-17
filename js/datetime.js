// ============================================
// Date & Time Module
// ============================================

const dayElement = document.getElementById("display-day");
const dateElement = document.getElementById("display-date");
const timeElement = document.getElementById("display-time");
const headerDay = document.getElementById("header-day");
const headerDate = document.getElementById("header-date");
const headerTime = document.getElementById("header-time");

function updateDateTime() {
  const now = new Date();

  const day = now.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const date = now.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  dayElement.textContent = day;
  dateElement.textContent = date;
  timeElement.textContent = time;

  // Update Header
  if (headerDay) {
    headerDay.textContent = day;
  }

  if (headerDate) {
    headerDate.textContent = now.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  if (headerTime) {
    headerTime.textContent = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  }
}

// Update immediately
updateDateTime();

// Update every second
setInterval(updateDateTime, 1000);
