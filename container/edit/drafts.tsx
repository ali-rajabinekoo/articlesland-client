import {Accordion, Grid, Text, Modal} from "@mantine/core";
import {useDraftsStyles} from "./drafts.styles";
import DraftCard from "../../component/cards/draftCard";
import {APIS, DraftResponseDto, UseRequestResult} from "../../utils/types";
import React, {useEffect, useState} from "react";
import IFrame from "../../component/iframe";
import useRequest from "../../hooks/useRequest";
import {showNotification} from "@mantine/notifications";
import {appMessages} from "../../utils/messages";
import {IconAlertCircle} from "@tabler/icons";

class DraftsProps {
    draftsList?: DraftResponseDto[] | undefined
}

const Drafts = ({draftsList = []}: DraftsProps): JSX.Element => {
    const {classes} = useDraftsStyles()
    const {getApis}: UseRequestResult = useRequest()
    const [loading, setLoading] = useState<true | false>(true)
    const [drafts, setDrafts] = useState<DraftResponseDto[]>([])
    const [selectedDraft, setSelectedDraft] = useState<DraftResponseDto | null>(null)
    const [openedModal, setOpenedModal] = useState<true | false>(false)

    const onSelectShowContent = (index: number) => {
        setSelectedDraft(drafts[index])
        setOpenedModal(true)
    }

    const onRemoveDraft = async (index: number) => {
        const apis: APIS = getApis()
        const id: string = drafts[index]?.id as string
        try {
            if (!id) {
                return showNotification({
                    message: appMessages.somethingWentWrong,
                    title: 'خطا',
                    autoClose: 3000,
                    color: 'red',
                    icon: <IconAlertCircle size={20}/>
                })
            }
            await apis.draft.removeDraft(id)
            setDrafts(drafts.filter(el => el.id !== id))
        } catch (e) {
            console.log(e)
            showNotification({
                message: appMessages.somethingWentWrong,
                title: 'خطا',
                autoClose: 3000,
                color: 'red',
                icon: <IconAlertCircle size={20}/>
            })
        }
    }

    useEffect(() => {
        setDrafts(draftsList)
    }, [draftsList])

    return (
        <>
            <Accordion classNames={{item: classes.item}} className={classes.wrapper}>
                <Accordion.Item value="drafts">
                    <Accordion.Control>
                        <Text weight={600} color={'grey.4'}>نمایش متن های ذخیره شده خودکار</Text>
                    </Accordion.Control>
                    <Accordion.Panel>
                        <Grid className={classes.cardsWrapper}>
                            {drafts.map((el, index: number) => {
                                return (
                                    <Grid.Col xs={4} key={index}>
                                        <DraftCard
                                            {...el}
                                            showContent={onSelectShowContent.bind({}, index)}
                                            removeDraft={onRemoveDraft.bind({}, index)}
                                        />
                                    </Grid.Col>
                                )
                            })}
                            {drafts.length === 0 && <>
                                <Text weight={600} size={'sm'} color={'grey.4'}>
                                    محتوایی برای نمایش یافت نشد
                                </Text>
                            </>}
                        </Grid>
                    </Accordion.Panel>
                </Accordion.Item>
            </Accordion>
            <Modal
                opened={openedModal}
                onClose={() => setOpenedModal(false)}
                title={!!selectedDraft ? selectedDraft.title : ''}
                centered={true}
                size={'xl'}
            >
                {!!selectedDraft && <IFrame
                    srcDoc={!!selectedDraft?.body ? selectedDraft.body as string : undefined}
                />}
            </Modal>
        </>
    )
}

export default Drafts
