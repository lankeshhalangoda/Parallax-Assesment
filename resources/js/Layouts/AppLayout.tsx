import { Head } from "@inertiajs/react";
import React, { ReactNode } from "react";
import Header from "@/Components/Main/Header";
import Footer from "@/Components/Main/Footer";



const AppLayout: React.FC<{ children: ReactNode; title?: string }> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title ? title : "eHospital"}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <Header />

            <main>
                {children}
            </main>
            <Footer />
        </>
    );
};

export default AppLayout;
