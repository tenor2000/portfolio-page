//Project Cards and links
function Project(title, language, link, codelink, favor, description) {
    this.title = title;
    this.language = language;
    this.description = description;
    this.link = link;
    this.codelink = codelink
    this.favor = favor;
    this.info = function () {return `${title} by ${author}, ${pages} pages`}
}

const myLibrary = []

// Connect to json
function getData() {
    fetch('projectData.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            data.forEach(item => {
                const project = new Project(item.title, item.language, item.link, item.codelink, item.favor, item.description);
                myLibrary.push(project);
            });
            console.log(myLibrary); // This will log the populated array
            // Call any function that relies on the populated myLibrary array here
            displayProjects();
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
}

function displayProjects() {
    // Get the Projects container
    const projectCatalog = document.querySelector('.project-cards');

    //clear for updates
    projectCatalog.innerHTML = '';

    // Loop through the library array and create Projectcard divs
    myLibrary.forEach(project => {
        // Create a new project card div
        const projectCardDiv = document.createElement('div');

        // Create elements for project title, languages
        const title = document.createElement('article');
        title.textContent = project.title;

        const language = document.createElement('p');
        language.textContent = project.language;

        const actions = document.createElement('div');
        actions.classList = 'project-actions';

        const favBtn = document.createElement('button');
        favBtn.classList = 'image-button fav-button-false';
        favBtn.addEventListener('click', () =>  {
            // temporary
            if (project.favor === false) {
                project.favor = true;
                favBtn.classList = 'image-button fav-button-true';
            } else {
                project.favor = false;
                favBtn.classList = 'image-button fav-button-false';
            }
        })
        actions.appendChild(favBtn)

        const viewCodeBtn = document.createElement('button')
        viewCodeBtn.classList = 'image-button view-code-button';
        viewCodeBtn.addEventListener('click', () =>  {
            // link to project code on github
            window.open(project.codelink, "_blank");
        })
        actions.appendChild(viewCodeBtn)

        const viewPageBtn = document.createElement('button')
        viewPageBtn.classList = 'image-button view-page-button';
        viewPageBtn.addEventListener('click', () =>  {
            // link to project page preview
            window.open(project.link, "_blank");
        })
        actions.appendChild(viewPageBtn)

        // Append elements to the project div
        projectCardDiv.appendChild(title);
        projectCardDiv.appendChild(actions);
        projectCardDiv.appendChild(language);


        // Add event listener for mouseover event
        projectCardDiv.addEventListener('mouseover', () => {
            updateDescription(project);
        });

        projectCardDiv.addEventListener('mouseleave', () => {
            clearDescription(); 
        });

        // Append the project div to the projects container
        projectCatalog.appendChild(projectCardDiv);
    });
}

function updateDescription(project) {
    clearDescription()

    const descriptionbox = document.querySelector('.description');
    const newDesc = document.createElement('div');
    newDesc.textContent = project.description;
    descriptionbox.appendChild(newDesc);
}

function clearDescription() {
    const descriptionbox = document.querySelector('.description');
    descriptionbox.innerHTML = '';
}

getData();

window.addEventListener('scroll', function() {
    let scrolled = window.scrollY;
    let parallax = document.querySelector('.parallax');
    parallax.style.transform = 'translateY(' + (scrolled * 0.5) + 'px)';
});