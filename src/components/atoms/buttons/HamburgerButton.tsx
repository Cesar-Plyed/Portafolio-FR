import { useState, useEffect } from "react";

interface ButtonProps {
    className?: string;
}

export const HamburgerButton: React.FC<ButtonProps> = ({
    className = "",
}) => {
    const [isActive, setIsActive] = useState(false);
    
    // Listen for sidebar toggle events from other sources
    useEffect(() => {
        const handleToggle = (event: CustomEvent) => {
            setIsActive(event.detail.isOpen);
        };

        window.addEventListener('sidebar-toggle' as any, handleToggle);

        return () => {
            window.removeEventListener('sidebar-toggle' as any, handleToggle);
        };
    }, []);

    const toggleSidebar = () => {
        const newState = !isActive;
        setIsActive(newState);
        // Dispatch custom event for sidebar
        window.dispatchEvent(new CustomEvent('sidebar-toggle', { 
            detail: { isOpen: newState } 
        }));
    };

    return (
    <div
      className={`flex w-full h-full items-center justify-end relative `}
    >
      <button
        onClick={toggleSidebar}
        aria-label={isActive ? "Close menu" : "Open menu"}
        aria-expanded={isActive}
        className={`group grid place-items-center absolute w-8.75 h-7 cursor-pointer ${className}`}
      >
        <span
          className={`block absolute w-7.5 h-1 bg-neutral-900 dark:bg-neutral-50 rounded-2xl duration-200 transition-all ease-in-out ${
            isActive ? "rotate-45  " : "top-[10%]"
          }`}
        ></span>
        <span
          className={`block absolute w-7.5 h-1 bg-neutral-900 dark:bg-neutral-50 rounded-2xl duration-200 transition-all ease-in-out ${
            isActive ? "opacity-0 w-0" : ""
          }`}
        ></span>
        <span
          className={`block absolute w-7.5 h-1 bg-neutral-900 dark:bg-neutral-50 rounded-2xl duration-200 transition-all ease-in-out ${
            isActive
              ? "-rotate-45 "
              : "bottom-[10%]"
          }`}
        ></span>
      </button>
    </div>
  );
};
