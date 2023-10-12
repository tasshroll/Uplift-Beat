const { Schema, model } = require('mongoose');
const articleSchema = require('./Article');

const newsSchema = new Schema({

  news: [articleSchema],

},
  { toJSON: { virtuals: true },
}
);

newsSchema.virtual('newsCount').get(function () {
  return this.news.length;
});

const News = model('News', newsSchema);

module.exports = News;
