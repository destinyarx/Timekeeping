$(document).ready(function() {
    var App = {
        canvas: $("#canvas"),
        api: Config.url + "/api",
        path: Config.url + "/auth",
        token: localStorage.getItem("token"),
        uniqueID: localStorage.getItem("userid"),
        authntication: function() {
            if(App.token === 0 || App.token === null || App.uniqueID === 0 || App.uniqueID === null) {
                window.location.href = "/auth/#/login/"; //alert("Logout");
            }else {
                alert("Login");
            }
        },
        initialize: function() {
            App.authntication();
        }
    }

    App.initialize();

    $.Mustache.options.warnOnMissingTemplates = true;

    $.Mustache.load('templates/auth.html').done(function() {

        Path.map("#/login/").to(function() {
            App.canvas.html("").append($.Mustache.render('loginPage'));
        });

        Path.map("#/reset/password/").to(function() {
            App.canvas.html("").append($.Mustache.render('forgotPasswordPage'));
        });

        Path.map("#/signup/").to(function() {
            App.canvas.html("").append($.Mustache.render('samplePage'));
        });

        Path.root("#/login/");

        Path.listen();        
    });
});