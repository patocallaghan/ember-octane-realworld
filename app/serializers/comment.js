import DS from 'ember-data';
const { EmbeddedRecordsMixin, RESTSerializer } = DS;

export default class CommentSerializer extends RESTSerializer.extend(EmbeddedRecordsMixin) {
  attrs = {
    author: { embedded: 'always' },
  };
}
