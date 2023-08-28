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

// Will add data only if collection is empty to prevent duplicates
// Item.find({})
//   .exec()
//   .then(async collection => {
//     if (collection.length === 0) {
//       try {
//         const insertedItems = await Item
//           .insertMany([
//             { item: 'banana', price: 1 },
//             { item: 'pear', price: 2 },
//             { item: 'apple', price: 3 },
//             { item: 'ice cream', price: 5 },
//             { item: 'bread', price: 2 },
//             { item: 'cheddar cheese', price: 4 },
//             { item: 'hot dogs', price: 8 },
//             { item: 'lettuce', price: 2 },
//             { item: 'snack cake', price: 4 },
//             { item: 'wine', price: 10 },
//           ]);
//         console.log('Inserted items:', insertedItems);
//       } catch (insertedError) {
//         console.log(insertError);
//       }
//     }
