$(function(){
	//Composition Model
	Composition = Backbone.Model.extend({

		//default attributes for the recording
		defaults: function(){
			return{
				title: "New Composition",
				order: Compositions.nextOrder(),
				selected: false,
				playing: false
			}
		},

		initialize: function(){
			if(!this.get("title") || this.get("title").length == 0)
				this.set({"title": this.defaults.title})
		},

		rename: function(newTitle){
			this.save({"title": newTitle})
		},

		clear:function(){
			this.destoy();
		},

		select: function(){
			musicMentor.selectedComposition = this
			this.set({"selected":true})
		},

		unSelect: function(){
			musicMentor.selectedComposition = undefined
			this.set({"selected":false})
		}
	})

	CompositionList = Backbone.Collection.extend({

		model: Composition,

		localStorage: new Store("compositions-backbone"),

		nextOrder: function(){
			if(!this.length) return 1;
			return this.last().get('order') + 1;
		},

		comparator: function(composition){
			return composition.get('order');
		}
	})

	Compositions = new CompositionList;

	CompositionView = Backbone.View.extend({

		tagName: "li",

		template: _.template($('#composition-template').html()),

		events:{
			"click .composition1stLine": "selectComposition",
			"click .renameBtn": "renameComposition"
			//TODO put events here
		},

		initialize: function(){
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function(){
			if(this.model.get("selected"))
				this.$el.attr("class", "selected")
			else
				this.$el.attr("class", "unselected")
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
		}
	})

	CompositionListView = Backbone.View.extend({

		el: $("#compositionList"),

		events:{
			"click #newComposition": "createNewComposition"
		},

		initialize: function(){
			this.input = this.$("#newComposition");

			Compositions.bind('add', this.addOne, this);
			Compositions.bind('reset', this.addAll, this);
			Compositions.bind('all', this.render, this);

			this.ul = this.$("ul")
			that1 = this
		},

		addOne: function(composition){
			var view = new CompositionView({model:composition});
			that1.ul.append(view.render().el);
		},

		addAll: function(){
			Compositions.each(this.addOne)
		},
		createNewComposition: function(){
			var compositionName = new Date();
			musicMentor.selectedSong.createComposition({title: compositionName})
		},

		render: function(){
			$("#compositionList ul > li").remove()
			that1.addAll()
		}

	})

	CompositionsView = new CompositionListView
})