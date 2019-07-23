import express = require('express');
import UserService = require('./services/UserService');

const router: express.Router = express.Router();

router.get('/:userId/avatar', async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const data = await UserService.getUserAvatar(userId);

  res.send(data);
});

router.get('/:userId', async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const data = await UserService.getUser(userId);

  res.send(data);
});

router.delete('/:userId/avatar', async (req: express.Request, res: express.Response) => {
  const { userId } = req.params;

  const data = await UserService.deleteUserAvatar(userId);

  res.send(data);
});

export default router;