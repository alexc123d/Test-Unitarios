import { User } from "./types/user";
import DB from "./db";

class UserRepository {
  db: DB;
  // Dependency injection
  constructor (db: DB) {
    this.db = db;
  }

  getUserByNSS(nss: number): User | undefined {
    const user = this.db.getByNSS(nss);

    return user;
  }

  getAll(): User[] {
    const users = this.db.getAllUsers();
    return users;
  }
}

export default UserRepository;
