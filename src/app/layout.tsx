import type { Metadata } from 'next'
import { Toaster } from "@/components/ui/toaster"
import { Roboto } from 'next/font/google'
import './globals.css'
import { ChatProvider } from './context/chatProvider'

const roboto = Roboto({ subsets: ['latin'], weight: ["100", "300", "400", "500"] })

export const metadata: Metadata = {
  title: 'Chatify',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <ChatProvider>
          {children}
          <Toaster />
        </ChatProvider>
      </body>
    </html>
  )
}

