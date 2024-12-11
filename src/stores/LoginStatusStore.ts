import { defineStore } from 'pinia';
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useLoginStatusStore = defineStore(
    'loginStatusStore',
    {
        state: () => ({
            username: null as string | null,
            isLoggedIn: false,
        }),
        actions: {
            initializeAuth() {
                const auth = getAuth();
                onAuthStateChanged(auth, (user) => {
                    const aUser = auth.currentUser;
                    if (user) {
                        console.log("This is the user in store: ", aUser?.displayName);
                        this.username = user.displayName;
                        this.isLoggedIn = true;
                    } else {
                        this.username = null;
                        this.isLoggedIn = false;
                    }
                });
            }
        }
    }
)