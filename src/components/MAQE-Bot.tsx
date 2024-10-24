'use client'
import React, { useEffect, useState } from "react"

type Direction = "North" | "East" | "South" | "West"


export default function Bot() {
    const [output, setOutput] = useState<string>("None");

    const [walkingCode, setWalkingCode] = useState<string>('');

    const handleWalkingCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWalkingCode(e.target.value);
    };

    const isValidString = (s: string): boolean => {
        /*
          // Find W including without N
          const regex = /^(R|L|W\d*)+$/;
        */

        // Find W with N least one digit to indicate
        const validationRegex = /^(R|L|W\d+)+$/;
        return validationRegex.test(s);
    }

    const splitString = (s: string): string[] => {
        const tokenRegex = /(R|L|W\d*)/g;
        return s.match(tokenRegex) || [];
    }


    useEffect(() => {
        if (isValidString(walkingCode)) {
            const point: [x: number, y: number] = [0, 0];
            const directions: Direction[] = ["North", "East", "South", "West"] as const;
            let currDirection: Direction = directions[0];

            splitString(walkingCode).forEach((nextStep) => {
                if (nextStep.startsWith("W")) {
                    const numberPart = nextStep.slice(1);
                    const numStep = numberPart ? parseInt(numberPart, 10) : 0;

                    // N=Y+ | E=X+ | S=Y- | W=X-
                    if (currDirection === "North") {
                        point[1] += numStep;
                    } else if (currDirection === "East") {
                        point[0] += numStep
                    } else if (currDirection === "South") {
                        point[1] -= numStep;
                    } else {
                        point[0] -= numStep;
                    }
                } else {
                    // Set new Direction
                    if (currDirection === directions[0] && nextStep === 'L') {
                        currDirection = directions[3];
                    } else if (currDirection === directions[3] && nextStep === 'R') {
                        currDirection = directions[0]
                    } else {
                        const currDirectionIndex = directions.indexOf(currDirection);
                        currDirection = (nextStep === "R" ? directions[currDirectionIndex + 1] : directions[currDirectionIndex - 1])
                    }
                }
            })

            setOutput(`X: ${point[0]} Y: ${point[1]} Direction: ${currDirection}`)
        } else {
            setOutput('The input is invalid');
        }

    }, [walkingCode]);

    return (
        <div className="flex flex-col m-5 border rounded-md p-5">
            <div className="flex flex-row gap-2">
                <label className='font-semibold' htmlFor="walkingCode">Walking Code:</label>
                <input type="text" className="pl-2 border-2 rounded-md border-gray-400 w-96" id="walkingCode"
                    value={walkingCode} onChange={handleWalkingCodeChange} />
            </div>
            <p className='font-semibold'>Output:&emsp;<span 
            className={output === 'The input is invalid' ? "text-red-700" : ""}>{output}</span></p>
        </div>
    )
}