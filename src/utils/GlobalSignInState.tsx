import { FC, ReactNode, createContext, useContext, useState } from "react";

type SignInContextType = {
  isSignIn: boolean;
  setIsSignIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignInContext = createContext<SignInContextType | undefined>(undefined);

type SignInProviderType = {
  children: ReactNode;
};

export const SignInProvider: FC<SignInProviderType> = ({ children }) => {
  const [isSignIn, setIsSignIn] = useState(false);

  return (
    <SignInContext.Provider value={{ isSignIn, setIsSignIn }}>
      {children}
    </SignInContext.Provider>
  );
};

export const useSignIn = (): SignInContextType => {
  const context = useContext(SignInContext);
  if (!context) {
    throw new Error("useSignIn must be used within a SignInProvider");
  }
  return context;
};
