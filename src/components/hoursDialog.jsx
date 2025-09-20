import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"

import { Button } from "../components/ui/button"
import { useState } from "react"


const HoursDialog = ({hour, meridiem, time}) => {
    const [results, setResults] = useState([]);

    const calculateBedTimes = () => {
        // wakeUpTime should be in "HH:MM" 24h format (e.g., "06:30")
        let hours = parseInt(hour.slice(0, 2), 10);
        let minutes = parseInt(hour.slice(2, 4), 10);

        // Convert to 24h format using the modifier
        if (meridiem.toUpperCase() === "PM" && hours !== 12) {
            hours += 12;
        }
        if (meridiem.toUpperCase() === "AM" && hours === 12) {
            hours = 0;
        }

        const baseDate = new Date();
        baseDate.setHours(hours, minutes, 0, 0);

        const cycleMinutes = 90;
        const results = [];

        if (time === "wakeup") {
            // Calculate bedtimes (work backwards)
            for (let cycles = 6; cycles >= 3; cycles--) {
            const totalMinutes = cycles * cycleMinutes
            const bedtime = new Date(baseDate.getTime() - totalMinutes * 60000);

            let h = bedtime.getHours();
            let m = bedtime.getMinutes().toString().padStart(2, "0");
            const ampm = h >= 12 ? "PM" : "AM";
            h = h % 12 || 12;
            const formatted = `${h}:${m} ${ampm}`;

            results.push({
                time: formatted,
                hoursRest: `${(cycles * 1.5).toFixed(1)}h`,
                minimum: cycles === 3
            });
            }
        } else if (time === "sleep") {
            for (let cycles = 3; cycles <= 6; cycles++) {
                const totalMinutes = cycles * cycleMinutes
                const wakeUp = new Date(baseDate.getTime() + totalMinutes * 60000);

                let h = wakeUp.getHours();
                let m = wakeUp.getMinutes().toString().padStart(2, "0");
                const ampm = h >= 12 ? "PM" : "AM";
                h = h % 12 || 12;
                const formatted = `${h}:${m} ${ampm}`;

                results.push({
                    time: formatted,
                    hoursRest: `${(cycles * 1.5).toFixed(1)}h`,
                    minimum: cycles === 3
                });
            }
        }

        setResults(results);
    }


  return (
    <Dialog onOpenChange={(open) => open && calculateBedTimes()}>
        <form>
            <DialogTrigger asChild>
                <Button className='mt-5 w-48 h-12 text-2xl' size="lg">
                    Find Best Time
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {time === "wakeup" ? "When to go to bed" : "When to wake up"}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-lg">
                    {time === "wakeup" ? (
                        <p className="mb-2">To wake up at <span className="font-bold">{`${hour.slice(0,2)}:${hour.slice(2,4)} ${meridiem}`}</span>, you should try to fall asleep at one of the following times:</p>
                    ) : (
                        <p className="mb-2">If you go to bed at <span className="font-bold">{`${hour.slice(0,2)}:${hour.slice(2,4)} ${meridiem}`}</span>, you should try to wake up at one of the following times:</p>
                    )}
                    <div className="mt-4 space-y-2">
                        {results.map((result, index) => (
                            <div key={index} className={`flex justify-between ${result.minimum ? 'font-bold text-blue-600' : ''}`}>
                                <span>{result.time}</span>
                                <span>{result.hoursRest} of sleep</span>
                            </div>
                        ))}
                    </div>
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" className="w-full">Go to sleep</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>
    
  )
}

export default HoursDialog