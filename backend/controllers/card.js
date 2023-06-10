const Card = require('../models/card');
const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ForbiddenError = require('../errors/forbidden-err');

module.exports.getAllCards = (req, res, next) => Card.find({})
  .then((cards) => res.send(cards))
  .catch(next);

module.exports.createCard = (req, res, next) => Card.create({
  name: req.body.name,
  link: req.body.link,
  owner: req.user._id,
})
  .then((card) => res.send(card))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new BadRequestError('Некорректные данные при создании карточки'));
    } else {
      next(err);
    }
  });

module.exports.deleteCardById = (req, res, next) => Card.findById(req.params.cardId)
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка не найдена');
    if (card.owner.toString() !== req.user._id) throw new ForbiddenError('Невозможно удалить чужую карточку');
    card.deleteOne()
      .then(() => res.send(card))
      .catch(next);
  })
  .catch(next);

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка не найдена');
    return res.send(card);
  })
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .then((card) => {
    if (!card) throw new NotFoundError('Карточка не найдена');
    return res.send(card);
  })
  .catch(next);
