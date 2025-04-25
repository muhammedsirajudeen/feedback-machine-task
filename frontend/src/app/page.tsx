import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-white border-b dark:bg-gray-950 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Feedback Portal</h1>
          <div className="flex gap-4">
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/adminlogin">
              <Button>Admin Login</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Welcome to our Feedback Portal</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            We value your input! Please login to submit your feedback and help us improve our services.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/login">
              <Button size="lg">Login to Submit Feedback</Button>
            </Link>
          </div>
        </div>
      </main>
      <footer className="bg-gray-100 dark:bg-gray-900 py-6">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Feedback Portal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
