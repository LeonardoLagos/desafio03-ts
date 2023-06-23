import { Center, SimpleGrid, Spinner, Text } from "@chakra-ui/react"
import { Link, useNavigate, useParams } from "react-router-dom"
import CardInfo from "../components/CardInfo"
import { useContext, useState, useEffect } from "react"
import { AppContext } from "../components/AppContext"
import { api } from "../api"

interface UserData {
    email: string
    password: string
    name: string
    balance: number
    id: string
}

const ContaInfo = () => { 
    const { id } = useParams()
    const navigate = useNavigate()
    const [ userData, setUserData ] = useState<null | UserData>()
    
    useEffect(() => {
        const getData = async () => {
            const data: any | UserData = await api
            setUserData(data)
        }

        getData()
    }, [])

    const actualData = new Date()

    const { isLoggedIn } = useContext(AppContext)
    
    if(userData && id !== userData.id) {
        navigate('/')
    }
    
    !isLoggedIn && navigate('/')
    return (
        <Center>
            <SimpleGrid columns={2} spacing={8} paddingTop={16}>
                {
                    userData === undefined || userData === null ?
                    (  
                        <Center>
                            <Spinner size='xl' color='white'/>
                        </Center>
                    ) : 
                    (
                        <>
                            <CardInfo mainContent={` ${userData?.name}`} content={`${userData?.email}`} />
                        </>
                    )
                }
            </SimpleGrid>    
        </Center>
    )
}

export default ContaInfo
