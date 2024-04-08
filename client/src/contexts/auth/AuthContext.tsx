import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import statement for jwt-decode
import IToken from "../../interfaces/auth/jwt/IToken";
import IAuthContextType from "../../interfaces/auth/auth_context/IAuthContextType";

// Create the AuthContext
const AuthContext = createContext<IAuthContextType>({
  token: null,
  setToken: () => {},
  isLoggedIn: false,
  isTokenValid: false,
});

// AuthProvider component to wrap your app and provide the AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<IToken | null>(null);

  // Example: useEffect to check if token is present in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  const isLoggedIn = !!token;

  // Check if token is valid
  const isTokenValid = useMemo(() => {
    if (!token) return false;

    const decodedToken: { exp: number } = jwtDecode(token.token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    return decodedToken.exp > currentTime;
  }, [token]);

  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};
