//Project Cards and links
function Project(title, subtitle, link, codelink, favor, description) {
    this.title = title;
    this.subtitle = subtitle;
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
                const project = new Project(item.title, item.subtitle, item.link, item.codelink, item.favor, item.description);
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
        // Create a new projectcard div
        const projectCardDiv = document.createElement('div');

        // Create elements for project title, author
        const title = document.createElement('h2');
        title.textContent = project.title;

        const subtitle = document.createElement('p');
        subtitle.textContent = `by ${project.subtitle}`;

        const actions = document.createElement('div');

        const favBtn = document.createElement('button');
        favBtn.classList = 'image-button fav-button';
        favBtn.addEventListener('click', () =>  {
            // temporary
            alert("Favorited!");
        })
        actions.appendChild(favBtn)

        const viewCodeBtn = document.createElement('button')
        viewCodeBtn.classList = 'image-button view-code-button';
        viewCodeBtn.addEventListener('click', () =>  {
            // temporary
            alert("Link to code!");
        })
        actions.appendChild(viewCodeBtn)

        // Append elements to the project div
        projectCardDiv.appendChild(title);
        projectCardDiv.appendChild(subtitle);
        projectCardDiv.appendChild(actions);

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