import './App.css'
import HourPicker from './components/hourPicker';
import { Tabs, TabsList, TabsTrigger } from "./components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card"

import {
  Moon,
  Sun
} from "lucide-react"
import HoursDialog from './components/hoursDialog';
import { useState } from 'react';


function App() {
  const [hour, setHour] =  useState("0730");
  const [meridiem, setMeridiem] = useState("AM");
  const [time, setTime] = useState("wakeup");

  return (
      <div className="flex items-center justify-center h-screen">
          <div className="absolute top-4 left-6 flex items-center space-x-2 z-10">
              <span className="text-xl font-bold">My Sleep Cycle</span>
              <Moon className="w-7 h-7 fill-amber-200" color='amber-200'/>
          </div>
          <Card className="w-110 h-[32rem] p-6 flex flex-col items-center justify-center">
            <div className="w-full h-full flex flex-col items-center">
              <div className="flex pt-17">
                  <p className='pr-4 text-3xl font-semibold '>Set a time to</p> 
                  <div className='pt-2'>
                    <Select value={time} onValueChange={(value) => setTime(value)}>
                    <SelectTrigger className="w-40 text-xl h-6">
                      <SelectValue
                        placeholder={
                          <>
                            <Sun />
                            Wake Up
                          </>
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wakeup">
                        <Sun />
                        Wake Up
                      </SelectItem>
                      <SelectItem value="sleep">
                        <Moon />
                        Sleep
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  </div>
              </div>
              <div className="mt-10 mb-40 flex items-center">
                  <div className='pr-4'>
                      <HourPicker hour={hour} setHour={setHour} />
                  </div>
                  <div>
                      <Tabs defaultValue="AM">
                          <TabsList>
                              <TabsTrigger value="AM" onClick={() => setMeridiem("AM")}>AM</TabsTrigger>
                              <TabsTrigger value="PM" onClick={() => setMeridiem("PM")}>PM</TabsTrigger>
                          </TabsList>
                      </Tabs>
                  </div>
              </div>
              <div>
                  <HoursDialog 
                    hour={hour} 
                    meridiem={meridiem} 
                    time={time}
                  />
              </div>
            </div>
          </Card>
      </div>
  )
}

export default App