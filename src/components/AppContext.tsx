import { createContext, useEffect, useState } from "react"
import { QueryLocalStorage } from "../services/storage"

interface IAppContext {
    userApp: string,
    setUserApp: (user:string) => void
    isLoggedIn: boolean,
    setIsLoggedIn: (isLoggedIn: boolean) => void
}

  
export const AppContext = createContext({} as IAppContext)

export const AppContextProvider = ({ children }: any) => {
    const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false)
    const [ userApp, setUserApp ] = useState<string>('')

    const storage = QueryLocalStorage('diobank')
    useEffect(() => {
      if(storage){
        const { userApp, login } = JSON.parse(storage)
        setIsLoggedIn(false)
        setUserApp(userApp)
      }
    }, [])
  
    return (
      <AppContext.Provider value={{ userApp, setUserApp, isLoggedIn, setIsLoggedIn }}>
        { children }
      </AppContext.Provider>
    )
}
