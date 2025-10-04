"use client";

import { cn } from "@/lib/utils";

import React, {
    createContext,
    useState,
    useContext,
    useRef,
    useEffect,
} from "react";

const MouseEnterContext = createContext<
    [boolean, React.Dispatch<React.SetStateAction<boolean>>] | undefined
>(undefined);

export const CardContainer = ({
    children,
    className,
    containerClassName,
}: {
    children?: React.ReactNode;
    className?: string;
    containerClassName?: string;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMouseEntered, setIsMouseEntered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const { left, top, width, height } =
            containerRef.current.getBoundingClientRect();
        const x = (e.clientX - left - width / 2) / 25;
        const y = (e.clientY - top - height / 2) / 25;
        containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsMouseEntered(true);
        if (!containerRef.current) return;
    };

    const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        setIsMouseEntered(false);
        containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
    };
    return (
        <MouseEnterContext.Provider value={[isMouseEntered, setIsMouseEntered]}>
            <div
                className={cn(
                    "py-20 flex items-center justify-center",
                    containerClassName
                )}
                style={{
                    perspective: "1000px",
                }}
            >
                <div
                    ref={containerRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                        "flex items-center justify-center relative transition-all duration-200 ease-linear",
                        className
                    )}
                    style={{
                        transformStyle: "preserve-3d",
                    }}
                >
                    {children}
                </div>
            </div>
        </MouseEnterContext.Provider>
    );
};

export const CardBody = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div
            className={cn(
                "h-96 w-96 [transform-style:preserve-3d]  [&>*]:[transform-style:preserve-3d]",
                className
            )}
        >
            {children}
        </div>
    );
};

// Define allowed element types
type AllowedElements = "div" | "p" | "button" | "span" | "h1" | "h2" | "h3" | "a";

interface CardItemProps {
    as?: AllowedElements;
    children: React.ReactNode;
    className?: string;
    translateX?: number | string;
    translateY?: number | string;
    translateZ?: number | string;
    rotateX?: number | string;
    rotateY?: number | string;
    rotateZ?: number | string;
}

export const CardItem = ({
    as: Tag = "div",
    children,
    className,
    translateX = 0,
    translateY = 0,
    translateZ = 0,
    rotateX = 0,
    rotateY = 0,
    rotateZ = 0,
    ...rest
}: CardItemProps) => {
    const [isMouseEntered] = useMouseEnter();

    // Create separate refs for each element type
    const divRef = useRef<HTMLDivElement>(null);
    const pRef = useRef<HTMLParagraphElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const h1Ref = useRef<HTMLHeadingElement>(null);
    const h2Ref = useRef<HTMLHeadingElement>(null);
    const h3Ref = useRef<HTMLHeadingElement>(null);
    const aRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        handleAnimations();
    }, [isMouseEntered]);

    const handleAnimations = () => {
        let currentRef: HTMLElement | null = null;
        
        // Determine which ref to use based on the Tag
        switch (Tag) {
            case "p":
                currentRef = pRef.current;
                break;
            case "button":
                currentRef = buttonRef.current;
                break;
            case "span":
                currentRef = spanRef.current;
                break;
            case "h1":
                currentRef = h1Ref.current;
                break;
            case "h2":
                currentRef = h2Ref.current;
                break;
            case "h3":
                currentRef = h3Ref.current;
                break;
            case "a":
                currentRef = aRef.current;
                break;
            default:
                currentRef = divRef.current;
                break;
        }

        if (!currentRef) return;
        
        if (isMouseEntered) {
            currentRef.style.transform = `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
        } else {
            currentRef.style.transform = `translateX(0px) translateY(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)`;
        }
    };

    const commonProps = {
        className: cn("w-fit transition duration-200 ease-linear", className),
        ...rest,
    };

    // Use a switch to handle different element types with proper refs
    switch (Tag) {
        case "p":
            return <p ref={pRef} {...commonProps}>{children}</p>;
        case "button":
            return <button ref={buttonRef} {...commonProps}>{children}</button>;
        case "span":
            return <span ref={spanRef} {...commonProps}>{children}</span>;
        case "h1":
            return <h1 ref={h1Ref} {...commonProps}>{children}</h1>;
        case "h2":
            return <h2 ref={h2Ref} {...commonProps}>{children}</h2>;
        case "h3":
            return <h3 ref={h3Ref} {...commonProps}>{children}</h3>;
        case "a":
            return <a ref={aRef} {...commonProps}>{children}</a>;
        default:
            return <div ref={divRef} {...commonProps}>{children}</div>;
    }
};

// Create a hook to use the context
export const useMouseEnter = () => {
    const context = useContext(MouseEnterContext);
    if (context === undefined) {
        throw new Error("useMouseEnter must be used within a MouseEnterProvider");
    }
    return context;
};