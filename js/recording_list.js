//Recording Model
var Recording = Backbone.Model.extend({

	//default attributes for the recording
	defaults: function(){
		return{
			title: "New Recording",
			order: Recordings.nextOrder()
		}
	},

	initialize: function(){
		if(!this.get("title"))
			this.set({"title": this.defaults.title})
	},

	rename: function(newTitle){
		this.save({title: newTitle});
	},

	clear:function(){
		this.destroy();
	}
})

var RecordingList = Backbone.Collection.extend({

	model: Recording,

	localStorage: new Store("songs-backbone"),

	nextOrder: function(){
		if(!this.length) return 1;
		return this.last().get('order') + 1;
	},

	comparator: function(recording){
		return recording.get('order');
	}
})

RecordingView = Backbone.View.extend({

	tagName: "li",

	template: _.template($('#recording-template').html()),

	events: {
		//TODO put events here
	},

	initialize: function(){
		this.model.bind('change', this.render, this);
		this.model.bind('destory', this.remove, this);
	},

	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		return this;
	}
})

Recordings = new RecordingList;

var RecordingListView = Backbone.View.extend({

	el: $("#recordingList"),

	events:{
		"click #newRecording": "createNewRecording"
	},

	initialize: function(){

		this.input = this.$("#newRecording");

		Recordings.bind('add', this.addOne, this);

		this.ul = this.$("ul")
	},

	addOne: function(recording){
		var view = new RecordingView({model:recording});
		this.ul.append(view.render().el);
	},

	createNewRecording: function(){
		Recordings.create();
	}
})

var RecordingsView = new RecordingListView;