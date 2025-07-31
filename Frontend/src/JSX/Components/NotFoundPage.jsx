import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-[#192039] flex items-center justify-center px-4 py-20">
            <div className="bg-[#1f2937] w-full max-w-md rounded-xl p-8 border border-indigo-500/20 shadow-md hover:shadow-indigo-500/10 hover:border-indigo-500/30 transition-all duration-300 text-white text-center group">

                {/* Logo Block */}
                <div className="flex items-center justify-center mb-8">
                    <div className="bg-indigo-600/10 group-hover:bg-indigo-600/20 rounded-xl px-6 py-5 transition-colors duration-300 flex flex-col items-center gap-3">
                        <img src="/logo.png" alt="CKsEdu Logo" className="h-16 object-contain" />
                        <span className="text-indigo-100 text-base font-medium">CKsEdu</span>
                    </div>
                </div>

                {/* 404 Message */}
                <h1 className="text-5xl font-bold text-indigo-400 mb-4">404</h1>
                <p className="text-lg text-indigo-100 mb-6">Oops! The page you're looking for doesn't exist.</p>

                {/* Back Home Button */}
                <Link
                    to="/"
                    className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-200"
                >
                    Go Back Home
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage
