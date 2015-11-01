Meteor.startup(function () {
    // code to run on server at startup
	console.log('on server startup')
 
});
Hooks.onLoggedIn = function (userId) 
{ 

}
Meteor.methods({
    'isUserAdmin': function() 
    {
      var user = Meteor.users.findOne({_id: Meteor.userId()});
      var isAdmin=false;
      if (user && user.emails.length && user.emails[0].address=="ilana.hakim@gmail.com")
          isAdmin=true;
        return isAdmin;
    },    
    'initData': function () 
    {
      /* CALL FROM CLIENT:       Meteor.call('initData',Meteor.userId()); */
		//clear all
		var userId=Meteor.userId();

		Slots.remove({});
		Rooms.remove({});
	    
	 	//demo data!!!
		if (Rooms.find().count() === 0) 
	  	{
			Rooms.insert({ title:'Room 1', createdAt: new Date(), updatedAt: new Date(), ownerID:userId, editorID:userId });
			Rooms.insert({ title:'Room 2', createdAt: new Date(), updatedAt: new Date(), ownerID:userId, editorID:userId });
			Rooms.insert({ title:'Room 3', createdAt: new Date(), updatedAt: new Date(), ownerID:userId, editorID:userId });
			
			Slots.insert({ roomID:Rooms.findOne({'title':'Room 2'})._id,
				name:'Meteor Hackathon',main_text:'Meteor.js hackathon',secondary_text:'10-11 October, 2015',
				posLeft:'1%',posTop:'10%',
				editorID:userId,isPlaying:false,isEdited:false,createdAt: new Date(),updatedAt: new Date()});

			Slots.insert({roomID:Rooms.findOne({'title':'Room 2'})._id,
				name:'Semantics-ui',main_text:'Built this app',secondary_text:'in two days, using meteor.js and Semantics-ui',
				posLeft:'20vw',posTop:'33vw',
				editorID:userId,isPlaying:true,isEdited:false,createdAt: new Date(),updatedAt: new Date()});

			Slots.insert({roomID:Rooms.findOne({'title':'Room 2'})._id,name:'Slot 3',main_text:'Main3',secondary_text:'Bla Bla 3',
				posLeft:'0vw',posTop:'10vw',
				editorID:userId,isPlaying:false,isEdited:true,createdAt: new Date(),updatedAt: new Date()});

			Rooms.update(Rooms.findOne({'title':'Room 2'})._id, {$set:{updatedAt: new Date()}});
		}
    }
});
