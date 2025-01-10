import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { ClerkProvider } from "@clerk/nextjs";
const host_Grotesk = Host_Grotesk({
  subsets: ['latin'],
});
export const metadata = {
  title: "Logo Generator",
  description: "Generating many logos for free",
  icons: [
    {
      rel: 'icon',
      type: 'image/png',
      url: '/web_logo.png', 
    },
  ]
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={host_Grotesk.className}>
          <Provider>
            {children}
          </Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}