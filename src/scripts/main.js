(function(){
    'use strict'

    var App = {};

    App.Views = {};

    App.Views.Nav = Backbone.View.extend({
        render: function(){
            this.$el.html( _.template(  '<ul role="nav" class="nav-items">'+
                                            '<li><a href="/v2/">Dashboard</a></li>'+
                                            '<li><a href="/v2/#/processes">Processes</a></li>'+
                                            '<li><a href="/v2/#/binaries">Binaries</a></li>'+
                                            '<li><a href="/#/sensors">Sensors</a></li>'+
                                            '<li><a href="/#/settings">Settings</a></li>'+
                                        '</ul>') );
            return this;
        }
    });

    App.Views.Sensors = Backbone.View.extend({
        render: function(){
            this.$el.html( _.template('<h1>Sensors</h1>') );
            return this;
        }
    });

    App.Views.Settings = Backbone.View.extend({
        render: function(){
            this.$el.html( _.template('<h1>Settings</h1>') );
            return this;
        }
    });

    var Router = Backbone.Router.extend({
        
        routes: {
            "sensors" : "sensors",
            "settings" : "settings"
        },
        
        sensors: function() {
            var sensorsView = new App.Views.Sensors();
            sensorsView.render();
            $(".main-container").html(sensorsView.el);
        },

        settings: function() {
            var settingsView = new App.Views.Settings();
            settingsView.render();
            $(".main-container").html(settingsView.el);
        }

    });

    App.router = new Router();
    Backbone.history.start();

    var navView = new App.Views.Nav();
    navView.render();
    $(".nav-container").html(navView.el);

}());