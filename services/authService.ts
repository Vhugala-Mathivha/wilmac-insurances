// types.ts must be imported if we were strictly typing the User, 
// but for this service we'll define a simple internal interface.

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In a real app, this should be hashed!
}

const DB_KEY = 'wilmac_users_db';
const SESSION_KEY = 'wilmac_active_session';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simple ID generator that works in all environments (crypto.randomUUID can be flaky in non-secure contexts)
const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

export const authService = {
  // Get all users from "Database"
  getUsers: (): User[] => {
    try {
      const usersStr = localStorage.getItem(DB_KEY);
      return usersStr ? JSON.parse(usersStr) : [];
    } catch (e) {
      console.error("Error reading users from local storage", e);
      return [];
    }
  },

  // Save users to "Database"
  saveUsers: (users: User[]) => {
    localStorage.setItem(DB_KEY, JSON.stringify(users));
  },

  // Register a new user
  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay(800); // Simulate API call
    
    const users = authService.getUsers();
    
    // Check if email exists
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }

    const newUser: User = {
      id: generateId(),
      name,
      email,
      password
    };

    users.push(newUser);
    authService.saveUsers(users);
    
    // Auto login after register
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return newUser;
  },

  // Login a user
  login: async (email: string, password: string): Promise<User> => {
    await delay(800); // Simulate API call
    
    const users = authService.getUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      throw new Error('Invalid email or password. Please try again.');
    }

    // Set session
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    return user;
  },

  // Logout
  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // Check if user is currently logged in (for page reloads)
  getCurrentUser: (): User | null => {
    try {
      const sessionStr = localStorage.getItem(SESSION_KEY);
      return sessionStr ? JSON.parse(sessionStr) : null;
    } catch (e) {
      return null;
    }
  }
};