import React from "react";


function Layout({ children, fullsize = false }) {
    return (
        <div className="min-h-screen font-inter text-white tracking-wide">
            <main className={fullsize ? 'pb-8 md:pb-10' : `w-full max-w-2xl px-8 mx-auto md:px-8 md:py-16`}>
                {children}

                <footer className="mt-10 text-center">
                    <p className="text-sm opacity-25">
                        <a href="https://schof.co/" className="font-semibold hover:underline">TS</a>
                        {' — '}
                        <a href="https://schof.co/privacy/" className="hover:underline">Privacy policy</a>
                    </p>
                </footer>
            </main>
        </div>
    );
}

export default Layout;
