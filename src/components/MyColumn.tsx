import './MyColumn.css'
import Button from "./Button.tsx";
import {Item} from "../Item.ts";

interface MyColumnProps {
    title: string,
    items: Map<string, Item>,
    onClick: () => void
}

function MyColumn({items, title, onClick}: MyColumnProps) {
    return (
        <div className="column_container">
            <div className="header">
                <div className="header-text">{title}</div>
            </div>
            <div className="list-container">
                {
                    Array.from(items.values()).map((item: Item) => (
                        <Button item={item} onClick={onClick}/>
                    ))
                }
            </div>
        </div>
    )
}

export default MyColumn
