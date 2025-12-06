import {useState, useEffect} from 'react';
import MainApp from "./MainApp";

function getWindowDimensions() {
    const {innerWidth: width, innerHeight: height} = window;
    return {
        width,
        height
    };
}

export default function MainAppModed({fetcher}) {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Обновленные границы:
    // Десктоп: ≥1169px
    // Планшет: 839-1168px
    // Мобильный: <839px
    const isTablet = windowDimensions.width < 1169 && windowDimensions.width >= 839;
    const isMobile = windowDimensions.width < 839;

    return <MainApp mode={{isMobile, isTablet}} fetcher={fetcher}/>;
}