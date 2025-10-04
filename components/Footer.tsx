import { FaDiscord } from "react-icons/fa";

import MagicButton from "./MagicButton";

const Footer = () => {
    return (
        <footer className="w-full pb-10" id="contact">
            {/* background grid */}
            <div className="w-full min-h-96 -mb-72">
                <img
                    src="/footer-grid.svg"
                    alt="grid"
                    className="w-full h-full opacity-50 "
                />
            </div>

            <div className="flex flex-col items-center">
                <h1 className="heading lg:max-w-[45vw] text-2xl font-bold">
                    Go <span className="text-purple-500">Hack!</span>
                </h1>
                <p className="text-white-200 md:mt-10 my-5 text-center">
                    Join our DNS server to stay updated and connected.
                </p>
                <a href="https://discord.gg/EzNNJMkcyJ" target="_blank" rel="noopener noreferrer">
                    <MagicButton
                        title="Discord"
                        icon={<FaDiscord />}
                        position="right"
                    />
                </a>
            </div>
            <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
                <p className="md:text-base text-sm md:font-normal font-light">
                    DNS X StormHacks
                </p>
            </div>
        </footer>
    );
};

export default Footer;