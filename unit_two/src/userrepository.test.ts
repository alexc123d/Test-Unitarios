import DB from './db';
import { User } from './types/user';
import UserRepository from './userrepository';


describe('User respository', () => {


  it('should be defined', () => {
    const mockDB = new DB();
    const userRepository = new UserRepository(mockDB);

    expect(userRepository).toBeDefined();
  });

  it('should return an user by nss', () => {
    const mockDB = new DB();

    const getUserByNSSSpy = jest.spyOn(mockDB, 'getByNSS').mockImplementation(() => {
      return {
        id: 'abc-123'
      } as unknown as User;
    });

    const nss = 789456;
    const userRepository = new UserRepository(mockDB);

    const user = userRepository.getUserByNSS(nss);

    expect(userRepository.getUserByNSS).toBeDefined();
    expect(user).toBeDefined();
    expect(user).toHaveProperty('id', 'abc-123');
    expect(getUserByNSSSpy).toHaveBeenCalledTimes(1);
  });

  it('should return undefined if the user is not found', () => {
    const mockDB = new DB();

    const getUserByNSSSpy = jest.spyOn(mockDB, 'getByNSS').mockImplementation(() => {
      return undefined;
    });

    const userRepository = new UserRepository(mockDB);
    const user = userRepository.getUserByNSS(85632);

    expect(user).toBeUndefined();
    expect(getUserByNSSSpy).toHaveBeenCalledTimes(1);
  });

  it('should return all users', () => {
    const mockDB = new DB();

    const getAllUsersSpy = jest.spyOn(mockDB, 'getAllUsers').mockImplementation(() => {
      return [
        {
          id: '123-abc'
        },
        {
          id: '789-xyz'
        }
      ] as unknown as User[];
    });

    const userRepository = new UserRepository(mockDB);
    const users = userRepository.getAll();

    expect(users).toBeDefined();
    expect(users).toHaveLength(2);
    expect(getAllUsersSpy).toHaveBeenCalledTimes(1);
  });
});