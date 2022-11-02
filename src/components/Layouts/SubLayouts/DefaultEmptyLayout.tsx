import {ReactNode} from "react";

interface LayoutProps {
    children: ReactNode;
}

export default function DefaultEmptyLayout({children}: LayoutProps) {
    return (
        <>
            {children}
        </>
    )
}
