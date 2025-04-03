import './App.css'
import {useState} from "react";
import {Item} from "./Item.ts";
import MyColumn from "./components/MyColumn.tsx";
import * as React from "react";

const initialList: Item[] = [
    {
        type: 'Fruit',
        name: 'Apple',
    },
    {
        type: 'Vegetable',
        name: 'Broccoli',
    },
    {
        type: 'Vegetable',
        name: 'Mushroom',
    },
    {
        type: 'Fruit',
        name: 'Banana',
    },
    {
        type: 'Vegetable',
        name: 'Tomato',
    },
    {
        type: 'Fruit',
        name: 'Orange',
    },
    {
        type: 'Fruit',
        name: 'Mango',
    },
    {
        type: 'Fruit',
        name: 'Pineapple',
    },
    {
        type: 'Vegetable',
        name: 'Cucumber',
    },
    {
        type: 'Fruit',
        name: 'Watermelon',
    },
    {
        type: 'Vegetable',
        name: 'Carrot',
    },
]

function App() {

    const [mainList, setMainList] = useState<Item[]>(initialList);
    const [fruitList, setFruitList] = useState<Item[]>([]);
    const [vegetableList, setVegetableList] = useState<Item[]>([])

    const addToList = (
        setList: React.Dispatch<React.SetStateAction<Item[]>>,
        item: Item
    ) => {
        //prevent duplicates
        setList((prev) => {
            if (prev.some(existingItem => existingItem.name === item.name)){
                return prev;
            }

            return [...prev, item];
        })
    }

    const removeFromList = (
        setList: React.Dispatch<React.SetStateAction<Item[]>>,
        item: Item
    ) => {
        setList((prev) => prev.filter(value => value.name !== item.name))
    }

    const onClickMainListItem = (item: Item) => {
        removeFromList(setMainList, item)
        if (item.type === 'Fruit'){
            addToList(setFruitList, item)
        } else {
            addToList(setVegetableList, item)
        }
        setTimeout(() => {
            onClickOtherListItem(item)
        }, 5000);
    }

    const onClickOtherListItem = (item: Item) => {
        if (item.type === 'Fruit'){
            removeFromList(setFruitList, item)
        } else {
            removeFromList(setVegetableList, item)
        }
        addToList(setMainList, item)
    }

  return (
    <div className='container'>
        <MyColumn items={mainList} title={"List"} onClick={onClickMainListItem}/>
        <MyColumn items={fruitList} title={"Fruits"} onClick={onClickOtherListItem}/>
        <MyColumn items={vegetableList} title={"Vegetables"} onClick={onClickOtherListItem}/>
    </div>
  )
}

export default App
