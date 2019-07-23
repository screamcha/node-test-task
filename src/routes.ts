import express from 'express';
import UserService from './services/UserService';

const router: express.Router = express.Router();

router.get('/:userId/avatar', async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;
  
    const data = await UserService.getUserAvatar(userId);
  
    res.send(data);
  } catch (err) {
    res.status(500).end();
  }
});

router.get('/:userId', async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;

    const data = await UserService.getUser(userId);

    res.send(data);
  } catch (err) {
    res.status(500).end();
  }
});

router.delete('/:userId/avatar', async (req: express.Request, res: express.Response) => {
  try {
    const { userId } = req.params;

    const data = await UserService.deleteUserAvatar(userId);

    res.send(data);
  } catch (err) {
    res.status(500).end();
  }
});

export default router;