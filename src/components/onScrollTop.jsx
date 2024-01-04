import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop(props) {
    const { pathname } = useLocation();
    // const element = document.querySelector('.widget-visible');

    useEffect(() => {
        window.scrollTo(0, 0);
        // if (element) {
        //     console.log(element)
        //     if (pathname.startsWith('/admin')) {
        //         element.style.display = 'none !important';
        //     } else {
        //         element.style.display = 'block !important';
        //     }
        // }
    }, [pathname]);


    return <>{props.children}</>
}