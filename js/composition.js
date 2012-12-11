$(function(){
	//Composition Model
	Composition = Backbone.Model.extend({

		//default attributes for the recording
		defaults: function(){
			return{
				title: "New Composition",
				stopped: true,
				playing: false,
				paused: false,
				clip: undefined,
				constantlyRefreshing: false,
				currentTime: 0
			}
		},

		initialize: function(){
			if(!this.get("title") || this.get("title").length == 0)
				this.set({"title": this.defaults.title})
		},

		rename: function(newTitle){
			this.save({title: newTitle})
		},

		clear:function(){
			this.stopPlayback()
			this.destroy();
		},

		startPlayback:function(){
			if(this.get("clip") === undefined)
				this.set({"clip": new Audio("../sounds/All.mp3")})
			this.get("clip").play()
			this.set({"playing":true,"paused":false})
			this.set({"stopped":false})
			this.startRefreshing();
		},

		pausePlayback:function(){
			this.get("clip").pause()
			this.set({"paused":true})
			this.stopRefreshing()
		},

		movePlayback:function(offset){
			var newTime = this.get("clip").currentTime + offset
			if(newTime < 0)
				this.get("clip").currentTime = 0
			else if(newTime > this.get("clip").duration)
				stopPlayback()
			else
				this.get("clip").currentTime = newTime
			this.set({"currentTime":newTime})
		},

		startRefreshing:function(){
			var timeout = 1000
			var that = this
			var toDo = function(){
				if(that !== undefined)
					that.set({"currentTime":that.get("clip").currentTime})
				if(that != undefined && that.get("constantlyRefreshing")){
					setTimeout(toDo, timeout)
				}
			}
			this.set({"constantlyRefreshing": true})
			setTimeout(toDo, timeout)
		},

		stopRefreshing:function(){
			this.set({"constantlyRefreshing": false})
		},

		stopPlayback:function(){
			if(this.get('clip') !== undefined){
				this.get('clip').pause()
				this.get('clip').currentTime = 0
			}
			this.stopRefreshing()
			this.set({playing: false, paused:false, stopped:true})
		},

		select: function(){
			musicMentor.selectedComposition = this
			this.set({"selected":true})
		},

		unSelect: function(){
			musicMentor.selectedComposition = undefined
			this.stopPlayback()
			this.set({"selected":false})
		}
	})

	CompositionModel = new Composition

	CompositionView = Backbone.View.extend({

		el: $("#playback"),

		template: _.template($('#playback-template').html()),

		events:{
			"click .playBtn": "startPlayback",
			"click .rewBtn": "rewindPlayback",
			"click .pauseBtn": "pausePlayback",
			"click .fwdBtn": "fastForwardPlayback",
			"click .stopBtn": "stopPlayback",
		},

		initialize: function(){
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
			this.render()
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		selectComposition: function(){
			var selectedPrev = this.model.get("selected")
			Compositions.each(function(composition){composition.set({"selected":false})})
			if(selectedPrev)
				this.model.unSelect()
			else
				this.model.select()
		},

		renameComposition: function(){
			musicMentor.popupDialog(function(compositionName){
				musicMentor.selectedComposition.rename(compositionName)
			}, musicMentor.selectedComposition.get("title"))
		},

		startPlayback: function(){
			this.model.startPlayback()
		},

		rewindPlayback: function(){
			this.model.movePlayback(-10)
		},

		pausePlayback: function(){
			this.model.pausePlayback()
		},

		fastForwardPlayback: function(){
			this.model.movePlayback(30)
		},

		stopPlayback: function(){
			this.model.stopPlayback()
		},

		duplicateComposition: function(){
			var newOrder = musicMentor.selectedComposition.get("order")+1;
			var newTitle = "copy of " + musicMentor.selectedComposition.get("title")
			var newSelected = false
			musicMentor.selectedSong.createComposition({title:newTitle, selected:newSelected})

			musicMentor.selectedSong.get("compositions").each(function(composition){
				if(composition.get("order") >= newOrder)
					composition.set({order: composition.get('order')+1})
				if(composition == musicMentor.selectedSong.get("compositions").last())
					composition.set({order:newOrder})
			})
		},

		removeComposition: function(){
			var r = confirm("Are you sure you want to delete this composition?");
			if(r == true){
				var removeOrder = this.model.get("order")
				musicMentor.selectedSong.get("compositions").each(function(composition){
					if(composition.get("order") > removeOrder)
						composition.set({"order": composition.get("order") - 1 })
				})
				this.model.clear()
				musicMentor.selectedComposition = undefined
			}
		}
	})

	CompositionPlaybackView = new CompositionView({model:CompositionModel})
})