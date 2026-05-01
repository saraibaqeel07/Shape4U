import LoginForm from "@/components/forms/LoginForm"
import PreScreenForm from "@/components/forms/PreScreenForm"
import SignupForm from "@/components/forms/SignUpForm"
import Image from "next/image"

const PreScreenPage = () => {

    return (
        <div className="relative flex overflow-hidden  h-screen items-center gap-8 justify-between  md:py-3 px-3">

            <div className="overflow-y-auto py-5 md:py-0 pt-10 pl-0 md:pl-5 w-full md:w-[45%] h-full no-scrollbar  flex items-start  justify-center ">
                <div className="w-full flex flex-col items-center pt-5 md:items-start space-y-8 md:space-y-18 ">
                    <div className="">
                        <Image src={"/assets/logo.png"} alt="logo" width={100} height={100} className="w-[146px] h-[120px] " />
                    </div>
                    <div className="w-full md:w-[90%] ">
                        <PreScreenForm />
                    </div>

                </div>

            </div>

            <div
                className="h-full  hidden md:flex w-1/2 rounded-[32px]"
                style={{
                    backgroundImage: "url('/assets/auth_gr_image.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >


            </div>
                <div className="absolute hidden md:flex -right-32 bottom-0 w-40 h-40 bg-primary rounded-full z-2 blur-3xl opacity-40"></div>
        <div className="absolute -right-32 hidden md:flex top-0 w-40 h-40 bg-green rounded-full z-2 blur-3xl opacity-40"></div>
        </div>
    )
}

export default PreScreenPage