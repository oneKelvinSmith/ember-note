import Ember from 'ember';

export default Ember.Route.extend({
  model: function(params) {
    return this.store.query('note', {
      notebook: params.notebook_id
    });
  },

  actions: {
    addNote: function() {
      const notebookId = this.paramsFor('notebooks.notes').notebook_id;

      this.store
        .findRecord('notebook', notebookId)
        .then(notebook => {
          console.log(notebook);
          const note = this.store.createRecord('note', {
            title: this.controller.get('title'),
            notebook: notebook
          });

          console.log(note);
          note.save().then(() => {
            console.log('save successful');
            this.controller.set('title', null);
          }, () => console.log('save failed'));
        });
    },

    deleteNote: function(note) {
      console.log(`deleting note with title ${note.get('title')}`);
      note.deleteRecord();
      note.save();
    }
  }
});
