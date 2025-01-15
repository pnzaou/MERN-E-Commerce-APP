import { useEffect, useState } from "react"

const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerHeight < breakpoint)

    const handleResize = () => {
        const checkpoint = window.innerWidth < breakpoint
        setIsMobile(checkpoint)
    }

    useEffect(()=> {
        handleResize()

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return [ isMobile ]
}

export default useMobile