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
	}

	rename: function(newTitle){
		this.save({title: newTitle});
	}

	clear:function(){
		this.destroy();
	}
})

var RecordingList = Backbone.Collection.extend({

	model: Recording,

	nextOrder: function(){
		if(!this.length) return 1;
		return this.last().get('order') + 1;
	}
})

