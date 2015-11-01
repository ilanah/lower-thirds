Router.route('/', function () {
  //var item = Items.findOne({_id: this.params._id});
  this.render('app');
});
Router.route('/room/:_id', function () {
  var roomID = this.params._id.substr(1);//to remove :
  var room = Rooms.findOne({_id: roomID});
  this.render('roomPage', {data: room});
});

Router.route('logout', {
      path: '/logout',
      onBeforeAction: [function() {
          this.redirect('/');
      }],
      waitOn: function() { return Meteor.logout()}
  });
Router.route('reset', {
  path: '/reset',
  onBeforeAction: [function() {
      this.redirect('/');
  }],
  waitOn: function() { Meteor.call('initData');}
});

// Router.route('/room/:id/slots/:id', function () {
//   var slot = Slots.findOne();
//   this.render('slot', {data: slot});
// });
