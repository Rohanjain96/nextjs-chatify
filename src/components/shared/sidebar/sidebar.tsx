import Image from 'next/image'
import React from 'react'

const Sidebar = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <div className='flex flex-col h-full w-16 bg-white border-r-[1px] border-r-gray-300 pb-6'>
                <div className="flex flex-1 flex-col justify-center items-center">{children}</div>
                <Image src='/images/dummy-person.png' width={38} height={38} alt='profile-image' className='rounded-full mx-auto' />
            </div>
        </>
    )
}

export default Sidebar