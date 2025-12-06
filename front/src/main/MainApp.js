import UserInput from "./UserInput";
import ResultTable from "./ResultTable";
import Graph from "./Graph";

function MainApp({fetcher, mode}) {
    let blocksPerRow = [3, 2]; // Десктоп
    if (mode.isTablet) blocksPerRow = [2, 2, 1]; // Планшет: 2 + 2 + 1 = 5 блоков
    if (mode.isMobile) blocksPerRow = [1, 1, 1, 1, 1]; // Мобильный

    // Создаем все блоки в исходном порядке
    const allBlocks = [
        <div key="input" className="container">
            <UserInput fetcher={fetcher}/>
        </div>,

        <div key="graph" className="container rounded" id="graph-container">
            <Graph fetcher={fetcher}/>
        </div>,

        <div key="table" className="container">
            <ResultTable results={fetcher.results}/>
        </div>,

        <div key="user" className="container">
            <p>Logged as:</p>
            <p>{fetcher.login}</p>
        </div>,

        <button key="logout" className="box rounded redirect" onClick={fetcher.handleLogout}>Выйти</button>
    ];

    // Для мобильного режима создаем новый порядок блоков
    let blocksToRender;
    if (mode.isMobile) {
        // В мобильном режиме перемещаем блок с пользователем в конец
        blocksToRender = [
            allBlocks[0], // input
            allBlocks[1], // graph
            allBlocks[2], // table
            allBlocks[4], // logout (кнопка) - теперь предпоследний
            allBlocks[3]  // user - перемещен в самый конец
        ];
    } else {
        // Для десктопного и планшетного режима - исходный порядок
        blocksToRender = allBlocks;
    }

    // Распределяем блоки по строкам согласно blocksPerRow
    let sorted = [];
    let blockIndex = 0;
    for (let rowBlocksCount of blocksPerRow) {
        let rowBlocks = [];
        for (let j = 0; j < rowBlocksCount; j++) {
            if (blockIndex < blocksToRender.length) {
                rowBlocks.push(blocksToRender[blockIndex++]);
            }
        }
        if (rowBlocks.length > 0) {
            sorted.push(rowBlocks);
        }
    }

    return (
        <div id="main-table">
            {sorted.map((row, rowIndex) => (
                <div key={rowIndex} className="row-like">
                    {row.map((block, blockIndexInRow) => (
                        <div key={block.key || blockIndexInRow} className="cell-like">
                            {block}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default MainApp;