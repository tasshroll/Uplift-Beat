const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveArticle,
  deleteArticle,
  login,
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveArticle);

router.route('/login').post(login);

router.route('/quotes').get(quotes);

router.route('/articles/:articleId').delete(authMiddleware, deleteArticle);

module.exports = router;
