const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUser,
  getUserById,
  editUserData,
  editUserAvatar,
  getCurrentUser,
} = require('../controllers/users');

router.get('/', getUser);
router.get('/me', getCurrentUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  getUserById,
);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      about: Joi.string().min(2).max(30).required(),
    }),
  }),
  editUserData,
);
router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string()
        .regex(
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/,
        )
        .required(),
    }),
  }),
  editUserAvatar,
);

module.exports = router;
