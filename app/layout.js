import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from "../context/AppContext"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <AppProvider>
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
    </AppProvider>
  )
}
