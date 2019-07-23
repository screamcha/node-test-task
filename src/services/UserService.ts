import fetch from 'node-fetch';
import * as path from 'path';
import { promises as fs } from 'fs';

import { UserData, UserResponse, IUserService } from '../interfaces';


class UserService implements IUserService {
  reqresUrl: string = '';
  avatarsPath: string = '';

  constructor() {
    this.reqresUrl = 'https://reqres.in/api/users';
    this.avatarsPath = path.resolve(__dirname, '../../static/avatars');
  }

  async getUser(userId: string) {
    const response = await fetch(`${this.reqresUrl}/${userId}`);
    const responseJson: UserResponse = await response.json();

    return responseJson.data;
  }

  async getUserAvatar(userId: string) {
    const userInfo: UserData = await this.getUser(userId);
    
    const avatarUrl = userInfo.avatar;
    
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

export default new UserService();