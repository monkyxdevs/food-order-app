import { useState } from "react"

export const Wallet = () => {
    const [pin,setPin] = useState<number>(0);


    const handleWallet = () =>{
        console.log("wallet");
        const
    }
    return <div className="flex h-screen justify-center items-center">
        <div className="max-w-sm space-y-3">
            <h1 className="text-2xl font-semibold text-center">Wallet</h1>
            <input type="number" onChange={(e)=>{
                const value = e.target.value
                setPin(value ? parseInt(value):0);
            }} className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Enter your 4 digit pin..."/>
            <div className="flex justify-center">
                <button onClick={handleWallet} className="btn btn-solid-success">Enter</button>
            </div>
        </div>
    </div>
}