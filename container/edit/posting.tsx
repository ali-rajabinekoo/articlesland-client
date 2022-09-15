import {
    Container,
    Text,
    Box,
    Stack,
    SelectItem,
    Group,
    Modal,
    useMantineTheme,
    MantineTheme,
    Grid,
    ActionIcon,
} from "@mantine/core";
import {DropzoneButton} from "../../component/buttons/upload";
import {SelectInput} from "../../component/inputs";
import {
    APIS,
    GetArticleResponseDto,
    UseFetchCategoriesResult,
    UseRequestResult,
    UseUserInfoResult
} from "../../utils/types";
import useFetchCategories from "../../hooks/fetchCategories";
import React, {useState} from "react";
import {PrimaryBtn, PrimaryOutlineBtn} from "../../component/buttons";
import ReadArticle from "../layout/readArticle";
import useUserInfo from "../../hooks/useUserInfo";
import {IconAlertCircle, IconCheck, IconChevronLeft} from "@tabler/icons";
import {NextRouter, useRouter} from "next/router";
import {showNotification} from "@mantine/notifications";
import {errorHandler} from "../../utils/helpers";
import useRequest from "../../hooks/useRequest";

class PostingProps {
    article!: GetArticleResponseDto
}

const Posting = ({article}: PostingProps) => {
    const {push}: NextRouter = useRouter()
    const {getApis}: UseRequestResult = useRequest()
    const {userInfo}: UseUserInfoResult = useUserInfo()
    const {categories}: UseFetchCategoriesResult = useFetchCategories();
    const {colors}: MantineTheme = useMantineTheme()
    const [openedModal, setOpenedModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [isPreview, setIsPreview] = useState<boolean>(false);
    const [isAgree, setIsAgree] = useState<boolean>(false);
    const [banner, setBanner] = useState<File>();
    const [categoryId, setCategoryId] = useState<string>()

    const onChangeBanner = (file: File) => {
        setBanner(file)
    }

    const onChangeCategory = (catId: any) => {
        if (!!catId) setCategoryId(catId)
    }

    const saveAndPublish = async (): Promise<void> => {
        if (!isAgree) {
            return showNotification({
                message: 'قوانین را مطالعه کنید و تیک موافقت آن را بزنید',
                autoClose: 2000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            });
        }
        const formData: FormData = new FormData();
        if (!!banner) {
            formData.append("image", banner as File);
        } else if (!article?.bannerUrl) {
            return showNotification({
                message: 'انتخاب یک تصویر به عنوان بنر الزامیست',
                autoClose: 2000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            });
        }
        if (!!categoryId) {
            formData.append('categoryId', categoryId);
        } else {
            return showNotification({
                message: 'انتخاب یک لیست برای پست الزامیست',
                autoClose: 2000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            });
        }
        const apis: APIS = getApis()
        try {
            setLoading(true)
            await apis.article.saveAndPublishArticle(article.id as number, formData)
            showNotification({
                message: 'پست شما با موفقیت منتشر شد',
                autoClose: 2000,
                color: 'green',
                icon: <IconCheck size={20}/>
            });
            setTimeout(async () => {
                await push('/dashboard')
            }, 2050)
        } catch (e) {
            errorHandler(e)
            setLoading(false)
        }
    }

    return (
        <div>
            <div style={{display: isPreview ? "none" : "block"}}>
                <Container size={'sm'}>
                    <Group position={'right'} mb={'sm'}>
                        <ActionIcon variant="transparent" onClick={() => push(`/edit/${article.id}`)}>
                            <IconChevronLeft size={25} color={'black'}/>
                        </ActionIcon>
                    </Group>
                    <Stack styles={60}>
                        <Box>
                            <Text color={'grey.4'} size={'lg'} weight={700}>
                                برای پست خود بنر انتخاب کنید
                            </Text>
                            <Text color={'grey.4'} mt={'sm'} size={'sm'} weight={400}>
                                برای نمایش پست شما در صفحات مختلف، عکسی را به عنوان بنر انتخاب کنید تا پست شما با این
                                عکس دیده
                                شود.
                            </Text>
                            <Box mt={'sm'}>
                                <DropzoneButton
                                    defaultImageSrc={!!article?.bannerUrl ? article?.bannerUrl : undefined}
                                    onChange={onChangeBanner}
                                />
                            </Box>
                        </Box>
                        <Box mb={'lg'}>
                            <Text color={'grey.4'} size={'lg'} weight={700}>
                                پست خود را دسته بندی کنید
                            </Text>
                            <Text color={'grey.4'} mt={'sm'} size={'sm'} weight={400}>
                                یک دسته بندی از موارد زیر، که مرتبط با نوشته ی شما می باشد را انتخاب کنید تا مقاله شما
                                در ان
                                دسته بندی دیده شود.
                            </Text>
                            <SelectInput
                                mt={'sm'}
                                placeholder={'نام دسته بندی مورد نظر خود را وارد کنید'}
                                data={categories as (string | SelectItem)[]}
                                onChange={onChangeCategory}
                                value={categoryId}
                            />
                            <Group position={"right"} mt={'md'} spacing={0} dir={'ltr'} noWrap={true}>
                                <Text color={'grey.4'} size={14} weight={400} dir={'rtl'} ml={8}>
                                    <Text
                                        component={'span'} color={'primary.3'} mr={8}
                                        onClick={() => setOpenedModal(true)}
                                        sx={{cursor: "pointer"}}
                                    >
                                        قوانین ArticlesLand
                                    </Text>
                                    را مطالعه کردم و مطالبم با قوانین سازگار می باشد.
                                </Text>
                                <div className="pretty p-default p-round p-smooth" style={{marginRight: 0}}>
                                    <input type="checkbox" onChange={() => setIsAgree(!isAgree)} checked={isAgree}/>
                                    <div className="state p-warning-o">
                                        <label></label>
                                    </div>
                                </div>
                            </Group>
                            <Grid dir={'ltr'} p={0} mt={'md'}>
                                <Grid.Col xs={4} pt={0}>
                                    <PrimaryBtn
                                        text={'انتشار پست'} capsule={"true"}
                                        onClick={() => saveAndPublish()}
                                        loading={loading}
                                    />
                                </Grid.Col>
                                <Grid.Col xs={4} pt={0}>
                                    <PrimaryOutlineBtn
                                        text={'پیش نمایش'} capsule={"true"}
                                        onClick={() => setIsPreview(true)}
                                        loading={loading}
                                    />
                                </Grid.Col>
                            </Grid>
                        </Box>
                    </Stack>

                    <Modal
                        opened={openedModal}
                        onClose={() => setOpenedModal(false)}
                        title="قوانین و مقررات"
                        centered={true}
                        size={'xl'}
                    >
                        <ul>
                            <Stack spacing={"xs"} px={18}>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        حقوق معنوی و مادیِ نوشتۀ شما در ArticlesLand، متعلق به شماست. با این حال، با
                                        انتشار نوشته
                                        های خود، به ما اجازه نشر نوشته های خود را می دهید.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        ما خود را برابر حقوق معنوی و مادی نوشتۀ افراد مسئول می‌دانیم و برابرِ سرقت
                                        مطالبِ شما یا
                                        سرقتِ مطالبِ دیگران توسط کاربران دیگر از نویسندۀ اصلی حمایت می‌کنیم.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        نقلِ مطالبِ دیگران از سوی کاربران، بدونِ ذکرِ منبع ممنوع است. در صورتِ اعتراضِ
                                        صاحبِ اصلیِ
                                        نوشته (منبعِ اصلی) ArticlesLand می‌تواند مطلبِ منتشرشده را حذف کند.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        مسئولیت حقوقی مطالب هر کاربر بر عهدۀ خود او است و ArticlesLand به‌عنوان یک بستر
                                        نشر محتوا،
                                        هیچ دخالتی در نوشتۀ کاربرانش ندارد.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        مسئولیت محتوایی که منتشر می‌کنید بر عهده‌ی شماست. بدین معنا که شما متوجه کلیه‌ی
                                        عواقب ناشی
                                        از آن، شامل اعتماد دیگران به صحت محتوا، مسائل مربوط به حقوق مالکیت فکری و سایر
                                        مسائل و حقوق
                                        قانونی هستید.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        اهانت به سایر کاربران، شخصیت‌ها، افراد مشهور، مقدسات و قوانین جمهوری اسلامی
                                        ایران ممنوع است.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        ArticlesLand بر اساس دریافت گزارش از سایر کاربران، برابر نشر محتوای
                                        حساسیت‌برانگیز یا
                                        توهین‌آمیز در نظرات یا پست‌ها، به مسدودسازی شناسه کاربری اقدام خواهد کرد.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        انتشار مطالب مجرمانه در ArticlesLand ممنوع است. کلیۀ مسوولیت‌های مربوط به
                                        انتشارِ مطالبِ
                                        مجرمانه برعهدۀ کاربر است. ArticlesLand به محض اطلاع از انتشار مطالب مجرمانه،
                                        نسبت به حذف
                                        آنها اقدام خواهد کرد.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        ما هرگز محتوای شما و اطلاعات شما را بدون کسب اجازه‌ی معتبر از شما به شخص یا
                                        نهادی ثالث
                                        نمی‌فروشیم.
                                    </Text>
                                </li>
                                <li style={{color: colors.grey[4]}}>
                                    <Text color={'grey.4'} size={'sm'} weight={400} sx={{lineHeight: '28.8px'}}>
                                        اطلاعات شخصیِ شما به امانت در اختیار ماست. ما این امانت را به هیچ‌وجه برای مقاصد
                                        تجاری
                                        استفاده نخواهیم کرد.
                                    </Text>
                                </li>
                            </Stack>
                        </ul>
                    </Modal>
                </Container>
            </div>
            {isPreview && !!userInfo && <ReadArticle
                user={userInfo}
                article={article as GetArticleResponseDto}
                onBack={() => setIsPreview(false)}
                bannerFile={banner}
            />}
        </div>
    )
}

export default Posting
