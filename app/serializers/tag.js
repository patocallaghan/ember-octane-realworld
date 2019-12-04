import DS from 'ember-data';

export default class TagSerializer extends DS.RESTSerializer {
  primaryKey = 'value';

  normalizeArrayResponse(store, primaryModelClass, payload, id, requestType) {
    const newPayload = {
      tags: payload.tags.map(tag => {
        return {
          value: tag,
        };
      }),
    };

    return super.normalizeArrayResponse(store, primaryModelClass, newPayload, id, requestType);
  }
}
