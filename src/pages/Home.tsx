import { Box, Center, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../components/AppContext";
import { Card } from "../components/Card";
import DButton from "../components/DButton";
import { login } from "../services/login";
import { QueryLocalStorage, changeLocalStorage, createLocalStorage } from "../services/storage";

const Home = () => {
    const [ email, setEmail ] = useState<string>('')
    const [ password, setPassword ] = useState<string>('')
    const [ loginCarregado, setLoginCarregado] = useState<boolean>(false)
    const { isLoggedIn, setIsLoggedIn } = useContext(AppContext)
    const navigate = useNavigate()

    useEffect(() => {
        if(!QueryLocalStorage('diobank')){
            createLocalStorage()
        } else{
            const dadosLocal = QueryLocalStorage('usuario')
                if(dadosLocal){
                    const {user, password} = JSON.parse(dadosLocal)
                    login(user, password).then((loggedIn) =>{
                        if(loggedIn){
                            setIsLoggedIn(true)
                            navigate('/conta/1')
                        }
                        setLoginCarregado(true)
                    })
                }
        }
    }, [])
    
    const validateUser = async (email: string, password:string) => {
        const loggedIn = await login(email, password)

        if(!loggedIn){
            return alert('Email inválido')
        }
        setIsLoggedIn(true)
        changeLocalStorage('diobank', JSON.stringify({ userApp: email,status: true }))
        changeLocalStorage('usuario', JSON.stringify({ user: email,password: password }))
        navigate('/conta/1')
    }
  
    return (
        <Box padding="25px">
            {
                !isLoggedIn && loginCarregado?
                (
                <Card>
                    <Center>
                        <h1>Faça o login</h1>
                    </Center>
                    <Input placeholder="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                    <Input placeholder="password" value={password} onChange={(event) => setPassword(event.target.value)} />
                    <Center>
                        <DButton
                            onClick={() => validateUser(email, password)}
                            />
                    </Center>
                </Card>
                ) :
                (
                    <Card>
                    <Center>
                        <h1>Carregando...</h1>
                    </Center>
                    </Card>
                )
            }
        </Box>
    );
}

export default Home;
