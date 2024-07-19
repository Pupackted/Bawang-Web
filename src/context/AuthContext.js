import React from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import firebase_app from "@/backend/firebase/config";
import { getUserByEmail } from "@/backend/server_actions/getUser";

const auth = getAuth(firebase_app);

export const AuthContext = React.createContext({});

export const useAuthContext = () => React.useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [userData, setUserData] = React.useState(null)
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userData = await getUserByEmail(user.email)
        setUserData(userData)
        setUser(user);
      } else {
        setUser(null);
        setUserData(null)
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData }}>
      {loading ? (
        <div className="h-screen w-full flex items-center justify-center animate-spin">
          <svg
            width={100}
            height={100}
            viewBox="-12.5 -12.5 125 125"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "rotate(-90deg)" }}
            className="animate-spin"
          >
            <circle
              r="40"
              cx="50"
              cy="50"
              fill="transparent"
              stroke="#e0e0e0"
              strokeWidth="10"
              strokeDasharray="251.20000000000002px"
              strokeDashoffset="0"
              className="animate-spin"
            ></circle>
            <circle
              r="40"
              cx="50"
              cy="50"
              stroke="#76e5b1"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDashoffset="90px"
              fill="transparent"
              strokeDasharray="251.20000000000002px"
              className="animate-spin"
            ></circle>
          </svg>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};
