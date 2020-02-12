import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default class CommentModel extends Model {
  @attr('string') body;
  @attr('date') createdAt;
  @attr('date') updatedAt;

  @belongsTo('profile') author;
  @belongsTo('article') article;
}
