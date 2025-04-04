import './App.css'
import {useRef, useState} from "react";
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

/*
* Implemented idea:
* When an item is moved to fruits or vegetables list, a timeout is started for that particular item.
* Individual timeouts are tracked using Map with keys as names.
* Once the timeout ends, item is moved back to main list and timeout is cleared and removed
* If the item from right list is clicked before the timeout runs out, the item will be moved back to main list.
* And timeout will be cleared and removed
* This way, we can handle big datasets and huge amount of timeouts running in background thread when not required
* I'm using Maps to avoid array traversal while deleting items from list
* */


function App() {

    const initialMap = new Map<string, Item>(
        initialList.map((item: Item) => [item.name, item])
    );

    const [mainMap, setMainList] = useState<Map<string, Item>>(initialMap);
    const [fruitMap, setFruitList] = useState<Map<string, Item>>(new Map<string, Item>());
    const [vegetableMap, setVegetableList] = useState<Map<string, Item>>(new Map<string, Item>());

    const timeoutsRef = useRef(new Map<string, number>());

    const addToList = (
        setList: React.Dispatch<React.SetStateAction<Map<string, Item>>>,
        item: Item
    ) => {
        setList((prev) => {
            const newMap = new Map(prev);
            newMap.set(item.name, item);
            return newMap
        })
    }

    const removeFromList = (
        setList: React.Dispatch<React.SetStateAction<Map<string, Item>>>,
        item: Item
    ) => {
        setList((prev) => {
            const newMap = new Map(prev);
            newMap.delete(item.name);
            return newMap;
        })
    }

    const onClickMainListItem = (item: Item) => {
        removeFromList(setMainList, item)
        if (item.type === 'Fruit'){
            addToList(setFruitList, item)
        } else {
            addToList(setVegetableList, item)
        }
        const timeoutId = setTimeout(() => {
            onClickOtherListItem(item)
        }, 5000);
        timeoutsRef.current.set(item.name, timeoutId);
    }

    const onClickOtherListItem = (item: Item) => {
        if (item.type === 'Fruit'){
            removeFromList(setFruitList, item)
        } else {
            removeFromList(setVegetableList, item)
        }
        addToList(setMainList, item)
        clearTimeout(timeoutsRef.current.get(item.name));
        if (timeoutsRef.current.has(item.name)){
            timeoutsRef.current.delete(item.name);
        }
    }

  return (
    <div className='container'>
        <MyColumn items={mainMap} title={"List"} onClick={onClickMainListItem}/>
        <MyColumn items={fruitMap} title={"Fruits"} onClick={onClickOtherListItem}/>
        <MyColumn items={vegetableMap} title={"Vegetables"} onClick={onClickOtherListItem}/>
    </div>
  )
}

export default App
