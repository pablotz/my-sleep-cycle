import { useEffect } from "react"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp"


const HourPicker = ({hour, setHour}) => {

    useEffect(() => {
      // Split the value into hours and minutes
        const hours = parseInt(hour.slice(0, 2), 10);
        const minutes = parseInt(hour.slice(2, 4), 10);

        // Validate hours and minutes
        if (hours > 12) {
            setHour("12" + hour.slice(2, 4));
        }
        if (minutes > 59) {
            setHour(hour.slice(0, 2) + "59");
        }

    }, [hour])
    

    return (
        <InputOTP 
            maxLength={4} 
            value={hour}
            onChange={(value) => setHour(value)}>
            <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator/>
            <InputOTPGroup>
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
            </InputOTPGroup>
        </InputOTP>
  )
}

export default HourPicker