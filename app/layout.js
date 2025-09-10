import "./globals.css";

export const metadata = {
  title: "andandandweb-2",
  description: "Next.js app with styled-components",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
