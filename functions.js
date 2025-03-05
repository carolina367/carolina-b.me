window.addEventListener('load', setActiveLink);
window.addEventListener('load', applyStoredTheme);
window.addEventListener('load', adjustCircleSizes);
window.addEventListener('resize', adjustCircleSizes);

function setActiveLink() {
  var path = window.location.pathname;
  path = path.replace(/\/$/, "");
  path = decodeURIComponent(path);

  var menuItems = document.querySelectorAll(".topnav a");
  for (var i = 0; i < menuItems.length; i++) {
    if (menuItems[i].pathname === path) {
      menuItems[i].className += " active";
    }
  }
};

function applyStoredTheme() {
  var theme = document.getElementsByTagName("link")[0];
  var storedTheme = localStorage.getItem("theme");

  if (storedTheme) { // If a theme is stored, apply it
    theme.setAttribute("href", "css/" + storedTheme + ".css");
  }
};

function toggleTheme() {
  var theme = document.getElementsByTagName("link")[0];
  var storedTheme = localStorage.getItem("theme");

  if (storedTheme === "professional") {
    theme.setAttribute("href", "css/barbie.css");
    localStorage.setItem("theme", "barbie");
  } else {
    theme.setAttribute("href", "css/professional.css");
    localStorage.setItem("theme", "professional");
  }
};

function adjustCircleSizes() {
  const circles = document.querySelectorAll('.circle');

  circles.forEach(circle => {
    const heading = circle.querySelector('h3');
    const minWidth = 150;
    const maxWidth = 300;
    const textWidth = heading.scrollWidth + 40; 

    const diameter = Math.min(Math.max(textWidth, minWidth), maxWidth);
    circle.style.width = `${diameter}px`;
    circle.style.height = `${diameter}px`;
  });
}

function toggleCircle(element) {
  const allCircles = document.querySelectorAll('.circle');

  const isExpanded = element.classList.contains('expanded');

  allCircles.forEach(circle => {
    circle.classList.remove('expanded');
    adjustCircleSizes();
  });

  if (!isExpanded) {
    element.classList.add('expanded');
    element.style.width = 'auto'; 
    element.style.height = 'auto'; 
  }
}

let currentIndex = 1; // Start with the first project
const totalProjects = 7; // Update with the total number of projects

function showProject(projectId) {
  currentIndex = parseInt(projectId.replace('project', ''), 10);

  var projects = document.getElementsByClassName('current-viewing');
  for (var i = 0; i < projects.length; i++) {
    projects[i].style.display = 'none';
  }

  var selectedProject = document.getElementById(projectId);
  selectedProject.style.display = 'block';
}

function previousProject() {
  currentIndex = currentIndex - 1 < 1 ? totalProjects : currentIndex - 1;
  showProject('project' + currentIndex);
}

function nextProject() {
  currentIndex = currentIndex + 1 > totalProjects ? 1 : currentIndex + 1;
  showProject('project' + currentIndex);
}




