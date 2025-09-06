import { useCallback, useMemo } from "react";

type BaseProfile = {
  name: string;
  age: number | string;
  gender: string;
  email?: string;
};

type AuthState = {
  user: BaseProfile | null;
};

const STORAGE_KEY = "medibuddy:user";

export function useAuth() {
  const userJson = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
  const user = useMemo<BaseProfile | null>(() => (userJson ? JSON.parse(userJson) : null), [userJson]);

  const setUser = useCallback((u: BaseProfile | null) => {
    if (typeof window === "undefined") return;
    if (!u) {
      window.localStorage.removeItem(STORAGE_KEY);
    } else {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    }
  }, []);

  const signIn = useCallback(async (data: BaseProfile & { password?: string }) => {
    // Mock auth
    // eslint-disable-next-line no-console
    console.log("[MediBuddy] Sign In:", data);
    setUser({ name: data.name, age: data.age, gender: data.gender, email: data.email });
  }, [setUser]);

  const signUp = useCallback(async (data: BaseProfile & { password?: string; confirmPassword?: string }) => {
    // Mock auth
    // eslint-disable-next-line no-console
    console.log("[MediBuddy] Sign Up:", data);
    setUser({ name: data.name, age: data.age, gender: data.gender, email: data.email });
  }, [setUser]);

  const continueAsGuest = useCallback(async (data: BaseProfile) => {
    // Mock guest
    // eslint-disable-next-line no-console
    console.log("[MediBuddy] Guest:", data);
    setUser({ name: data.name, age: data.age, gender: data.gender });
  }, [setUser]);

  return { user, setUser, signIn, signUp, continueAsGuest } as const;
}
