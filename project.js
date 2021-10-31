var single_project = $("#project")

const urlParams = new URLSearchParams(window.location.search);
const id = parseInt(urlParams.get('id'));

fetch('data.json')
.then(response=>response.json())
.then((result)=>{
    var projects = result['projects'];
    var project = projects.find(x=>x.id === id);
    console.log(project);

    var proj = `<div class='sp-text'>
                <h1>${project.title}</h1>
                <h3>${project.subtitle}</h3>
                <br/>
                <p>
                   ${project.about}
                   <br/>
                   Languages: ${project.languages}
                </p>
                <a href=${project.github}><img class='icon-sp' src='./assets/github_black.png'/></a>
            </div>
            <img src=${project.gif}/>`

    single_project.html(proj);

})
$('#footer').html('<a href="https://github.com/ishita1805/ResuME" target="__blank">Made using ResuME - Website Generator</a>')