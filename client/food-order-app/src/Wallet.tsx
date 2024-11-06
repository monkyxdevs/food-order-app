import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Wallet = () => {
    const [pin,setPin] = useState<number>(0);
    const userId = localStorage.getItem("userId");
    let balance = localStorage.getItem("balance");
    const totalPrice = localStorage.getItem("totalPricec")
    let truncatedBalance = balance ? Math.floor(parseFloat(balance) * 100) / 100 : 0; // Multiplies, floors, then divides by 100
    const [showTranscationPage,setShowTranscationPage] = useState(false);
    const [successMessage,setSuccessMessage] = useState(false);
    // const [Animation,setAnimation] = useState(false);
    const navigate = useNavigate();
    const handleWallet = async() =>{
        console.log("wallet");
        const res = await axios.post("http://localhost:3000/api/m3/user/wallet/pin",{
            userId,
            pin
        })
        if (res) {
            setShowTranscationPage(true);
        }
    }

    const amount = totalPrice ? parseFloat(totalPrice) : 0;
    const handlePayment = async() => {
        await axios.post("http://localhost:3000/api/m3/account/transfer",{
            amount,
            userId  
        }).then((res)=>{
            if (res) {
                console.log("Order palced Successfully...");
                setSuccessMessage(true)
                setTimeout(() => {
                    // setAnimation(true)
                }, 2000);          
                setTimeout(() => {      
                    localStorage.clear()
                    navigate("/signin")
                }, 7000);

            }
            else{
                console.error("Error occured while placing order!");
            }
        })
    }
    // const LottieAnimation: React.FC = () => {
    //     useEffect(() => {
    //       const script = document.createElement("script");
    //       script.src = "https://unpkg.com/@lottiefiles/lottie-player@2.0.8/dist/lottie-player.js";
    //       script.async = true;
    //       document.body.appendChild(script);
    //     }, []);
      
    //     return (
    //       <div
    //         dangerouslySetInnerHTML={{
    //           __html: `
    //             <lottie-player
    //               src="https://lottie.host/10e55b00-779d-4b60-99d7-494864a532ee/6umv9Nbebn.json"
    //               background="#FFFFFF"
    //               speed="1"
    //               style="width: 300px; height: 300px"
    //               loop
    //               autoplay
    //               direction="1"
    //               mode="normal"
    //             ></lottie-player>
    //           `,
    //         }}
    //       />
    //     );
    //   };
    return <div className="flex h-screen justify-center items-center">
        {showTranscationPage ? (
        <div>
            <div className="flex justify-center mb-5">
                <div className="grid grid-cols-2 lg:items-center border border-gray-200 rounded-xl dark:border-neutral-700">
                    <div className="flex flex-col p-4">
                        <h4 className="text-gray-800 mb-1 dark:text-neutral-200">Balance</h4>
                        <div className="flex gap-x-1">
                        <span className="text-xl font-normal text-slate-800 dark:text-neutral-200">$</span>
                        <p data-hs-toggle-count='{
                            "target": "#toggle-count",
                            "min": 19,
                            "max": 29
                            }' className="text-gray-800 font-semibold text-3xl dark:text-neutral-200">
                            {truncatedBalance}
                        </p>
                        </div>
                    </div>

                    <div className="flex flex-col p-4">
                        <div className="flex justify-between">
                        <h4 className="text-gray-800 mb-1 dark:text-neutral-200">Toatl Price</h4>
                        </div>
                        <div className="flex gap-x-1">
                        <span className="text-xl font-normal text-gray-800 dark:text-neutral-200">$</span>
                        <p data-hs-toggle-count='{
                            "target": "#toggle-count",
                            "min": 89,
                            "max": 99
                            }' className="text-gray-800 font-semibold text-3xl dark:text-neutral-200">
                            {totalPrice}
                        </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button onClick={handlePayment} className="btn btn-solid-secondary ">Pay</button>
            </div>
        </div>
        ) : (
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
        )}
        {successMessage && (
            <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/50">
                {/* {Animation && (<LottieAnimation/>)}  */}
                <div className="text-center p-10 bg-gray-800 rounded-lg shadow-lg">
                    <h1 className="font-bold text-4xl text-slate-200">Order Placed Successfully</h1>
                    <h1 className="font-semibold text-2xl text-slate-300">Current Balance: {truncatedBalance}</h1>
                    <p className="text-md text-slate-400">Redirecting....</p>
                </div>
            </div>

        )}
    </div>
}