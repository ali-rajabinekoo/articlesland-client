import type {NextPage} from 'next'
import {AuthLayout} from "../../container/layout/authLayout";
import {Text} from '@mantine/core';

const Registration: NextPage = () => {
    return (<AuthLayout>
        <Text size={"xl"} color={"grey.2"}>
            به
            <Text mx={5} component={"span"} sx={{fontFamily: "Poppins"}}>
                ArticleLand
            </Text>
            خوش آمدید
        </Text>
    </AuthLayout>)
}

export default Registration