var App = Ember.Application.create({
	LOG_TRANSITIONS: true
});

App.Router.map(function() {
	this.route('about');
    this.resource('products', function() {
      this.resource('product', {path: '/:product_id'});
    });
});

App.ApplicationAdapter = DS.FixtureAdapter.extend();

// <!-- CONTROLLERS -->
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
// <!-- /CONTROLLERS -->

// <!-- ROUTES -->
App.ProductsRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('product');
    }
});

App.ProductRoute = Ember.Route.extend({
    model: function(params) {
        return this.store.find('product', params.product_id);
    }
});
// <!-- /ROUTES -->

// <!-- MODELS -->
App.Product = DS.Model.extend({
    title: DS.attr('string'),
    price: DS.attr('number'),
    description: DS.attr('string'),
    isOnSale: DS.attr('boolean'),
    image: DS.attr('string'),
    reviews: DS.hasMany('review', {async: true}) // Establish an association
});

App.Review = DS.Model.extend({
    text: DS.attr('string'),
    reviewedAt: DS.attr('date')
});
// <!-- /MODELS -->


// <!-- FIXTURES -->
App.Product.FIXTURES = [
    {
        id: 1,
        title: 'Flint',
        price: 99,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed placerat, dui vitae sodales laoreet, eros enim accumsan neque, sit amet eleifend dolor urna ultricies diam. Mauris ac pellentesque odio, ut adipiscing massa. Integer eget tempor sem. Mauris sodales mi ultricies, ornare velit vel, mollis nibh. ',
        isOnSale: true,
        image: 'http://placehold.it/250',
        reviews: [100]
    },
    {
        id: 2,
        title: 'Kindling',
        price: 249,
        description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed semper eros ipsum, in condimentum leo pulvinar id. Aliquam egestas ut mi non vestibulum. Phasellus laoreet at enim vitae porttitor. Mauris pulvinar auctor justo, nec pulvinar dui. Ut placerat pulvinar dolor, ac lobortis purus. Proin ornare eget odio ac facilisis.',
        isOnSale: false,
        image: 'http://placehold.it/250'
    },
    {
        id: 3,
        title: 'Matches',
        price: 39,
        description: 'Suspendisse tincidunt justo eu diam tincidunt auctor. Nam ac odio lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque varius euismod auctor. Ut sollicitudin dui eu magna vestibulum hendrerit. In hac habitasse platea dictumst. Praesent sit amet consectetur ligula. ',
        isOnSale: true,
        image: 'http://placehold.it/250',
        reviews: [101]
    }
];

App.Review.FIXTURES = [
    {
        id: 100,
        product: 2,
        text: "Best. Kindling. EVER!"
    },
    {
        id: 101,
        product: 3,
        text: "Pardon the pun, but these matches are matchless."
    }
];
// <!-- /FIXTURES -->

