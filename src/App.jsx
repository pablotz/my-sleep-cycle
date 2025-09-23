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
  Card
} from "./components/ui/card"

import {
  Moon,
  Sun
} from "lucide-react"
import githubIcon from './assets/github.svg'
import HoursDialog from './components/hoursDialog';
import { useState } from 'react';


function App() {
  const [hour, setHour] =  useState("0730");
  const [meridiem, setMeridiem] = useState("AM");
  const [time, setTime] = useState("wakeup");

  return (
      <div className="relative min-h-screen flex items-center justify-center px-4 sm:px-6">
          <div className="absolute w-55 sm:w-57 top-4 sm:left-1/2 left-65 -translate-x-1/2 flex items-center space-x-3 bg-yellow-300 px-4 py-2 border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-lg sm:text-xl font-black">My Sleep Cycle</span>
              <Moon className="w-6 sm:w-7 h-6 sm:h-7" strokeWidth={3} />
          </div>
          <a
            href="https://github.com/pablotz/my-sleep-cycle"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed top-4 sm:top-auto sm:bottom-6 left-4 sm:left-6 bg-blue-300 p-2 border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            <img src={githubIcon} alt="GitHub" className="w-6 h-6 lg:w-8 lg:h-8" />
          </a>
          <Card className="w-full md:w-105 max-w-sm sm:max-w-md md:max-w-lg h-auto min-h-[28rem] p-4 sm:p-6 flex flex-col items-center justify-center bg-white border-4 border-black rounded-md shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-full h-full flex flex-col items-center">
              <div className="flex flex-col sm:flex-row items-center sm:space-y-0 sm:space-x-4">
                  <p className='text-2xl sm:text-3xl font-semibold text-center sm:text-left'>Set a time to</p> 
                  <div className='w-full sm:w-auto mt-4 sm:mt-0'>
                    <Select value={time} onValueChange={(value) => setTime(value)}>
                      <SelectTrigger className="w-full sm:w-40 text-lg font-bold h-12 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all">
                        <SelectValue
                          placeholder={
                            <div className="flex items-center gap-2">
                              <Sun strokeWidth={3} />
                              <span className="font-black">Wake Up</span>
                            </div>
                          }
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <SelectItem value="wakeup" className="font-bol">
                          <div className="flex items-center gap-2">
                            <Sun strokeWidth={3} />
                            Wake Up
                          </div>
                        </SelectItem>
                        <SelectItem value="sleep" className="font-bold hover:bg-blue-300">
                          <div className="flex items-center gap-2">
                            <Moon strokeWidth={3} />
                            Sleep
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
              </div>
              <div className="mt-8 sm:mt-15 mb-16 sm:mb-40 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div>
                      <HourPicker hour={hour} setHour={setHour} />
                  </div>
                  <div className="w-full sm:w-auto mt-4 sm:mt-0">
                      <Tabs defaultValue="AM" className="w-full">
                          <TabsList className="bg-gray-100 p-1 border-4 border-black rounded-md shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                              <TabsTrigger 
                                value="AM" 
                                onClick={() => setMeridiem("AM")}
                                className="font-black data-[state=active]:text-black rounded border-2 border-black data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                              >
                                AM
                              </TabsTrigger>
                              <TabsTrigger 
                                value="PM" 
                                onClick={() => setMeridiem("PM")}
                                className="font-black data-[state=active]:bg-blue-300 data-[state=active]:text-black rounded border-2 border-black data-[state=active]:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                              >
                                PM
                              </TabsTrigger>
                          </TabsList>
                      </Tabs>
                  </div>
              </div>
              <div className="w-full">
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