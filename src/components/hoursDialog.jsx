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
                <Button className='mt-5 w-full sm:w-48 h-10 sm:h-12 text-xl sm:text-2xl' size="lg">
                    Find Best Time
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[95vw] max-w-xs sm:max-w-sm md:max-w-md p-4 sm:p-6 border-4 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-md">
                <DialogHeader>
                    <DialogTitle className="text-xl sm:text-2xl font-black">
                        {time === "wakeup" ? "When to go to bed" : "When to wake up"}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-base sm:text-lg">
                    {time === "wakeup" ? (
                        <p className="mb-4 font-bold">To wake up at <span className="text-lg">{`${hour.slice(0,2)}:${hour.slice(2,4)} ${meridiem}`}</span>, you should try to fall asleep at one of the following times:</p>
                    ) : (
                        <p className="mb-4 font-bold">If you go to bed at <span className="text-lg">{`${hour.slice(0,2)}:${hour.slice(2,4)} ${meridiem}`}</span>, you should try to wake up at one of the following times:</p>
                    )}
                    <div className="mt-4 space-y-3">
                    {results.map((result, index) => (
                    <div 
                        key={index} 
                        className={`
                            p-3 rounded-md border-3
                            translate-x-0 translate-y-0
                            ${result.minimum 
                                ? 'bg-yellow-300 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]' 
                                : 'bg-blue-300 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                            }
                            hover:-translate-y-0.5 hover:-translate-x-0.5 
                            hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]
                            transition-all cursor-pointer
                        `}
                    >
                        <div className="flex justify-between items-center gap-3">
                            <div className="flex flex-col">
                                <span className="text-xl font-black text-black">
                                    {result.time}
                                </span>
                                <span className="text-xs font-bold text-black">
                                    {result.minimum ? 'Minimum recommended' : 'Optimal sleep time'}
                                </span>
                            </div>
                            <div className={`
                                flex items-center justify-center
                                w-14 h-14 rounded-md border-3 border-black
                                ${result.minimum 
                                    ? 'bg-pink-300' 
                                    : 'bg-green-300'
                                }
                                shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                            `}>
                                <span className="text-lg font-black text-black">{result.hoursRest}</span>
                            </div>
                        </div>
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