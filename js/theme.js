const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);

    themeToggle.setAttribute(
        "aria-checked",
        theme === "dark"
    );
}

function loadTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme =
        document.documentElement.getAttribute("data-theme");

    if (currentTheme === "dark") {
        setTheme("light");
    } else {
        setTheme("dark");
    }
}

themeToggle.addEventListener("click", toggleTheme);

loadTheme();