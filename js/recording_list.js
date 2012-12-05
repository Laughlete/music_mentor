$(function(){
	//Recording Model
	Recording = Backbone.Model.extend({

		//default attributes for the recording
		defaults: function(){
			return{
				title: "New Recording",
				order: Recordings.nextOrder(),
				selected: false,
				playing: false,
				paused: false,
				clip: undefined,
				constantlyRefreshing: false
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
			this.stopPlayback()
			this.destroy();
		},

		stopPlayback: function(){
			if(this.get('clip') !== undefined){
				this.get("clip").pause()
				this.get("clip").currentTime = 0
			}
			this.set({"selected":false,"playing":false,"paused":false,"constantlyRefreshing":false})			
		},

		select: function(){
			musicMentor.selectedRecording = this
			this.set({"selected":true})
		},

		unSelect: function(){
			musicMentor.selectedRecording = undefined
			this.stopPlayback()			
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
			"click .firstLine": "selectRecording",
			"click .renameBtn": "renameRecording",
			"click .playBtn": "startPlayback",
			"click .rewBtn": "rewindPlayback",
			"click .pauseBtn": "pausePlayback",
			"click .fwdBtn": "fastForwardPlayback",
			"click .stopBtn": "stopPlayback",
			"click .duplicateBtn": "duplicateRecording",
			"click .removeBtn": "removeRecording"
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

		renameRecording: function(){
			musicMentor.popupDialog(function(recordingName){
				musicMentor.selectedRecording.rename(recordingName)
			}, musicMentor.selectedRecording.get("title"))
		},

		constantRefresh: function(){
			var timeout = 1000
			var that=this;
			var toDo = function(){
				if(musicMentor.recordingsView !== undefined)
					musicMentor.recordingsView.render()
				if(that.model.get("constantlyRefreshing")){
					setTimeout(toDo, timeout)
				}
			}
			setTimeout(toDo, timeout)
		},

		startPlayback: function(){
			if(this.model.get("clip") === undefined)
				this.model.set({"clip": new Audio("../sounds/All.mp3")})
			this.model.get("clip").play()
			this.model.set({"playing":true})
			this.model.set({"paused":false})
			this.model.set({"constantlyRefreshing":true})
			this.constantRefresh()
		},

		rewindPlayback: function(){
			if(this.model.get("clip").currentTime < 10)
				this.model.get("clip").currentTime = 0
			else
				this.model.get("clip").currentTime -= 10
		},

		pausePlayback: function(){
			this.model.get("clip").pause()
			this.model.set({"paused":true})
		},

		stopPlayback: function(){
			this.model.set({"playing":false})
			this.model.set({"paused":false})
			this.model.set({"constantlyRefreshing":false})
			this.model.get("clip").pause()
			this.model.get("clip").currentTime = 0
		},

		fastForwardPlayback: function(){
			if(this.model.get("clip").currentTime + 30 > this.model.get("clip").duration)
				stopPlayback()
			else
				this.model.get("clip").currentTime += 30
		},

		duplicateRecording: function(){
			var newOrder = musicMentor.selectedRecording.get("order") + 1;
			var newTitle = "copy of " + musicMentor.selectedRecording.get("title")
			var newSelected = false
			musicMentor.selectedSong.createRecording({title:newTitle, selected:newSelected})

			musicMentor.selectedSong.get("recordings").each(function(recording){
				if(recording.get("order") >= newOrder)
					recording.set({order: recording.get("order") + 1})
				if(recording == musicMentor.selectedSong.get("recordings").last())
					recording.set({order:newOrder})
			})
		},

		selectRecording: function(){
			var selectedPrev = this.model.get("selected")
			Recordings.each(function(recording){
				recording.unSelect()
			})
			if(selectedPrev){
				this.model.unSelect()
				this.stopPlayback()
			}
			else{
				this.model.select()
			}
		},

		removeRecording: function(){
			var removeOrder = this.model.get("order")
			musicMentor.selectedSong.get("recordings").each(function(recording){
				if(recording.get("order") > removeOrder)
					recording.set({"order":recording.get("order") - 1})
			})
			this.model.clear()
			musicMentor.selectedRecording = undefined
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
			recordingListViewReference = this
		},

		addOne: function(recording){
			var view = new RecordingView({model:recording});
			recordingListViewReference.ul.append(view.render().el);
		},

		addAll: function(){
			for(var i=1; i<=Recordings.models.length; i++)
			{
				Recordings.each(function(recording){
					if(recording.get("order") == i)
						recordingListViewReference.addOne(recording)
				})
			}
		},

		createNewRecording: function(){
			var recordingName = new Date();
			musicMentor.selectedSong.createRecording({title: recordingName})
		},

		render: function(){
			$("#recordingList ul > li").remove()
			recordingListViewReference.addAll()
		}
	})

	RecordingsView = new RecordingListView;
	musicMentor.recordingsView = RecordingsView;
})