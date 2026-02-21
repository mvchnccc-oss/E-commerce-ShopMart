import React from 'react'

export default function loading() {
    return (<>
    <div className="container mx-auto">
        <div className="flex items-center justify-center ">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-t-emerald-500 rounded-full animate-spin mb-4"></div>
                <p className="text-gray-700 font-medium text-lg">Loading...</p>
            </div>
        </div>
    </div>
    </>)
}
