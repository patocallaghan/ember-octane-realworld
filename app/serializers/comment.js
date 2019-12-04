import DS from 'ember-data';

export default class CommentSerializer extends DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin) {
  attrs = {
    author: { embedded: 'always' },
  };
}
