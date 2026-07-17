// ============================================
// Navigation Module
// ============================================

const navItems = document.querySelectorAll(".sidebar-item");
const sections = document.querySelectorAll(".feature-section");

function showSection(sectionId) {

    // Hide all sections
    sections.forEach((section) => {
        section.classList.remove("active");
    });

    // Remove active sidebar item
    navItems.forEach((item) => {
        item.classList.remove("active");
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);


    if (targetSection) {
        targetSection.classList.add("active");
    }

    // Highlight sidebar
    const activeItem = document.querySelector(
        `.sidebar-item[data-target="${sectionId}"]`
    );

    if (activeItem) {
        activeItem.classList.add("active");
    }
}

navItems.forEach((item) => {
    item.addEventListener("click", () => {
        showSection(item.dataset.target);
    });
});