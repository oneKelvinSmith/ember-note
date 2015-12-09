import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    addNew: function() {
      const user = this.store.createRecord('user', {
        name: this.controller.get('name')
      });

      user
        .save()
        .then(() => {
          console.log('save successful');
          const name = this.controller.get('name');
          const message = `A new user with name "${name}" was added!`;

          this.controller.set('message', message);
        }, () => console.log('save failed'));
    }
  }
});
