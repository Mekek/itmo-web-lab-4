import {Outlet} from "react-router-dom";

function Header() {
    return (<>
        <div className="container" id="header">
            <p>Лабораторная работа #4</p>
            <p>Выполнил Кадилов Михаил P3330</p>
            <p>Вариант 47643</p>
        </div>
        <Outlet/>
    </>);
}

export default Header;
