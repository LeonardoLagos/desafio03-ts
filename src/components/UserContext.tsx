import { createContext, useEffect, useState } from "react"
import { QueryLocalStorage } from "../services/storage"

interface IUserContext {
    user: string,
    setUser: (user:string) => void
    password: string,
    setPassword: (password:string) => void
}

export const UserContext = createContext({} as IUserContext)

export const UserContextProvider = ({ children }: any) => {
    const [ user, setUser ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')

    const storage = QueryLocalStorage('usuario')

    useEffect(() => {
      if(storage){
        const { login,  passoword } = JSON.parse(storage)
        setUser(login)
        setPassword(passoword)
      }
    }, [])
  
    return (
        <UserContext.Provider value={{ user,setUser, password, setPassword }}>
        { children }
        </UserContext.Provider>
    )
}
