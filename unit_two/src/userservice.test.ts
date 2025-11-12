// CARREOLA JIMENEZ ALEJANDRO
// 319197154
// Unit test: UserService
// TEMAS ESPECIALES DE PROGRAMACION 
// Grupo: 1007 (2026-I)

import DB from "./db";
import { User } from "./types/user";
import UserRepository from "./userrepository";
import { UserService } from "./userservice";

describe('User Service', () => {
  it('should return an array of fullnames', () => {
    const mockDB = new DB();
    const userRepoMock = new UserRepository(mockDB);

    const getAllSpy = jest.spyOn(userRepoMock, 'getAll').mockImplementation(() => {
      return [{
        firstName: 'John',
        lastName: 'Doe'
      }, {
        firstName: 'Alice',
        lastName: 'Smith'
      }] as unknown as User[]
    });

    const userService = new UserService(userRepoMock);
    const names: string[] = userService.getFullNames();
    
    expect(userService.getFullNames).toBeDefined();
    expect(names).toBeDefined();
    expect(names).toHaveLength(2);

    expect(names[0]).toBe('John Doe');
    expect(names[1]).toBe('Alice Smith');

    expect(getAllSpy).toHaveBeenCalledTimes(1);
  });

  // AQUI VA EL TEST: obtener mayores de edad
  it('should return users older than 17 years', () => {
    const mockDB = new DB();
    const userRepoMock = new UserRepository(mockDB);

    jest.spyOn(userRepoMock, 'getAll').mockImplementation(() => {
      return [
        { firstName: 'Alice', lastName: 'Doe', age: 22 },
        { firstName: 'Bob', lastName: 'Smith', age: 25 },
        { firstName: 'Charlie', lastName: 'Newton', age: 17 },
      ] as User[];
    });

    const userService = new UserService(userRepoMock);
    const adults = userService.getAdults();

    expect(adults).toHaveLength(2);
    expect(adults.every(u => u.age > 17)).toBe(true);
  });

  // AQUI VA EL TEST: obtener menores de edad
  it('should return users younger than 18 years', () => {
    const mockDB = new DB();
    const userRepoMock = new UserRepository(mockDB);

    jest.spyOn(userRepoMock, 'getAll').mockImplementation(() => {
      return [
        { firstName: 'Alice', lastName: 'Doe', age: 22 },
        { firstName: 'Charlie', lastName: 'Newton', age: 17 },
        { firstName: 'Eddy', lastName: 'Wong', age: 3 },
      ] as User[];
    });

    const userService = new UserService(userRepoMock);
    const minors = userService.getMinors();

    expect(minors).toHaveLength(2);
    expect(minors.every(u => u.age < 18)).toBe(true);
  });


});