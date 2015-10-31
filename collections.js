//---------
//  Rooms
//---------
Rooms = new Mongo.Collection("Rooms");

RoomSchema = new SimpleSchema({
 
 title : {
   type: String
 },
 createdAt : {
 	type: Date
 },
 updatedAt : {
 	type: Date
 },
 ownerID : {
	 type : String
 },
 editorID : {
	 type : String
 }
 
});
//Rooms.attachSchema ???
//---------
//  Slots
//---------
Slots = new Mongo.Collection("Slots");

SlotSchema = new SimpleSchema(
{ 
 roomID: {
   	  type: String
 },
 name: {
   	  type: String
 },
 main_text : {
   type: String
 },
 secondary_text : {
   type: String
 },
 posLeft : {
   type: String
 },
 posTop : {
   type: String
 },
 posRight :{
   type: String
 },
 posBottom :{
   type: String
 },
 isPlaying : {
    type: Boolean,
    defaultValue: false//,
    // autoform: {
    //   type: 'toggle'
    // }
 },
 isEdited : {
	type : Boolean,
    defaultValue: false//,
    // autoform: {
    //   type: 'toggle'
    // }
 },
 editorID : {
	 type : String
 },
 animation : 
 {	type: {
	 enter : {
		 animType : {
			 type:String
		 },
		 duration : {
			 type : Number
		 },
		 easing :{
			 type : String
		 }
	 },
	 exit : {
		 animType : {
			 type:String
		 },
		 duration : {
			 type : Number
		 },
		 easing :{
			 type : String
		 }
	 },
	 during : {
		 animType : {
			 type:String
		 },
		 duration : {
			 type : Number
		 },
		 easing :{
			 type : String
		 }
	 }
	}
 },
 createdAt : {
 	type: Date
 },
 updatedAt : {
 	type: Date
 }
 
});