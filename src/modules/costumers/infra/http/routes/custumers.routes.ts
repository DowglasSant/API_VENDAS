import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductsController from '@modules/products/infra/http/controller/ProductsController';
import isAuthenticated from '@shared/infra/http/middlewares/IsAuthenticated';
import CostumersController from '../controllers/CostumersControllers';

const costumersRouter = Router();
const costumersController = new CostumersController();

costumersRouter.use(isAuthenticated);
costumersRouter.get('/', costumersController.index);

costumersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.show,
);

costumersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  costumersController.create,
);

costumersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.update,
);

costumersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  costumersController.delete,
);

export default costumersRouter;
