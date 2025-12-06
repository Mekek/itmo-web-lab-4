import {useState} from "react";

function UserInput({fetcher}) {
    const [yValue, setYValue] = useState('');

    const handleYChange = (e) => {
        const rawValue = e.target.value;

        // Разрешаем только цифры, точку и минус
        let filtered = rawValue.replace(/[^0-9.-]/g, '');

        // Удаляем лишние минусы (оставляем только первый, если он в начале)
        const minusCount = (filtered.match(/-/g) || []).length;
        if (minusCount > 1) {
            // Оставляем только первый минус
            filtered = filtered.replace(/-/g, '');
            if (rawValue.includes('-')) {
                filtered = '-' + filtered;
            }
        } else if (minusCount === 1 && !filtered.startsWith('-')) {
            // Если минус не в начале, удаляем его
            filtered = filtered.replace(/-/g, '');
        }

        // Удаляем лишние точки (оставляем только первую)
        const dotCount = (filtered.match(/\./g) || []).length;
        if (dotCount > 1) {
            const parts = filtered.split('.');
            filtered = parts[0] + '.' + parts.slice(1).join('');
        }

        // Проверяем, что после минуса нет точки
        if (filtered.startsWith('-.')) {
            filtered = '-0.' + filtered.slice(2);
        }

        // Проверяем, что строка не начинается с точки
        if (filtered.startsWith('.')) {
            filtered = '0.' + filtered.slice(1);
        }

        setYValue(filtered);

        // Преобразуем в число для обработки
        const num = filtered === '' || filtered === '-' || filtered === '.' ?
            undefined :
            parseFloat(filtered);
        fetcher.handleY(num);
    };

    return (
        <table id="input-table">
            <tbody>
            <tr>
                <td colSpan="3" className="input-cell-l">Введи значения:</td>
            </tr>
            <tr>
                <td className="input-cell-l">X:</td>
                <td id="x-cell">
                    <ButtonPanel id="x-table" from={-5} to={3} onChange={fetcher.handleX}/>
                </td>
            </tr>
            <tr>
                <td className="input-cell-l">Y:</td>
                <td id="y-cell">
                    <input
                        className="input-select rounded box"
                        id="y-select"
                        name="y-select"
                        placeholder="Enter value"
                        required
                        type="text"
                        maxLength={10}
                        value={yValue}
                        onChange={handleYChange}
                    />
                </td>
            </tr>
            <tr>
                <td className="input-cell-l">R:</td>
                <td id="r-cell">
                    <ButtonPanel id="r-table" from={-5} to={3} onChange={fetcher.handleR}/>
                </td>
            </tr>
            <tr>
                <td colSpan="3">
                    <button id="submit-button" className="rounded" onClick={fetcher.handleSubmit}>Вычислить</button>
                </td>
            </tr>
            <tr>
                <td colSpan="3">
                    <button id="clear-button" className="rounded" onClick={fetcher.handleClear}>Очистить</button>
                </td>
            </tr>
            </tbody>
        </table>
    );
}

function ButtonPanel(props) {
    const [selectedKey, setSelectedKey] = useState(null);
    const onChange = props.onChange;

    const buttons = [];
    for (let i = props.from; i <= props.to; i++) {
        buttons.push(
            <td className="button" key={i}>
                <button
                    className={`small-button rounded ${selectedKey === i ? "selected" : ""}`}
                    type="button"
                    onClick={() => {
                        setSelectedKey(i);
                        onChange(i);
                    }}
                >
                    {i}
                </button>
            </td>
        );
    }

    const rows = [];
    for (let i = 0; i < buttons.length; i += 3) {
        rows.push(
            <tr key={i}>
                {buttons.slice(i, Math.min(i + 3, buttons.length))}
            </tr>
        );
    }

    return (
        <table id={props.id}>
            <tbody>{rows}</tbody>
        </table>
    );
}

export default UserInput;