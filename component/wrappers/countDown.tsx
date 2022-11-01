import Countdown from "react-countdown";
import {SetStateAction} from "react";
import {CountdownTimeDeltaFn} from "react-countdown/dist/Countdown";

const renderer = ({minutes, seconds}: any) => {
    return (
        <span>ارسال مجدد کد تا {minutes}:{seconds} دقیقه دیگر</span>
    );
};

class CountDownProps {
    duration?: SetStateAction<any>
    onComplete?: CountdownTimeDeltaFn | (() => void) | undefined
}

export const CountDown = ({duration, onComplete}: CountDownProps) => {
    return (<span>
        {!!duration && <Countdown date={duration} renderer={renderer} onComplete={onComplete}/>}
    </span>)
}
