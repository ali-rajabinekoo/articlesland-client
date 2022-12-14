import {
    Text,
    TextInput as BasicTextInput,
    TextInputProps as BasicTextInputProps,
    PasswordInput as BasicPasswordInput,
    PasswordInputProps as BasePasswordInputProps,
    Select,
    SelectProps,
    useMantineTheme,
    Textarea,
    TextareaProps,
    UnstyledButton,
} from "@mantine/core";
import React, {MouseEventHandler, ReactNode, RefObject, useEffect, useState} from "react";
import {Sx} from "@mantine/styles/lib/theme/types/DefaultProps";
import {
    useFloatingLabelInputStyle,
    usePasswordInputStyle,
    useScrollContainer,
    useTextInputStyle
} from "./styles";
import VerificationInput from "react-verification-input";
import {useMutex} from "react-context-mutex";
import useArticleLandEditorDirection from "../../hooks/editorDirection";
import {GetArticleResponseDto} from "../../utils/types";
import {v4 as uuidV4} from 'uuid';
import {IconCheck, IconSearch} from "@tabler/icons";
import {useRouter} from "next/router";
import styled from "@emotion/styled";

const renderLabel = (props: TextInputProps | PasswordInputProps | TextAreaInputProps): ReactNode => {
    let sx: Sx = {}
    let weight: React.CSSProperties['fontWeight'] = "normal"
    if (!!props.labelsx) {
        sx = {...sx, ...props.labelsx}
    }
    if (!!props.labelweight) {
        weight = props.labelweight
    }
    return !!props.labeltitle ?
        <Text component={'span'} weight={weight} size={"sm"} sx={sx} mb={"xs"}
              color={!!props?.textcolor ? props.textcolor : "grey.3"}>
            {props.labeltitle}
        </Text> : props.label
}

interface TextInputProps extends BasicTextInputProps {
    labeltitle?: string;
    labelsx?: Sx;
    labelweight?: React.CSSProperties['fontWeight'];
    weight?: React.CSSProperties['fontWeight'];
    customref?: RefObject<any>;
    darker?: true | false;
    textcolor?: string | undefined;
    onClickBtn?: Function | undefined;
}

export const TextInput = (props: TextInputProps): JSX.Element => {
    const {classes} = useTextInputStyle({
        darker: props.darker || false,
        textcolor: props.textcolor,
    })
    return (
        <BasicTextInput
            className={classes.input} ref={props.customref}
            label={renderLabel(props)} color={"grey.2"}
            placeholder={props.placeholder} {...props}
        />
    )
}

interface PasswordInputProps extends BasePasswordInputProps {
    labeltitle?: string
    labelsx?: Sx
    labelweight?: React.CSSProperties['fontWeight']
    weight?: React.CSSProperties['fontWeight']
    darker?: true | false
    textcolor?: string | undefined
}

export const PasswordInput = ({...props}: PasswordInputProps): JSX.Element => {
    const {classes} = usePasswordInputStyle({
        darker: props.darker || false,
        textcolor: props.textcolor,
    })
    return (
        <BasicPasswordInput
            className={classes.input}
            label={renderLabel(props)} color={"grey.2"}
            placeholder={props.placeholder} {...props}
        />
    )
}

interface VerificationCodeInputsProps {
    onChange?: ((value: string) => void) | undefined
}

export const VerificationCodeInputs = (props: VerificationCodeInputsProps): JSX.Element => {
    return (
        <div style={{display: 'flex', justifyContent: "center"}}>
            <VerificationInput
                length={6} placeholder={''}
                inputProps={{
                    autoComplete: "one-time-code"
                }}
                classNames={{
                    character: 'verification-inputs',
                    container: 'verification-inputs_container',
                    characterSelected: 'verification-inputs_selected',
                }}
                onChange={props.onChange}
            />
        </div>
    )
}

interface ScrollContainerProps {
    children?: React.ReactNode
    scroll?: 'x' | 'y' | 'both'
    bgColor?: string | undefined
    hover?: true | false
    sx?: object | undefined
}

export const ScrollContainer = (props: ScrollContainerProps) => {
    const {classes} = useScrollContainer(props)
    return (
        <div style={props.sx} className={classes.scrollbar}>{props.children}</div>
    )
}

interface ArticlesLandEditorProps {
    className?: string | undefined
    data?: GetArticleResponseDto | undefined
}

export const ArticlesLandEditor = ({className, data}: ArticlesLandEditorProps): JSX.Element => {
    const [counter, setCounter] = useState<number>(0)
    const {direction, init, check} = useArticleLandEditorDirection()
    const MutexRunner = useMutex();
    const mutex = new MutexRunner(uuidV4());

    const createEditorInstance = (_editor: any) => {
        window.editor = _editor
    }

    const generateEditor = (mutex: any) => {
        // @ts-ignore
        window?.ClassicEditor.create(document.querySelector(".articles-land-editor"), {
            licenseKey: process.env.CKEDITOR_LICENSE,
            config: {
                htmlEncodeOutput: true
            }
        })
            .then((_editor: any) => {
                createEditorInstance(_editor)
                init()
                if (!!data?.body) {
                    // @ts-ignore
                    window.editor.setData(data.body)
                }
            })
            .catch((error: any) => {
                setCounter(counter + 1)
                if (counter < 5) mutex.unlock();
                else {
                    console.error("Oops, something went wrong!");
                    console.error(
                        "Please, report the following error on https://github.com/ckeditor/ckeditor5/issues with the build id and the error stack trace:"
                    );
                    console.warn("Build id: e7bv9hmkfiph-a66fxojvt5nn");
                    console.error(error);
                }
            });
    }

    useEffect(() => {
        if (!!window.editor) {
            if (!check()) {
                mutex.run(() => {
                    mutex.lock();
                    generateEditor(mutex);
                });
            }
            return undefined
        }
        mutex.run(() => {
            mutex.lock();
            generateEditor(mutex);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!!data?.body) {
            // @ts-ignore
            window.editor.setData(data.body)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return (
        <div dir={"ltr"} className={`articles-land-editor-container ${direction} ${className ? className : ''}`}>
            <div className={`articles-land-editor`}/>
        </div>
    );
}

export function FloatingLabelInput(props: TextInputProps) {
    const [focused, setFocused] = useState(false);
    const {classes} = useFloatingLabelInputStyle({
        floating: (props?.value as string)?.trim()?.length !== 0 || focused
    });
    const {classes: textInputClasses} = useTextInputStyle({darker: true})

    return (
        <BasicTextInput
            label={renderLabel(props)}
            ref={props.customref}
            classNames={classes}
            className={textInputClasses.input}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            mt="md"
            autoComplete="nope"
            {...props}
        />
    );
}

export function SelectInput(props: SelectProps) {
    const {classes: textInputClasses} = useTextInputStyle({darker: true})

    return (
        <Select
            nothingFound={<Text size={"md"} color={"grey.4"}>?????? ?????????? ???????? ??????</Text>}
            maxDropdownHeight={!!props.maxDropdownHeight ? props.maxDropdownHeight : 280}
            className={textInputClasses.input}
            styles={(theme) => ({
                item: {
                    // applies styles to selected item
                    '&[data-selected]': {
                        '&, &:hover': {
                            backgroundColor:
                                theme.colorScheme === 'dark' ? theme.colors.teal[9] : theme.colors.grey[0],
                            color: theme.colorScheme === 'dark' ? theme.white : theme.colors.grey[4],
                        },
                    },

                    // applies styles to hovered item (with mouse or keyboard)
                    '&[data-hovered]': {},
                    color: theme.colorScheme === 'dark' ? theme.white : theme.colors.grey[4],
                },
            })}
            searchable={true}
            clearable={true}
            {...props}
        />
    )
}

export function SearchInput(props: TextInputProps) {
    const theme = useMantineTheme();
    const [value, setValue] = useState<string>(props.defaultValue as string | undefined || '')
    const {push, pathname} = useRouter()

    useEffect(() => {
        setValue(props.defaultValue as string)
    }, [props.defaultValue])

    return (
        <form onSubmit={async (e) => {
            e.preventDefault()
            if (!!props.onClickBtn) props.onClickBtn(value)
            const regex = new RegExp('/explore')
            if (!regex.test(pathname)) {
                await push('/explore')
            }
        }}>
            <TextInput
                rightSection={<UnstyledButton type={'submit'}>
                    <IconSearch color={theme.colors.grey[4]} size={24} stroke={1.5}/>
                </UnstyledButton>}
                radius="sm"
                size="md"
                placeholder="???? ?????? ???????????? ?????????? ????????"
                rightSectionWidth={42}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                darker={true}
                {...props}
            />
        </form>
    );
}

interface TextAreaInputProps extends TextareaProps {
    darker?: true | false
    textcolor?: string | undefined
    labeltitle?: string
    labelsx?: Sx
    labelweight?: React.CSSProperties['fontWeight']
}

export function TextAreaInput(props: TextAreaInputProps) {
    const {classes} = useTextInputStyle({
        darker: props.darker || false,
        textcolor: props.textcolor,
    })

    return (
        <>
            <Textarea
                placeholder="Autosize with no rows limit"
                label={renderLabel(props)}
                autosize
                minRows={2}
                name={props.name}
                onChange={props.onChange}
                value={props.value}
                className={classes.input}
                error={props.error}
                {...props}
            />
        </>
    )
}

const MainCheckBox = styled.div`
  border: 1px solid #7B7B7B;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
`;

const MainCheckBoxChecked = styled.div`
  border: 1px solid #0021FF;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: #0021FF;
`;

class CheckBoxProps {
    checked?: boolean;
    onChange?: Function | undefined;
    name?: string;
}

export function CheckBox({checked: defaultChecked = false, onChange = () => null, name}: CheckBoxProps) {
    const [checked, setChecked] = useState<boolean>()

    const handleOnChange: MouseEventHandler = () => {
        setChecked(!checked)
        onChange(!checked, name)
    }

    useEffect(() => {
        setChecked(defaultChecked)
    }, [defaultChecked])

    return (
        <UnstyledButton onClick={handleOnChange}>
            {
                checked ?
                    <MainCheckBoxChecked>
                        <IconCheck color={"white"}/>
                    </MainCheckBoxChecked> :
                    <MainCheckBox/>
            }
        </UnstyledButton>
    )
}
