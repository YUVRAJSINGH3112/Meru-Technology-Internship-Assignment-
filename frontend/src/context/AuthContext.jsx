import { createContext,useContext,useEffect,useState } from "react";
import api from "../lib/api"
const AuthContext=createContext();


export const AuthProvider=({children})=>{
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const verifyUser = async () => {
          const token = localStorage.getItem("token");
      
          if (!token) {
            setUser(null);
            setLoading(false);
            return;
          }
      
          try {
            const res = await api.get("/user/profile");
            console.log(res)
            setUser(res.data.user); 
          } catch (err) {
            console.error(err);
            setUser(null);
          } finally {
            setLoading(false);
          }
        };
      
        verifyUser();
      }, []);
      
    return (
    <AuthContext.Provider value={{ user,loading,setUser }}>
      {children}
    </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);