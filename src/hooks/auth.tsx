import React, {
  createContext,
  ReactNode,
  useState,
  useContext,
  useCallback,
} from "react";
import * as AuthSession from "expo-auth-session";

import { DISCORD_APP } from "../config/discordAuth";
import discordApi from "../services/discordApi";

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
}

export const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(false);

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

        setUser({
          ...userInfo.data,
          firstName,
          token: params.access_token,
        });
      } else {
        setLoading(false);
      }
    } catch (error) {
      throw new Error("No fue posible autenticar");
    } finally {
      setLoading(false);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ user, loading, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
