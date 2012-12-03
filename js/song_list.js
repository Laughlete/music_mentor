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
			this.set({"recordings": new RecordingList})
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
			this.set({"selected": true})
			musicMentor.showSongDetails()
		},

		unSelect: function(){
			musicMentor.selectedSong = undefined
			this.set({"selected": false})
			Recordings.reset({});
			musicMentor.hideSongDetails()
		},

		createRecording: function(newRecordingModel){
			this.get("recordings").create(newRecordingModel);
			Recordings.reset(this.get("recordings").models)
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
		}
	});

	var Songs = new SongList;

	//Song View
	var SongView = Backbone.View.extend({

		tagName: "li",

		template: _.template($('#song-template').html()),

		events: {
			"click .song-view": "selectSong"
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
			"click #newSong": "createNewSong"
		},

		initialize: function(){

			this.input = this.$("#newSong");
		
			Songs.bind('add', this.addOne, this);
			Songs.bind('reset', this.addAll, this);
			Songs.bind('all', this.render, this);

			this.ul = this.$("ul")
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
			var songName = prompt("Enter Song Name", "New Song")
			Songs.create({title:songName});
		}
	})


	var SongsView = new SongListView;
})