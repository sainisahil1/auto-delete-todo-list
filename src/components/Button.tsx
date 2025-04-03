import './Button.css'
import {Item} from "../Item.ts";

interface ButtonProps {
    item: Item;
    onClick: (item: Item) => void
}

function Button({item, onClick}: ButtonProps) {
    return(
        <div className="button">
            <div
                className="button-text"
                onClick={() => {
                    onClick(item)
                }}
            >{item.name}</div>
        </div>
    )
}

export default Button
