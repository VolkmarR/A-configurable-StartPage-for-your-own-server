'use strict';

var configs = {};

function registerConfig(key, config) {
    configs[key] = config;
}

function buildConfig() {
    return {
        header: { title: "Hallo" },
        groups: [],

        setHeader: function (title) {
            this.header.title = title;
            return this;
        },
        addGroup: function (group) {
            this.groups.push(group);
            return this;
        }

    };
}

function buildGroup(title) {
    return {
        title: title,
        links: [],

        addLink: function (name, url, target = "_Blank") {
            this.links.push({ name: name, url: url, target: target });
            return this;
        }
    }
}

function init() {
    let params = getUrlParams();

    let config = getConfig(params.ConfigKey);

    renderTemplate("header", config);
    renderTemplate("links", config);
    renderBackground();
}

function renderTemplate(name, config) {
    const templateSouce = document.getElementById(name + '-template').innerHTML;
    const template = Handlebars.compile(templateSouce);
    document.getElementById(name).innerHTML = template(config);
}

function renderBackground() {
    document.body.style.backgroundImage = "url('background/1.jpg')";
}

function getConfig(key) {
    let config = configs[key];

    if (config != undefined)
        return config;

    return buildConfig()
        .setHeader("Example Config")
        .addGroup(
            buildGroup("Social")
                .addLink("Facebook", "https://www.facebook.com")
                .addLink("Twitter", "https://www.twitter.com")
        )
        .addGroup(
            buildGroup("Search")
                .addLink("Google", "https://google.com")
                .addLink("DuckDuckGo", "https://DuckDuckGo.com")
        )
        .addGroup(
            buildGroup("Git")
                .addLink("Github", "https://github.com")
        );
}

function getUrlParams() {
    var urlParams = new URLSearchParams(window.location.search);
    var params = {
        BackgroundImage: "",
        ConfigKey: ""
    };

    if (urlParams.has('bg'))
        params.BackgroundImage = urlParams.get('bg');
    if (urlParams.has('cfg'))
        params.ConfigKey = urlParams.get('cfg');

    return params;
}