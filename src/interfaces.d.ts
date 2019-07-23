export interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserResponseCron {
    data: Array<UserData>;
}

export interface UserResponse {
    data: UserData;
}

export interface IUserService {
    avatarsPath: string,
    reqresUrl: string,
    getUser: (userId: string) => Promise<UserData>,
    getUserAvatar: (userId: string) => Promise<string>,
    deleteUserAvatar: (userId: string) => Promise<boolean>;
  }