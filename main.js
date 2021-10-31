// dynamically add data to html file

// declaring variables
var user_name = $('#p-name')
var user_tag = $('#p-tag')
var about = $('#about-text')
var work = $('#work')
var projects = $('#project-cont')
var skills = $('#skills-cont')
var footer = $('#footer')
var git = $('#github')
var lin = $('#linkedin')

var navigation = $('#navigation')

var aboutMain = $('#about')
var education = $('#education')
var certification = $('#certifications')
var skillsMain = $('#skills')
var workMain = $('#experiences')
var projectsMain = $('#projects')

fetch('data.json')
.then(response=>response.json())
.then((result)=>{
    
    user_name.text('I am '+result['profile']['Name'])
    user_tag.text(result['profile']['Headline']+' from '+result['profile']['Location'])
    git.attr("href", result['social'][1])
    lin.attr("href", result['social'][0])


    if(result['about']){ 
        about.text(result['about'])
        navigation.append("<li class='nav-items'><a href='#about'>About</a></li>")
    }
    else {
        aboutMain.remove()
    }

    if(result['education']){
        result['education'].forEach(element => {
            var edu = `<div class='education-cont'>
                            ${element['Institute']?`<h3>${element['Institute']}</h3>`:''}
                            ${element['Degree Name']?`<p><b>${element['Degree Name']}</b></p>`:''}
                            ${element['Field Of Study']?`<p>${element['Field Of Study']}</p>`:''}
                            ${element['Dates attended or expected graduation']?`<p>${element['Dates attended or expected graduation']}</p>`:''}
                        </div>`
            education.append(edu)
        });
    }
    else {
        education.remove()
    }

    if(result['certifications']){
        result['certifications'].forEach(element => {
            var cer = `<div class='education-cont'>
                            ${element['Title']?`<h3>${element['Title']}</h3>`:''}
                            ${element['Issuing authority']?`<p><b>${element['Issuing authority']}</b></p>`:''}
                            ${element['Issued date and, if applicable, expiration date of the certification or license']?`<p>${element['Issued date and, if applicable, expiration date of the certification or license']}</p>`:''}
                            ${element['Credential Identifier']?`<p>${element['Credential Identifier']}</p>`:''}
                        </div>`
                        certification.append(cer)
        });
    }
    else {
        certification.remove()
    }

    if(result['skills']){
        result['skills'].forEach(element => {
            var skill = ` <li>${element}</li>`
            skills.append(skill)
        });
        navigation.append(" <li class='nav-items'><a href='#skills'>Skills</a></li>")
    } 
    else {
        skillsMain.remove()
    }

    if(result['experience']){
        result['experience'].forEach(element => {
            if(element['Roles']){
                var exp = `<div class='exp'>
                                <div class='exp-bullet'></div>
                                <div class='exp-col'>
                                    ${element['Roles'][0]['Title']?`<h3>${element['Roles'][0]['Title']}</h3>`:''}
                                    ${element['Company Name']?`<b>${element['Company Name']}</b>`:''}
                                    ${element['Roles'][0]['Dates Employed']?`<p>${element['Roles'][0]['Dates Employed']}</p>`:''}
                                    ${element['Location']?`<p>${element['Location']}</p>`:''}    
                                </div>
                            </div>`
                work.append(exp)
            }
            else {
                var exp = `<div class='exp'>
                            <div class='exp-bullet'></div>
                            <div class='exp-col'>
                                    ${element['Role']?`<h3>${element['Role']}</h3>`:''}
                                    ${element['Company Name']?`<b>${element['Company Name']}</b>`:''}
                                    ${element['Dates Employed']?`<p>${element['Dates Employed']}</p>`:''}
                                    ${element['Location']?`<p>${element['Location']}</p>`:''}    
                            </div>
                        </div>`
                work.append(exp)
            }
        });
        navigation.append(" <li class='nav-items'><a href='#experiences'>Work</a></li>")
    }
    else {
        workMain.remove()
    }

    if(result['projects']){
        result['projects'].forEach(element => {
            var project = `<div class='project-card' style='background-image:url(${element.img})'>
                                <div class='project-inner'>
                                <b>${element.title}</b>
                                <p>Languages: ${element.languages===null?'Other':element.languages}</p>
                                ${element.about?`<p class='project-text'>
                                    ${element.about.substring(0,80)}...
                                </p>`:''}
                                <div class='icons-proj'>
                                <a href='${element.github}' target='__blank'><img class='icon' src='./assets/github.png'/></a>
                                <a href='/project.html?id=${element.id}' target='__blank'>View Project</a>
                                </div>
                                </div>
                            </div>`
            projects.append(project)
        });
        navigation.append("<li class='nav-items'><a href='#projects'>Projects</a></li>")
    }
    else {
        projectsMain.remove()
    }
    footer.html('<a href="https://github.com/ishita1805/ResuME" target="__blank">Made using ResuME - Website Generator</a>')
})
