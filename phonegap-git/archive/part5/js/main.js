var app = {

    findByName: function() {
        console.log('findByName');
        var self = this;
        this.store.findByName($('.search-key').val(), function(employees) {
            $('.employee-list').html(self.employeeLiTpl(employees));
        });
    },

    initialize: function() {
        var self = this;
        this.homeTpl = Handlebars.compile($("#home-tpl").html());
        this.employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
        this.store = new MemoryStore(function() {
            self.renderHomeView();
        });
    },
    
    showAlert: function(message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);                
        }
    },
    
    renderHomeView: function() {
        $('body').html(this.homeTpl());
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    },
    
    renderIframe: function () {
        var html = '<iframe src="https://studip.serv.uni-osnabrueck.de/plugins.php/studipmobile" width="100%" height="100%" name="website"></iframe>';
        $('body').html(html);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
    }
    
    

};

app.initialize();