import React, {useEffect, useRef, useState} from 'react';
import {Text, Group, FileButton, Avatar} from '@mantine/core';
import {Dropzone, MIME_TYPES} from '@mantine/dropzone';
import {IconCloudUpload, IconX, IconDownload} from '@tabler/icons';
import {useUploadInput} from "./upload.styles";
import {PrimaryBtn} from "./index";

class DropzoneButtonProps {
    onChange?: Function | undefined
    isAvatar?: true | false
    disabled?: true | false
}

export function DropzoneButton({onChange, isAvatar = false, disabled = false}: DropzoneButtonProps) {
    const {classes, theme} = useUploadInput();
    const openRef = useRef<() => void>(null);
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (!!onChange) onChange(file)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [file])

    return (
        <div className={classes.wrapper}>
            <Dropzone
                openRef={openRef}
                onDrop={(files: File[]) => {
                    setFile(files[0])
                }}
                className={classes.dropzone}
                radius="md"
                accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
                maxSize={3 * 1024 ** 2} // 3MB
                maxFiles={1}
                sx={!!file && !isAvatar ? {backgroundImage: `url(${URL.createObjectURL(file)})`} : {}}
                disabled={disabled}
            >
                <div style={{pointerEvents: 'none'}}>
                    <div style={!file || !isAvatar ? {display: "none"} : {}}>
                        <Group position={'center'} mt={12}>
                            <Avatar src={!!file ? URL.createObjectURL(file) : ''} size={164} radius={150}/>
                        </Group>
                    </div>
                    <div style={!!file ? {display: "none"} : {}}>
                        <Group position="center">
                            <Dropzone.Accept>
                                <IconDownload size={50} color={theme.colors[theme.primaryColor][6]} stroke={1.5}/>
                            </Dropzone.Accept>
                            <Dropzone.Reject>
                                <IconX size={50} color={theme.colors.red[6]} stroke={1.5}/>
                            </Dropzone.Reject>
                            <Dropzone.Idle>
                                <IconCloudUpload
                                    size={50}
                                    color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                                    stroke={1.5}
                                />
                            </Dropzone.Idle>
                        </Group>

                        <Text align="center" weight={700} size="lg" mt="sm">
                            <Dropzone.Accept>Drop files here</Dropzone.Accept>
                            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
                            <Dropzone.Idle>عکس مورد نظر را انتخاب کنید و داخل این کادر رها کنید</Dropzone.Idle>
                        </Text>
                        <Text align="center" size="sm" mt="xs" color="dimmed">
                            برای آپلود، فایل‌ها را اینجا بکشید و رها کنید. ما فقط می توانیم فایل هایی با فرمت png یا
                            jpeg را
                            بپذیریم که حجم آنها کمتر از 3 مگابایت باشد.
                        </Text>
                    </div>
                </div>
            </Dropzone>


            <FileButton onChange={setFile} accept="image/png,image/jpeg">
                {(props) => (
                    <PrimaryBtn
                        size="md" radius="xl"
                        className={classes.control}
                        text={'انتخاب فایل'} capsule={"true"}
                        {...props}
                    />
                )}
            </FileButton>
        </div>
    );
}
