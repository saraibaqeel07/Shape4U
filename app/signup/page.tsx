import SignupForm from "@/components/forms/SignUpForm";
import Image from "next/image";

const SignupPage = () => {
  return (
    <div className="flex h-screen  overflow-hidden p-3 gap-8">
      
      {/* LEFT - Fixed Image */}
      <div
        className="hidden md:flex relative w-1/2 h-full rounded-[32px] bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/auth_gr_image.png')",
        }}
      >
        <div className="absolute pl-10 text-white w-full bottom-10">
                <p className="medium-text">Welcome Back to</p>
                <h2 className="heading-2">ShapeUp4Life</h2>
                <p className="medium-text mt-8">Sign in to continue your 12-week programme</p>
            </div>
      </div>

      {/* RIGHT - Scrollable */}
      <div className="w-full md:w-[45%] no-scrollbar h-full overflow-y-auto md:pl-5 pt-5 md:pt-10 flex justify-center">
        <div className="w-full flex flex-col items-center md:items-start space-y-8 md:space-y-14 no-scrollbar">
          
          <Image
            src="/assets/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="w-[146px] h-[120px]"
          />

          <div className="w-full md:w-[90%]">
            <SignupForm />
          </div>

        </div>
      </div>

    </div>
  );
};

export default SignupPage;