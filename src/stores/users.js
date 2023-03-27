import { defineStore } from 'pinia';
import { getUsers, createUser } from '@/db';

export const useUserStore = defineStore('userStore', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      this.users = await getUsers();
    },
    async addUser(name) {
      const newUser = { name };
      await createUser(newUser);
      await this.fetchUsers();
    },
  },
});
