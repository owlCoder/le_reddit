import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode"; // Correct import statement for jwt-decode
import IToken from "../../interfaces/auth/jwt/IToken";
import IAuthContextType from "../../interfaces/auth/auth_context/IAuthContextType";
import { removeTokenFromLocalStorage } from "../../services/jwt/JWTTokenizationService";

// Create the AuthContext
const AuthContext = createContext<IAuthContextType>({
  token: null,
  setToken: () => {},
  isLoggedIn: false,
  isTokenValid: false,
});

/**
 * Represents the authentication context provider component.
 * It wraps the app and provides the authentication context.
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // State to store the authentication token
  const [token, setToken] = useState<IToken | null>(null);

  // useEffect to check if token is present in localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(JSON.parse(storedToken));
    }
  }, []);

  // Boolean indicating whether the user is logged in or not
  const isLoggedIn = !!token;

  // useMemo hook to check if the token is valid
  const isTokenValid = useMemo(() => {
    if (!token) return false;

    const decodedToken: { exp: number } = jwtDecode(token.token);
    const currentTime = Date.now() / 1000; // Convert milliseconds to seconds

    if(decodedToken.exp > currentTime) {
        removeTokenFromLocalStorage();
        setToken(null);
    }

    return decodedToken.exp > currentTime;
  }, [token]);

  // Return the AuthContext provider with the authentication context value
  return (
    <AuthContext.Provider value={{ token, setToken, isLoggedIn, isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};
