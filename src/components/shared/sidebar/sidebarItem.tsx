import React from 'react'

const SidebarItem = ({ icon }: { icon: React.ReactNode }) => {
    return (
        <>
            <div className='mt-6 border-r-4 w-full flex justify-center border-transparent border-r-sky-400 py-3 cursor-pointer'>
                {icon}
            </div>
        </>
    )
}

export default SidebarItem