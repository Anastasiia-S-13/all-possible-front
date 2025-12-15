// lib/db.ts
import { User } from "../types/User";

const mockUsers: User[] = [
  { id: "u001", name: "Антон петренко", email: "anton@example.com", createdAt: new Date().toISOString() },
];

export async function getUserById(userId: string): Promise<User | null> {
   return mockUsers.find(u => u.id === userId) ?? null;
}

