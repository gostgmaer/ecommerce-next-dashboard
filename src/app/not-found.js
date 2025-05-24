import Link from 'next/link'
import { FiAlertTriangle } from 'react-icons/fi'

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <FiAlertTriangle className="text-yellow-500" size={60} />
        </div>
        <h1 className="text-5xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">Oops! The page you&#39;re looking for doesn&#39;t exist.</p>
        <Link href="/">
          <span className="inline-block px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition">
            Go Home
          </span>
        </Link>
      </div>
    </div>
  )
}
