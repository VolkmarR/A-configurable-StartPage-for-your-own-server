'use strict';

function init() {
    renderLinks();
}

function renderLinks()
{
    const templateSouce = document.getElementById('links-template').innerHTML;
    const template = Handlebars.compile(templateSouce);
    document.getElementById('links').innerHTML = template(config);


}