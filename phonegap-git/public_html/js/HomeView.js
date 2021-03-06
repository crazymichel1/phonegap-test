var HomeView = function(store) {
    this.render = function() {
        this.el.html(HomeView.template());
        return this;
    };
    
    this.findByName = function() {
        store.findByName($('.search-key').val(), function(members) {
            $('.member-list').html(HomeView.liTemplate(members));
            if (self.iscroll) {
                console.log('Refresh iScroll');
                self.iscroll.refresh();
            } else {
                console.log('New iScroll');
                self.iscroll = new iScroll($('.scroll', self.el)[0], {hScrollbar: false, vScrollbar: false });
            }
        });
    }; 

    this.initialize = function() {
        // div wrapper für die view. nur um events daran binden zu können.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };
    this.initialize();
    
    
};
 
HomeView.template = Handlebars.compile($("#home").html());
HomeView.liTemplate = Handlebars.compile($("#member-li").html());