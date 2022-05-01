'use strict';

function init() {
    renderTemplate("header");
    renderTemplate("links");
    renderBackground();
}

function renderTemplate(name) {
    const templateSouce = document.getElementById(name + '-template').innerHTML;
    const template = Handlebars.compile(templateSouce);
    document.getElementById(name).innerHTML = template(config);
}

function renderBackground() {
    document.body.style.backgroundImage = "url('background/1.jpg')";
}