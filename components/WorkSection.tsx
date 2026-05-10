import Image from "next/image";

const steps = [
  { icon: "/assets/icon1.png", label: "Sign Up",          bg: "#1F7FB6" },
  { icon: "/assets/icon2.png", label: "Weekly Lessons",   bg: "#4CAF50" },
  { icon: "/assets/icon3.png", label: "Track Weight",     bg: "#E53935" },
  { icon: "/assets/icon4.png", label: "Reach Goal",       bg: "#2D2D2D" },
];

const WorkSection = () => {
  return (
    <div className="w-full overflow-hidden relative py-12 md:py-20 bg-[#F5F2F2]">
      {/* Blur decorations */}
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-60 h-60 bg-primary rounded-full blur-3xl opacity-40 pointer-events-none" />
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-60 h-60 bg-green rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 md:gap-16 px-[5%] max-w-6xl mx-auto">

        {/* Left: photo card */}
        <div className="relative w-full md:w-[45%] shrink-0">
          <div className="rounded-[40px] overflow-hidden shadow-lg">
            <Image
              src="/assets/howPic.png"
              alt="How it works"
              width={600}
              height={500}
              className="w-full h-[320px] md:h-[420px] object-cover"
              priority
            />
          </div>
          {/* Logo watermark */}
          <div className="absolute bottom-4 left-4">
            <Image
              src="/assets/logo.png"
              alt="ShapeUp4Life"
              width={72}
              height={72}
              className="rounded-full"
            />
          </div>
        </div>

        {/* Right: heading + steps */}
        <div className="flex flex-col gap-8 w-full">
          <h3
            className="text-[30px] md:text-[46px] leading-tight"
            style={{ fontFamily: "ArialRounded" }}
          >
            How it works
          </h3>

          <div className="grid grid-cols-2 gap-x-6 gap-y-8">
            {steps.map(({ icon, label, bg }) => (
              <div key={label} className="flex items-center gap-4">
                {/* Icon: dashed outer ring + solid inner circle */}
                <div className="relative flex items-center justify-center w-[72px] h-[72px] shrink-0">
                  {/* Dashed outer ring */}
                  <div
                    className="absolute inset-0 rounded-full border-[2.5px] border-dashed"
                    style={{ borderColor: bg }}
                  />
                  {/* Solid inner circle */}
                  <div
                    className="w-[52px] h-[52px] rounded-full flex items-center justify-center"
                    style={{ backgroundColor: bg }}
                  >
                    <Image
                      src={icon}
                      alt={label}
                      width={28}
                      height={28}
                      className="w-7 h-7 object-contain"
                    />
                  </div>
                </div>

                <span
                  className="text-[15px] md:text-[17px] font-semibold leading-snug"
                  style={{ fontFamily: "ArialRounded" }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default WorkSection;
