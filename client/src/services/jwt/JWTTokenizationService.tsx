import IToken from "../../interfaces/auth/jwt/IToken";

const saveTokenToLocalstorage = (data: IToken): void => {
  localStorage.setItem("token", data.token);
};

const removeTokenFromLocalStorage = (): void => {
  localStorage.removeItem("token");
};

export { saveTokenToLocalstorage, removeTokenFromLocalStorage };
