import { defineStore } from 'pinia'

type LoginStoreState = {
  loginResult: null | LoginResult
  isLoggingIn: boolean
}

type LoginResult = {
  username: null | string
  password: null | string
}

export const useLoginStore = defineStore('login', {
  state: () =>
    ({
      loginResult: null,
      isLoggingIn: false,
    }) as LoginStoreState,
  getters: {
    user(state: LoginStoreState): string | null {
      return state.loginResult?.username || null
    },
    isAuthenticated(state: LoginStoreState): boolean {
      const loggedUserSessionString = sessionStorage.getItem('loggedUser')
      const loggedUser = loggedUserSessionString? JSON.parse(loggedUserSessionString) : null
      const { username, password } = loggedUser || {}

      this.loginResult = { username, password }
      
      return !!state.loginResult?.username && !!state.loginResult?.password
    }
  },
  actions: {
    login(username: string, password: string) {
      this.isLoggingIn = true
      this.loginResult = { username, password }
      sessionStorage.setItem('loggedUser', JSON.stringify(this.loginResult))
      this.isLoggingIn = false
    }
  }
})