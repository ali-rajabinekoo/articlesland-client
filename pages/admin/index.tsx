import {useEffect} from "react";
import {useRouter} from "next/router";

const Admin = () => {
    const {push} = useRouter()
    
    useEffect(() => {
        push('/dashboard').catch()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return <></>
}

export default Admin