import UserRepository from "./userrepository";
import { User } from "./types/user";

export class UserService {
  repo: UserRepository;
  
  constructor(repo: UserRepository) {
    this.repo = repo;
  }

  getFullNames(): string[] {
    const users = this.repo.getAll();
    const names = [];

    for (const user of users) {
      names.push(`${user.firstName} ${user.lastName}`);
    }

    return names;
  }

// CARREOLA JIMENEZ ALEJANDRO
// 319197154
// Unit test: UserService
// TEMAS ESPECIALES DE PROGRAMACION 
// Grupo: 1007 (2026-I)

  // Método Obtener usuarios mayores de edad (> 17 años)
  getAdults(): User[] {
    const users = this.repo.getAll();
    return users.filter(user => user.age > 17);
  }

  // Método Obtener usuarios menores de edad (< 18 años)
  getMinors(): User[] {
    const users = this.repo.getAll();
    return users.filter(user => user.age < 18);
  }
}

