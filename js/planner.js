const plannerNotes = document.querySelectorAll(".planner-note");
const savePlannerBtn = document.getElementById("btn-save-planner");

function savePlanner() {

    const plannerData = {};

    plannerNotes.forEach(note => {
        plannerData[note.id] = note.value;
    });

    localStorage.setItem(
        "plannerData",
        JSON.stringify(plannerData)
    );

}

function loadPlanner() {

    const plannerData =
        JSON.parse(localStorage.getItem("plannerData")) || {};

    plannerNotes.forEach(note => {

        if (plannerData[note.id]) {
            note.value = plannerData[note.id];
        }

    });

}

function highlightCurrentHour() {

    const currentHour = new Date().getHours();

    document.querySelectorAll(".planner-row").forEach(row => {

        row.classList.remove(
            "past-hour",
            "current-hour",
            "future-hour"
        );

        const rowHour = Number(
            row.id.replace("planner-row-", "")
        );

        if (rowHour < currentHour) {
            row.classList.add("past-hour");
        }
        else if (rowHour === currentHour) {
            row.classList.add("current-hour");
        }
        else {
            row.classList.add("future-hour");
        }

    });

}

function scrollToCurrentHour() {

    const currentHour = new Date().getHours();

    const currentRow = document.getElementById(
        `planner-row-${String(currentHour).padStart(2, "0")}`
    );

    if (currentRow) {

        currentRow.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    }

}

plannerNotes.forEach(note => {

    note.addEventListener("input", savePlanner);

});

savePlannerBtn.addEventListener("click", savePlanner);

loadPlanner();

highlightCurrentHour();
scrollToCurrentHour();

setInterval(highlightCurrentHour, 60000);

window.scrollToCurrentHour = scrollToCurrentHour;