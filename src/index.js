import _ from 'lodash'

// Project Cards and links
function Project(title, language, link, codelink, favor, description) {
  this.title = title;
  this.language = language;
  this.description = description;
  this.link = link;
  this.codelink = codelink;
  this.favor = favor;
  this.info = function () {
    return `${title}: ${description}`;
  };
}

const myLibrary = [];

// Connect to json
function getData() {
  fetch("projectData.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      data.forEach((item) => {
        const project = new Project(
          item.title,
          item.language,
          item.link,
          item.codelink,
          item.favor,
          item.description,
        );
        myLibrary.push(project);
      });
      console.log(myLibrary);
      displayProjects();
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function clearDescription() {
    const descriptionbox = document.querySelector(".description");
    descriptionbox.innerHTML = "";
  }

function displayProjects() {
  // Get the Projects container
  const projectCatalog = document.querySelector(".project-cards");

  // clear for updates
  projectCatalog.innerHTML = "";

  // Loop through the library array and create Projectcard divs
  myLibrary.forEach((project) => {
    // Create a new project card div
    const projectCardDiv = document.createElement("div");

    // Create elements for project title, languages
    const title = document.createElement("article");
    title.textContent = project.title;

    const language = document.createElement("p");
    language.textContent = project.language;

    const actions = document.createElement("div");
    actions.classList = "project-actions";

    const favBtn = document.createElement("button");
    favBtn.classList = "image-button fav-button-false";
    favBtn.addEventListener("click", () => {
      // temporary
      if (project.favor === false) {
        project.favor = true;
        favBtn.classList = "image-button fav-button-true";
      } else {
        project.favor = false;
        favBtn.classList = "image-button fav-button-false";
      }
    });
    actions.appendChild(favBtn);

    const viewCodeBtn = document.createElement("button");
    viewCodeBtn.classList = "image-button view-code-button";
    viewCodeBtn.addEventListener("click", () => {
      // link to project code on github
      window.open(project.codelink, "_blank");
    });
    actions.appendChild(viewCodeBtn);

    const viewPageBtn = document.createElement("button");
    viewPageBtn.classList = "image-button view-page-button";
    viewPageBtn.addEventListener("click", () => {
      // link to project page preview
      window.open(project.link, "_blank");
    });
    actions.appendChild(viewPageBtn);

    // Append elements to the project div
    projectCardDiv.appendChild(title);
    projectCardDiv.appendChild(actions);
    projectCardDiv.appendChild(language);

    // Add event listener for mouseover event
    projectCardDiv.addEventListener("mouseover", () => {
      updateDescription(project);
    });

    projectCardDiv.addEventListener("mouseleave", () => {
      clearDescription();
    });

    // Append the project div to the projects container
    projectCatalog.appendChild(projectCardDiv);
  });
}

function updateDescription(project) {
  clearDescription();

  const descriptionbox = document.querySelector(".description");
  const newDesc = document.createElement("div");
  newDesc.textContent = project.description;
  descriptionbox.appendChild(newDesc);
}

document.addEventListener("DOMContentLoaded", () => {
  const aboutDiv = document.querySelector(".about");
  aboutDiv.innerHTML = `
        <p>My journey into software development stems from my time at Edison Research, where I took it upon myself to develop Python-based automation project for handling paper surveys, revolutionizing survey data entry processes and optimizing team efficiency. As a project coordinator, I navigated high-pressure environments with ease, recruiting and leading diverse teams of reporters for critical election day coverage (we provided election data to the major news networks), all while enhancing internal software functionality across multiple languages.</p>
        <p>Prior to my foray into tech, I spent years honing my craft as a choral music teacher, leveraging technology to create dynamic, student-centered learning environments. From integrating classroom tech to securing grants for music labs, I've always been at the forefront of educational innovation.</p>
        <p>Equipped with certificates in web development, data science, and SQL, alongside a Master's in Music Education from Rutgers University, I bring a unique blend of technical prowess and pedagogical expertise to the table.</p>
        <p>Through this portfolio, I invite you to explore the intersection of my diverse experiences and my unwavering passion for software development. From automating tedious tasks to orchestrating superior performances, each endeavor speaks to my commitment to excellence and innovation.</p>
        <p>So come on in, take a look around, and let's embark on this exciting journey together!</p>
    `;
});

document.addEventListener("DOMContentLoaded", () => {
  const heroHeader = document.getElementById("hero");
  heroHeader.innerHTML = 
        "<h1>Welcome to My Portfolio website</h1><p>Hello and welcome! My name is Gregory Jung, an adaptable, music educator turned aspiring software developer on a mission to blend my passion for technology with a knack for creativity in problem solving. With a solid foundation in Python, JavaScript, PHP, and SQL, alongside a fervent pursuit of web development through The Odin Project, I'm poised to make meaningful contributions in the world of software engineering.</p>"
    ;
});

window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const parallax = document.querySelector(".parallax");
  parallax.style.transform = `translateY(${  scrolled * 0.5  }px)`;
});

document.addEventListener('DOMContentLoaded', () => {
  const heroHeader = document.getElementById('hero');
  heroHeader.innerHTML = `
        <h1>Welcome to My Portfolio website</h1>
        <p>Hello and welcome! My name is Gregory Jung, an adaptable, music educator turned aspiring software developer on a mission to blend my passion for technology with a knack for creativity in problem solving. With a solid foundation in Python, JavaScript, PHP, and SQL, alongside a fervent pursuit of web development through The Odin Project, I'm poised to make meaningful contributions in the world of software engineering.</p>
    `;

  const aboutDiv = document.querySelector('.about');
  aboutDiv.innerHTML = `
        <p>My journey into software development stems from my time at Edison Research, where I took it upon myself to develop Python-based automation project for handling paper surveys, revolutionizing survey data entry processes and optimizing team efficiency. As a project coordinator, I navigated high-pressure environments with ease, recruiting and leading diverse teams of reporters for critical election day coverage (we provided election data to the major news networks), all while enhancing internal software functionality across multiple languages.</p>
        <p>Prior to my foray into tech, I spent years honing my craft as a choral music teacher, leveraging technology to create dynamic, student-centered learning environments. From integrating classroom tech to securing grants for music labs, I've always been at the forefront of educational innovation.</p>
        <p>Equipped with certificates in web development, data science, and SQL, alongside a Master's in Music Education from Rutgers University, I bring a unique blend of technical prowess and pedagogical expertise to the table.</p>
        <p>Through this portfolio, I invite you to explore the intersection of my diverse experiences and my unwavering passion for software development. From automating tedious tasks to orchestrating superior performances, each endeavor speaks to my commitment to excellence and innovation.</p>
        <p>So come on in, take a look around, and let's embark on this exciting journey together!</p>
    `;

  getData();
});
