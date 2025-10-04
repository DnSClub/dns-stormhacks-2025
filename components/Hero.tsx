import { FaLocationArrow } from "react-icons/fa6";
import MagicButton from "./MagicButton";

const Hero = () => {
  return (
    <div className="pb-10 pt-36 bg-background text-foreground">
      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          
          <p className="uppercase tracking-widest text-xs text-center text-blue-100 max-w-80">
            A DNS X StormHacks Collaboration
          </p>

          <h1 className="text-center text-[40px] md:text-5xl lg:text-6xl font-bold leading-tight mt-4 mb-6 md:mb-8 text-purple-200">
            Hack Ready Web Dev Website
          </h1>

          <h2 className="text-center md:tracking-wider text-sm md:text-lg lg:text-2xl text-white">
            AI Procrastination Motivation Chatbot
          </h2>

          <a href="#card">
            <MagicButton
              title="A Button"
              icon={<FaLocationArrow />}
              position="right"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;