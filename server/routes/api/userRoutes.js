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

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/articles/:articleId').delete(authMiddleware, deleteArticle);

module.exports = router;
