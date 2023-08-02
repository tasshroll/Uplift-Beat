const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('insertKeyHere');

newsapi.v2.sources({
    category: 'technology',
    language: 'en',
    country: 'us'
  }).then(response => {
    console.log(response);
    /*
      {
        status: "ok",
        sources: [...]
      }
    */
  });

router.use('/users', userRoutes);

module.exports = router;