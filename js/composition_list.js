$(function(){
	//Composition Model
	Composition = Backbone.Model.extend({

		//default attributes for the recording
		defaults: function(){
			return{
				title: "New Composition",
				order: Compositions.nextOrder(),
				selected: false
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
			//TODO put events here
		},

		initialize: function(){
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.remove, this);
		},

		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
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