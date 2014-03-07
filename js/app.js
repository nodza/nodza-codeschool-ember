var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
	this.route('about');
    this.resource('products');
    this.resource('product', {path: '/products/:title'});
});

App.IndexController = Ember.Controller.extend({
    productsCount: 75,
    product_icon: 'images/box.png',
    time: function() {
        return (new Date()).toDateString()
    }.property()
});

App.AboutController = Ember.Controller.extend({
    contactName: "Noel Hwande",
    avatar: 'http://placehold.it/24',
    open: function() {
        return ((new Date()).getDay() === 1) ? "Sorry, we are closed today." : "Please come in. We're open";
    }.property()
});

App.ProductsRoute = Ember.Route.extend({
    model: function() {
        return App.PRODUCTS;
    }
});

App.ProductRoute = Ember.Route.extend({
    model: function(params) {
        return App.PRODUCTS.findBy('title', params.title);
    }
});

App.PRODUCTS = [
    {
        title: 'Flint',
        price: 99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat, dui vitae sodales laoreet, eros enim accumsan neque, sit amet eleifend dolor urna ultricies diam. Mauris ac pellentesque odio, ut adipiscing massa. Integer eget tempor sem. Mauris sodales mi ultricies, ornare velit vel, mollis nibh. ',
        isOnSale: true,
        image: 'http://placehold.it/250'
    },
    {
        title: 'Kindling',
        price: 249,
        description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed semper eros ipsum, in condimentum leo pulvinar id. Aliquam egestas ut mi non vestibulum. Phasellus laoreet at enim vitae porttitor. Mauris pulvinar auctor justo, nec pulvinar dui. Ut placerat pulvinar dolor, ac lobortis purus. Proin ornare eget odio ac facilisis.',
        isOnSale: false,
        image: 'http://placehold.it/250'
    },
    {
        title: 'Matches',
        price: 39,
        description: 'Suspendisse tincidunt justo eu diam tincidunt auctor. Nam ac odio lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque varius euismod auctor. Ut sollicitudin dui eu magna vestibulum hendrerit. In hac habitasse platea dictumst. Praesent sit amet consectetur ligula. ',
        isOnSale: true,
        image: 'http://placehold.it/250'
    }
];