'use strict';

function init() {
    renderTemplate("header");
     renderTemplate("links");
}

function renderTemplate(name)
{
    const templateSouce = document.getElementById(name + '-template').innerHTML;
    const template = Handlebars.compile(templateSouce);
    document.getElementById(name).innerHTML = template(config);
}
