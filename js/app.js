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
App.IndexController = Ember.ArrayController.extend({
    productsCount: Ember.computed.alias('length'),

    // Or you can write the same property in this way to keep watch for added products and update the 'length'
//    productsCount: function() {
//        return this.get('length');
//    }.property('length'),

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

App.ProductsController = Ember.ArrayController.extend({
   sortProperties: ['title']
});
// <!-- /CONTROLLERS -->

// <!-- ROUTES -->
App.IndexRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('product');
    }
});

App.ProductsRoute = Ember.Route.extend({
    model: function() {
        return this.store.findAll('product');
//        return this.store.find('product', {order: 'title'});
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
        image: 'http://placehold.it/250/000000/ffffff',
        reviews: [100]
    },
    {
        id: 2,
        title: 'Kindling',
        price: 249,
        description: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed semper eros ipsum, in condimentum leo pulvinar id. Aliquam egestas ut mi non vestibulum. Phasellus laoreet at enim vitae porttitor. Mauris pulvinar auctor justo, nec pulvinar dui. Ut placerat pulvinar dolor, ac lobortis purus. Proin ornare eget odio ac facilisis.',
        isOnSale: false,
        image: 'http://placehold.it/250/ff4900/ffffff'
    },
    {
        id: 3,
        title: 'Matches',
        price: 39,
        description: 'Suspendisse tincidunt justo eu diam tincidunt auctor. Nam ac odio lacus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Quisque varius euismod auctor. Ut sollicitudin dui eu magna vestibulum hendrerit. In hac habitasse platea dictumst. Praesent sit amet consectetur ligula. ',
        isOnSale: true,
        image: 'http://placehold.it/250/666666/ffffff',
        reviews: [101]
    },
    {
        id: 4,
        title: 'Firewood',
        price: 19,
        description: 'Malesuada fames ac ante ipsum primis in faucibus. Sed semper eros ipsum, in condimentum leo pulvinar id. Aliquam egestas ut mi non vestibulum. Phasellus laoreet at enim vitae porttitor. Mauris pulvinar auctor justo, nec pulvinar dui. Ut placerat pulvinar dolor, ac lobortis purus. Proin ornare eget odio ac facilisis.',
        isOnSale: true,
        image: 'http://placehold.it/250/330011/ffffff'
    },
    {
        id: 5,
        title: 'Torch',
        price: 129,
        description: 'Flames ac ante ipsum primis in faucibus. Sed semper eros ipsum, in condimentum leo pulvinar id. Aliquam egestas ut mi non vestibulum. Phasellus laoreet at enim vitae porttitor. Mauris pulvinar auctor justo, nec pulvinar dui. Ut placerat pulvinar dolor, ac lobortis purus. Proin ornare eget odio ac facilisis.',
        isOnSale: false,
        image: 'http://placehold.it/250/800080/ffffff'
    },
    {
        id: 6,
        title: 'Brush',
        price: 29,
        description: 'Brush ante ipsum primis in faucibus. Sed semper eros ipsum, in condimentum leo pulvinar id. Aliquam egestas ut mi non vestibulum. Phasellus laoreet at enim vitae porttitor. Mauris pulvinar auctor justo, nec pulvinar dui. Ut placerat pulvinar dolor, ac lobortis purus. Proin ornare eget odio ac facilisis.',
        isOnSale: false,
        image: 'http://placehold.it/250/000080/ffffff'
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

