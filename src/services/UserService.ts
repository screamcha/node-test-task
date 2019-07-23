import fetch = require('node-fetch');
import path = require('path');
const fs = require('fs').promises;

interface IUserService {
  avatarsPath: string,
  reqresUrl: string,
  getUser: (userId: string) => JSON,
  getUserAvatar: (userId: string) => string,
  deleteUserAvatar: (userId: string) => boolean;
}

class UserService implements IUserService {
  constructor() {
    this.reqresUrl = 'https://reqres.in/api/users';
    this.avatarsPath = path.resolve(__dirname, '../../static/avatars');
  }

  async getUser(userId: string) {
    const response = await fetch(`${this.reqresUrl}/${userId}`);
    const json = await response.json();

    return json;
  }

  async getUserAvatar(userId: string) {
    const userInfo = await this.getUser(userId);
    
    const avatarUrl = userInfo.data.avatar;
    
    const existingAvatars = await fs.readdir(this.avatarsPath);
    const avatarExists = existingAvatars.find((imgName: string) => imgName === `${userId}.jpg`);

    if (avatarExists) {
      const base64 = fs.readFile(`${this.avatarsPath}/${userId}.jpg`, 'base64');

      return base64;
    } else {
      const avatar = await fetch(avatarUrl);
      const buffer = await avatar.buffer();

      await fs.appendFile(`${this.avatarsPath}/${userId}.jpg`, buffer);
      
      const base64 = buffer.toString('base64');
      return base64;
    }
  }

  async deleteUserAvatar(userId: string) {
    await fs.unlink(`${this.avatarsPath}/${userId}.jpg`);

    return true;
  }
}

module.exports = new UserService();