"use client";                        // Enables client-side rendering for this component
import { useState, useRef, useEffect, ChangeEvent } from "react";                   // Import React hooks and types
import { Input } from "@/components/ui/input";                                      // Import custom Input component
import { Button } from "@/components/ui/button";                                    // Import custom Button component
import { time } from "console";


export default function Cowntdown(){

    //state to manage the duration input:
    const [duration, setDuration] = useState<number | string>("");
    const [ timeLeft, setTimeLeft] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    //function to handle the setting of the duration of the cowntdown:
    const handleSetDuration = () : void => {
        if (typeof duration === "number" && duration > 0) {
            setTimeLeft(duration);                                   // Set the countdown timer
            setIsActive(false);                                      // Reset active state
            setIsPaused(false);                                      // Reset paused state

            if(timerRef.current){                                    // Clear any existing timer
                clearInterval(timerRef.current);
            }

        }
    };

    //function to handle the start of the countdown:
    const handleStart = () : void => {
        if (timeLeft > 0){
            setIsActive(true);                                     // Set the timer as active
            setIsPaused(false);                                    // Unpause the timer if it was paused
        }
    };

    // Function to pause the countdown timer:
    const handlePause = () : void => {
        if(isActive){
            setIsActive(false);                                     // Set the timer as inactive
            setIsPaused(true);                                      // Set the timer as paused

            if(timerRef.current){                                   // Clear any existing timer
                clearInterval(timerRef.current);
            }
        }
    };

    // Function to reset the countdown timer:
    const handleReset = () : void => {
        setIsActive(false);                                         // set the timer as inactive
        setIsPaused(false);                                        // set the timer as unpaused
        setTimeLeft(typeof duration === "number" ? duration : 0);   //reset the timer to the original duration
        
        if(timerRef.current){                                      //clear any existing timer
            clearInterval(timerRef.current);
        }
    };


    // useEffect hook to manage the countdown interval:
    useEffect(() => { 
        if (isActive && !isPaused) {                               // If the timer is active and not paused
            timerRef.current = setInterval(() => {                 // Set an interval to decrease the time left
                setTimeLeft((prevTime) => {
                    if(prevTime <= 1 ){                            // If time is up, clear the interval
                        clearInterval(timerRef.current!);
                        return 0;
                    }
                    return prevTime - 1;                           // Decrease the time left by one second
                });
            }, 1000);                                              // Interval of 1 second
            
        };

        // Cleanup function to clear the interval
        return () => {
            if (timerRef.current) {
              clearInterval(timerRef.current);
            }
          };
        }, [isActive, isPaused]);                                 // Dependencies array to rerun the effect


        // Function to format the time left into mm:ss format
        const formatTime = ( time: number) : string => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            return `${String(minutes).padStart(2, "0")} : ${String(seconds).padStart(2, "0")}`;

        };

        // Function to handle changes in the duration input field:
        const handleDurationChange = (e:ChangeEvent<HTMLInputElement>) : void => {
            setDuration (Number(e.target.value) || "");                // Update the duration state
        };


        // JSX return statement rendering the Countdown UI:
        return(

            // Container div for centering the content
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">

                 {/* Timer box container */}
                 <div className="bg-red-100 dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                    {/* Title of the countdown timer */}
                    <h1 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200 text-center">
                        Cowntdown Timer
                        </h1>
                        {/* Input and set button container */}
                        <div className="flex items-center mb-6">
                            <Input
                            type="number"
                            id="duration"
                            placeholder="Enter duration in seconds"
                            value={duration}
                            onChange={handleDurationChange}
                            className="flex-1 mr-4 rounded-md bg-gradient-to-r from-red-100 via-red-200 to-red-200 border-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"/>
                            <Button
                            onClick={handleSetDuration}
                            variant="outline"
                            className="text-gray-800 dark:text-gray-200 bg-gradient-to-r from-red-100 via-red-200 to-red-200 hover:shadow-lg hover:shadow-rose-200 "                            
                            >
                               Set
                            </Button>
                        </div>
                        {/* Display the formatted time left */}
                        <div className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-8 text-center">
                            {formatTime(timeLeft)}
                        </div>
                        {/* Buttons to start, pause, and reset the timer */}
                        <div className="flex justify-center gap-4">
                            <Button
                            onClick={handleStart}
                            variant="outline"
                            className="text-gray-800 dark:text-gray-200 hover:bg-red-100 bg-gradient-to-r from-red-100 via-red-200 to-red-200 hover:shadow-lg hover:shadow-rose-200"
                            >
                                {isPaused ? "Resume" : "Start"}
                            </Button>
                            <Button
                            onClick={handlePause}
                            variant="outline"
                            className="text-gray-800 dark:text-gray-200 bg-gradient-to-r from-red-100 via-red-200 to-red-200 hover:shadow-lg hover:shadow-rose-200"
                            >
                                Pause
                            </Button>
                            <Button
                            onClick={handleReset}
                            variant="outline"
                            className="text-gray-800 dark:text-gray-200 bg-gradient-to-r from-red-100 via-red-200 to-red-200 hover:shadow-lg hover:shadow-rose-200"
                            >
                                Reset
                            </Button>
                        </div>
                 </div>
            </div>

             
        )

        
    

}