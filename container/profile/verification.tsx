import React from "react";
import {Anchor, Box, Text} from "@mantine/core";
import {VerificationCodeInputs} from "../../component/inputs";
import {CountDown} from "../../component/countDown";
import {CountdownTimeDeltaFn} from "react-countdown/dist/Countdown";

class ProfileVerificationProps {
    codeSent?: boolean
    onChange?: (value: string) => void
    sendCode?: Function | undefined
    isActiveResend?: boolean
    timer?: number
    onCompleteTimer?: CountdownTimeDeltaFn | (() => void) | undefined
}

const ProfileVerification = ({
    codeSent,
    sendCode,
    onCompleteTimer,
    timer,
    isActiveResend,
    onChange
}: ProfileVerificationProps) => {
    return (
        <Box my={'lg'} sx={codeSent ? {display: "block"} : {display: "none"}}>
            <Text color={'grey.4'} size={'sm'} weight={500}>کد تایید:</Text>
            <Box mt={'sm'} dir='ltr'>
                {onChange && <VerificationCodeInputs onChange={onChange}/>}
            </Box>
            <Text align="center" mt="md" size="sm" color={"grey.3"} sx={{
                display: "flex", flexWrap: "nowrap", justifyContent: "center"
            }}>
                پیامی دریافت نکردید؟
                {/* @ts-ignore*/}
                <Anchor
                    color={"info.2"} ml={5}
                    onClick={isActiveResend && !!sendCode ? () => sendCode() : () => null}
                >
                    {
                        !!timer && !isActiveResend ?
                            <CountDown duration={timer} onComplete={onCompleteTimer}/> :
                            <span>مجدد امتحان کنید</span>
                    }
                </Anchor>
            </Text>
        </Box>
    )
}

export default ProfileVerification
