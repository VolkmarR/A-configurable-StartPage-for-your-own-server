'use strict';

var configs = {};
var backgroundsLight = {};
var backgroundsDark = {};
var lastDate

function registerConfig(key, config) {
    configs[key] = config;
}

function buildConfig() {
    return {
        groups: [],

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

function registerBackground(key, path, isLight) {

    if (isLight)
        backgroundsLight[key] = path;
    else
        backgroundsDark[key] = path;
}

function renderTemplate(name, config) {
    const templateSouce = document.getElementById(name + '-template').innerHTML;
    const template = Handlebars.compile(templateSouce);
    document.getElementById(name).innerHTML = template(config);
}

function renderBackground(backgroundKey, isDark) {
    var background
    if (backgroundKey) {
        background = backgroundsDark[backgroundKey];
        if (background == undefined)
            background = backgroundsLight[backgroundKey];
    }

    if (background == undefined) {
        var backgrounds = backgroundsLight
        if (isDark)
            backgrounds = backgroundsDark;

        var backgroundKeys = Object.keys(backgrounds)
        background = backgrounds[backgroundKeys[Math.floor(Math.random() * backgroundKeys.length)]];
    }

    if (background != undefined) {
        const unsplashRegex = /\/(?<name>.*)-(?<id>.{11})-unsplash.jpg/i;
        let creditsMatch = background.match(unsplashRegex);
        if (creditsMatch && creditsMatch.groups.name && creditsMatch.groups.id)
            renderTemplate("credits", { name: creditsMatch.groups.name.replace("-", " "), id: creditsMatch.groups.id });

        document.body.style.backgroundImage = "url('background/" + background + "')";
    }
}

function renderDateTime() {
    let currentDate = new Date();
    currentDate.setSeconds(0, 0);
    if (lastDate != currentDate.toTimeString()) {
        lastDate = currentDate.toTimeString()
        let dateOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" };
        document.getElementById("date").innerHTML = currentDate.toLocaleDateString(undefined, dateOptions);
        document.getElementById("time").innerHTML = currentDate.getHours().toString().padStart(2, "0") + ":" + currentDate.getMinutes().toString().padStart(2, "0");
    }
}

function getConfig(key) {
    let config = configs[key];

    if (config != undefined)
        return config;

    return buildConfig()
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
        BackgroundKey: "",
        IsDark: window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches,
        ConfigKey: ""
    };

    if (urlParams.has('bg'))
        params.BackgroundKey = urlParams.get('bg');
    if (urlParams.has('cfg'))
        params.ConfigKey = urlParams.get('cfg');
    if (urlParams.has('drk'))
        params.IsDark = urlParams.get('drk') == 1;

    return params;
}

