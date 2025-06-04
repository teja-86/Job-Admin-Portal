import "./globals.css";
import Navbar from "@/components/Navbar";
import { ToastContainer } from "react-toastify";
import GlobalProvider from "@/context/GlobaProvider";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "JobCrud",
  description: "A Job Management Dashboard",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`satoshi antialiased vsc-initialized`}>
        <GlobalProvider>
          <ToastContainer position="bottom-right" />
          <Navbar />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
