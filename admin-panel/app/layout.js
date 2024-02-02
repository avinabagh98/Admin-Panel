import { Inter } from "next/font/google";
import "./globals.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Waste Management System",
  description: "Developped by Avinaba Ghosh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
