'use strict';

var configs = {};

function RegisterConfig(key, config) {
    configs[key] = config;
}

function BuildConfig() {
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

function BuildGroup(title) {
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
    let config = GetConfig("default");

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

function GetConfig(key) {
    let config = configs[key];

    if (config != undefined)
        return config;

    return BuildConfig()
        .setHeader("Example Config")
        .addGroup(
            BuildGroup("Social")
                .addLink("Facebook", "https://www.facebook.com")
                .addLink("Twitter", "https://www.twitter.com")
        )
        .addGroup(
            BuildGroup("Search")
                .addLink("Google", "https://google.com")
                .addLink("DuckDuckGo", "https://DuckDuckGo.com")
        )
        .addGroup(
            BuildGroup("Git")
                .addLink("Github", "https://github.com")
        );
}