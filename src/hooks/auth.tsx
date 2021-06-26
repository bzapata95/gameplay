import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import * as AuthSession from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { DISCORD_APP } from "../config/discordAuth";
import discordApi from "../services/discordApi";
import { COLLECTION_USER } from "../config/storage";

interface User {
  id: string;
  username: string;
  firstName: string;
  avatar: string;
  email: string;
  token: string;
}

type AuthorizationResponse = AuthSession.AuthSessionResult & {
  params: {
    access_token?: string;
    error?: string;
  };
};

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      const storage = await AsyncStorage.getItem(COLLECTION_USER);
      if (storage) {
        const userLogged = JSON.parse(storage);
        discordApi.defaults.headers.authorization = `Bearer ${userLogged.token}`;
        setUser(userLogged);
      } else {
        setUser({} as User);
      }
    })();
  }, []);

  const signIn = useCallback(async () => {
    try {
      setLoading(true);
      const authUrl = `${discordApi.defaults.baseURL}/oauth2/authorize?client_id=${DISCORD_APP.CLIENT_ID}&redirect_uri=${DISCORD_APP.REDIRECT_URI}&response_type=${DISCORD_APP.RESPONSE_TYPE}&scope=${DISCORD_APP.SCOPE}`;
      const { type, params } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success" && !params.error) {
        discordApi.defaults.headers.authorization = `Bearer ${params.access_token}`;

        const userInfo = await discordApi.get("/users/@me");
        const [firstName] = userInfo.data.username.split(" ");
        userInfo.data.avatar = `${DISCORD_APP.CDN_IMAGE}/avatars/${userInfo.data.id}/${userInfo.data.avatar}.png`;
        const userData = {
          ...userInfo.data,
          firstName,
          token: params.access_token,
        };
        await AsyncStorage.setItem(COLLECTION_USER, JSON.stringify(userData));
        setUser(userData);
      } else {
        setLoading(false);
      }
    } catch (error) {
      throw new Error("No fue posible autenticar");
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    setUser({} as User);
    await AsyncStorage.removeItem(COLLECTION_USER);
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
