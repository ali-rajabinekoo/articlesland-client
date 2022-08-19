import type {NextPage} from 'next'
import { Text } from '@mantine/core';

const Home: NextPage = () => {
    return (
        <div>
            <p>سلام دنیا</p>
            <div dir={'ltr'}>
                <Text size="lg" sx={{fontFamily: "Poppins"}}>ArticleLand</Text>
            </div>
        </div>
    )
}

export default Home
