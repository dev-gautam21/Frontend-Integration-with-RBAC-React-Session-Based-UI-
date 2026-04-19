/**
 * Session Security Layer
 * Abstracting storage mechanisms for unique project fingerprint
 */

const STORAGE_KEYS = {
  USER_IDENTITY: "app_identity",
  AUTH_TOKEN: "app_token",
  USER_ROLE: "app_role"
};

export const SessionManager = {
  persistSession: (identity, token, role) => {
    sessionStorage.setItem(STORAGE_KEYS.USER_IDENTITY, identity);
    sessionStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    sessionStorage.setItem(STORAGE_KEYS.USER_ROLE, role);
  },

  terminateSession: () => {
    sessionStorage.clear();
  },

  getIdentity: () => sessionStorage.getItem(STORAGE_KEYS.USER_IDENTITY),
  getToken: () => sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN),
  getRole: () => sessionStorage.getItem(STORAGE_KEYS.USER_ROLE),

  isAuthenticated: () => !!sessionStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
};
