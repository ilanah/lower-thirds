// counter starts at 0
Meteor.startup(function () {
  // code to run on server at startup
  console.log('on client startup');
  Hooks.init();
});
Template.registerHelper("prettifyDate", function(date) {
    return date.toLocaleString();
});
Template.registerHelper("userName", function(userId) {
    return Meteor.users.findOne(userId).emails[0].address;
});

/*===============
	nav
  ===============*/  
  Template.nav.helpers({
    currUser : function(){
      return Meteor.user();
    }  	
  })
/*===============
	main
  ===============*/
  Template.main.onRendered(function () {
    Accounts._loginButtonsSession.set('dropdownVisible', true);
    Session.set("Meteor.loginButtons.dropdownVisible",true);
  });

  Template.main.helpers({
    loggedin : function(){
      return Meteor.user()!=null;
    },
    rooms : function() {
      return Rooms.find({}, {sort: {updatedAt: -1}});//.fetch();
    },
    userID : function() {
    	//var user = 
    	return Meteor.user().emails[0].address.split('@')[0].replace('.',' ') || Meteor.userId();
    }
  });

  Template.main.events({
	  'click #newRoom': function(e, template){
	   	Rooms.insert({title:'New Room',createdAt: new Date(),updatedAt: new Date(),
	   				  ownerID:Meteor.userId(),editorID:Meteor.userId()});
	  }
  });

/*===============
	loginButtons
  ===============*/  
  Template.loginButtons.events({
    ready : function(){
      console.log("login button="+$("#login-sign-in-link"));
      $("#login-sign-in-link").click();
    }
  });
/*===============
	room
  ===============*/  
  Template.room.helpers({
  	slots : function() {
      return Slots.find({roomID:this._id}, {sort: {updatedAt: -1}});
    },
    isNew : function() {
    	return this.title == 'New Room';
    }

  });
  Template.room.events({
  	'change #roomTitle': function(e, template){
	    this.title = $('#roomTitle').val();
	    Rooms.update(this._id, 
	    	{$set:{ title:$('#roomTitle').val(), 
	    			updatedAt: new Date(),
	    			editorID: Meteor.userId()
	    		}});
	     
	  }

  })
/*===============
	roomPage
  ===============*/
  Template.roomPage.onRendered(function() {
  	  $('.ui.embed').embed({
      source      : 'youtube',
      url         : "http://www.youtube.com/embed/hgjyr6BPAtA?autohide=1&autoplay=0&controls=0&showinfo=0&rel=0&color=white&hq=1&jsapi=1&modestbranding=1&enablejsapi=1&volume=0&mute=1",
      Callbacks   :
        {
          onCreate : function(url) {
            debugger;//$module
          },
          onDisplay: function() {
            debugger;//$module
          }
        }
    });
    // $('.ui.embed > * > iframe').each(function(ind,item){
    //                                     $(item).on("load", function(evt){ 
    //                                         $(this).on("ready playerReady",function(evt2){
    //                                           debugger;
    //                                           //$( "#player" ).mute(); 
    //                                         })                                       
    //                                     } );
    //                                   });  
  });

  Template.roomPage.helpers({
  	slots : function() {
      return Slots.find({roomID:this._id}, {sort: {updatedAt: -1}});
    }

  });
  Template.roomPage.events({
	  'click #newSlot': function(e, template){
	   	Slots.insert({roomID:this._id, 
	   				  name:'New Slot',
	   				  createdAt: new Date(),
	   				  updatedAt: new Date(),
	   				  editorID:Meteor.userId(),
	   				  main_text:'main description', 
	   				  secondary_text:'second description', 
	   				  isPlaying:false, 
	   				  isEdited:true
	   				});
	  }
  })
/*===============
	slot
  ===============*/
  Template.slot.helpers({
    isNew : function() {
    	return this.name == 'New Slot';
    }  	
  })
  Template.slot.events({
      'change #slotName': function(e, template){
	    this.name = $('#slotName').val();
	    Slots.update(this._id, 
	    	{$set:{ name:$('#slotName').val(), 
	    			updatedAt: new Date(),
	    			editorID: Meteor.userId(), 
	   				isEdited:false
	    		}});
	     
	  }
  })

/*
Rooms.upsert(Rooms.findOne({'title':'Room 2'})._id,{title:'Room 2',slots:[{name:'Slot 1',main_text:'Main',secondary_text:'Bla Bla',editorID:Meteor.userId(),isPlaying:false,isEdited:false}]})
*/
//*******
  // counter starts at 0
  // Session.setDefault('counter', 0);

  // Template.rooms.helpers({
  //   counter: function () {
  //     return Session.get('counter');
  //   }
  // });

  // Template.rooms.events({
  //   'click button': function () {
  //     // increment the counter when button is clicked
  //     Session.set('counter', Session.get('counter') + 1);
  //   }
  // });
