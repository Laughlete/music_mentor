//example: http://jsfiddle.net/garretpeterson/Eb8y4/
$(function(){
	//Song Model
	var Song = Backbone.Model.extend({

		// Default attributes for the song
		defaults: function(){
			return {
				title: "Yesterday",
				order: Songs.nextOrder(),
				selected: false
			};
		},

		initialize: function(){
			if(!this.get("title")){
				this.set({"title": this.defaults.title});
			}
			if(this.get("recordings") === undefined)
				this.set({"recordings": new RecordingList})
			if(this.get("compositions") === undefined)
				this.set({"compositions": new CompositionList})
		},

		rename: function(newTitle){
			this.save({title: newTitle});
		},

		clear: function(){
			this.destroy();
		},

		select: function(){
			musicMentor.selectedSong = this
			Recordings.reset(this.get("recordings").models)
			Compositions.reset(this.get("compositions").models)
			this.set({"selected": true})
			musicMentor.showSongDetails()
		},

		unSelect: function(){
			musicMentor.selectedSong = undefined
			this.set({"selected": false})
			Recordings.reset({});
			Compositions.reset({})
			musicMentor.hideSongDetails()
		},

		createRecording: function(newRecordingModel){
			this.get("recordings").create(newRecordingModel);
			Recordings.reset(this.get("recordings").models)
		},

		createComposition: function(newCompositionModel){
			this.get("compositions").create(newCompositionModel);
			Compositions.reset(this.get("compositions").models);
		}
	});

	//Song Collection
	// uses *localStorage* instead of a remote server.
	var SongList = Backbone.Collection.extend({

		model: Song,

		localStorage: new Store("songs-backbone"),

		nextOrder: function() {
			if (!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(song){
			return song.get('order');
		},

		insertSong: function(order, song){
			var newSong = new Song(song)
		}
	});

	var Songs = new SongList;

	//Song View
	var SongView = Backbone.View.extend({

		tagName: "li",

		template: _.template($('#song-template').html()),

		events: {
			"click .song-title": "selectSong"
			//TODO put events here
		},

		initialize: function(){
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},

		selectSong: function(){
			var selectedPrev = this.model.get("selected");
			Songs.each(function(song){song.set({"selected":false})})
			if(selectedPrev)
				this.model.unSelect()
			else
				this.model.select()
		}

	});

	//SongList View
	var SongListView = Backbone.View.extend({

		el: $("#songList"),



		events:{
			"click #newSong": "createNewSong",
			"click #renameSong": "renameSong",
			"click #duplicateSong": "duplicateSong",
			"click #removeSong": "removeSong"
		},

		initialize: function(){

			this.input = this.$("#newSong");
		
			Songs.bind('add', this.addOne, this);
			Songs.bind('reset', this.addAll, this);
			Songs.bind('all', this.render, this);

			this.ul = this.$("ul")
			Songs.create({title:"New Song 1"});
		},

		render: function(){

		},

		addOne: function(song){
			var view = new SongView({model: song});
			this.ul.append(view.render().el);
		},

		addAll: function(){
			Songs.each(this.addOne);
		},

		createNewSong: function(){
			musicMentor.popupDialog(function(songName){
				Songs.create({title:songName});
			}, "New Song Name")
		},

		renameSong: function(){
			musicMentor.popupDialog(function(songName){
				musicMentor.selectedSong.rename(songName)
			}, "New Song Name")
		},

		duplicateSong: function(){
			var newOrder = musicMentor.selectedSong.get("order") + 1;
			var newTitle = "copy of " + musicMentor.selectedSong.get("title")
			var newSelected = false
			var newRecordingList = undefined
			if(musicMentor.selectedSong.get("recordings") != undefined)
				newRecordingList = new RecordingList(musicMentor.selectedSong.get("recordings").models)
			var newCompositionList = undefined
			if(musicMentor.selectedSong.get("compositions") != undefined)
				newCompositionList = new CompositionList(musicMentor.selectedSong.get("compositions").models)
			Songs.create({title:newTitle, selected:newSelected, recordings:newRecordingList, compositions:newCompositionList})

			Songs.each(function(song){
				if(song.get("order") >= newOrder)
					song.set({order:song.get("order")+1})
				if(song == Songs.last())
					song.set({"order": newOrder})

			})
		},

		removeSong: function(){
			musicMentor.selectedSong.clear()
			musicMentor.setSelectedSong(undefined)
		}
	})


	var SongsView = new SongListView;
})