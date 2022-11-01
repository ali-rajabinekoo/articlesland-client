import {NextPage} from "next";
import {AxiosResponse} from "axios";
import {publicApis} from "../../hooks/useRequest";
import {LinkResDto, PublicAPIS} from "../../utils/types";
import {LoadingOverlay} from "../../component/wrappers/loadingOverlay";

export async function getServerSideProps(ctx: any) {
    const shortLink: string | null | undefined = ctx?.params?.link || null;
    if (!shortLink) {
        return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        }
    }
    try {
        const apis: PublicAPIS = publicApis()
        const response : AxiosResponse | undefined = await apis.link.getShortLink(shortLink);
        if (!response?.data) return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        }
        const data : LinkResDto = response.data as LinkResDto;
        return {
            redirect: {
                destination: `/post/${data.username}/${data.id}`,
                permanent: false,
            },
        }
    } catch (e) {
        return {
          redirect: {
            destination: '/404',
            permanent: false,
          },
        }
    }
}

const Link: NextPage = () => {
    return (
        <div style={{width: '100vw', height: '100vh'}}>
            <LoadingOverlay visible={true}/>
        </div>
    )
}

export default Link