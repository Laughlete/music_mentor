$(function(){
	//Recording Model
	Recording = Backbone.Model.extend({

		//default attributes for the recording
		defaults: function(){
			return{
				title: "New Recording",
				order: Recordings.nextOrder(),
				selected: false
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
		},

		select: function(){
			musicMentor.selectedRecording = this
			this.set({"selected":true})
		},

		unSelect: function(){
			musicMentor.selectedRecording = undefined
			this.set({"selected":false})
		}
	})

	RecordingList = Backbone.Collection.extend({

		model: Recording,

		localStorage: new Store("recordings-backbone"),

		nextOrder: function(){
			if(!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(recording){
			return recording.get('order');
		}
	})

	Recordings = new RecordingList;

	RecordingView = Backbone.View.extend({

		tagName: "li",

		template: _.template($('#recording-template').html()),

		events: {
			"click .recording1stLine": "selectRecording",
			"click .renameRecordingBtn": "renameRecording",
			"click .duplicateRecordingBtn": "duplicateRecording"
		},

		initialize: function(){
			this.model.bind('change', this.render, this);
			this.model.bind('destory', this.remove, this);
		},

		render: function(){
			if(this.model.get("selected"))
				this.$el.attr("class", "selected")
			else
				this.$el.attr("class", "unselected")
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		selectRecording: function(){
			var selectedPrev = this.model.get("selected")
			Recordings.each(function(recording){recording.set({"selected":false})})
			if(selectedPrev){
				this.model.unSelect()
			}
			else{
				this.model.select()
			}
		},

		renameRecording: function(){
			musicMentor.popupDialog(function(recordingName){
				musicMentor.selectedRecording.rename(recordingName)
			}, musicMentor.selectedRecording.get("title"))
		},

		duplicateRecording: function(){
			var newOrder = musicMentor.selectedRecording.get("order") + 1;
			var newTitle = "copy of " + musicMentor.selectedRecording.get("title")
		}
	})

	RecordingListView = Backbone.View.extend({

		el: $("#recordingList"),

		events:{
			"click #newRecording": "createNewRecording"
		},

		initialize: function(){

			this.input = this.$("#newRecording");

			Recordings.bind('add', this.addOne, this);
			Recordings.bind('reset', this.addAll, this);
			Recordings.bind('all', this.render, this);

			this.ul = this.$("ul")
			that = this
		},

		addOne: function(recording){
			var view = new RecordingView({model:recording});
			that.ul.append(view.render().el);
		},

		addAll: function(){
			Recordings.each(this.addOne)
		},

		createNewRecording: function(){
			var recordingName = new Date();
			musicMentor.selectedSong.createRecording({title: recordingName})
		},

		render: function(){
			$("#recordingList ul > li").remove()
			that.addAll()
		}
	})

	RecordingsView = new RecordingListView;
})