import { HamburgerButton } from "@components/atoms/buttons/HamburgerButton";
import { Sidebar } from "@components/organisms/Sidebar";

export const HamburgerButtonContainer = () => {
    return (
        <>
            <Sidebar />
            <div className="fixed top-4 right-0 z-50">
                <HamburgerButton />
            </div>
        </>
    );
};
