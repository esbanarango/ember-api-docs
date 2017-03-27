import DS from 'ember-data';
import Ember from 'ember';

const { inject: {service} } = Ember;

export default DS.JSONAPISerializer.extend({

  metaStore: service(),

  normalizeFindRecordResponse(store, primaryModelClass, payload, id, requestType) {
    let normalizedDocument = this._super(...arguments);

    // We do this because ember data doesn't handle meta data in accordance to json-api spec yet
    if (primaryModelClass.modelName === 'project') {
      this.get('metaStore.availableProjectVersions')[id] = normalizedDocument.meta.availableVersions;
    } else if (primaryModelClass.modelName === 'project-version') {
      this.get('metaStore').addToProjectRevMap(id, normalizedDocument.meta)
    }

    return normalizedDocument;
  }
});

