import { moduleForModel, test } from 'ember-qunit';

moduleForModel('notebook', 'Unit | Model | notebook', {
  // Specify the other units that are required for this test.
  needs: []
});

test('it exists', function(assert) {
  const model = this.subject();

  // let store = this.store();
  assert.ok(Boolean(model));
});
