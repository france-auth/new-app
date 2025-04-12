"use client"
import { useState } from "react"

interface TravelItemProps {
  name: string;
  numberOfItems: number;
  packed: boolean;
}

export default function Home () {
  const [itemName, setItemName] = useState<string>('');
  const [itemNumber, setItemNumber] = useState<number>(1);
  const [isPacked, setIsPacked] = useState<boolean>(false);
  const [travelItems, setTravelItems] = useState<TravelItemProps[]>([])

  const handleItemName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemName(e.target.value);
  }
  const handleItemNumber = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemNumber(Number(e.target.value));
  }
  const handleIsPacked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPacked(e.target.checked);
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newItem: TravelItemProps = {
      name: itemName,
      numberOfItems: itemNumber,
      packed: isPacked
    }

    setTravelItems((prev) => [...prev, newItem])
    
    // Reset Inputs
    setItemName('');
    setItemNumber(1)
    setIsPacked(false)
  }

  return (
    <div className="bg-white flex flex-col relative justify-center items-center min-h-screen w-full p-5">
      <div className="items-center justify-center rounded-sm p-5 w-full flex flex-col max-w-[400px]">
        <form onSubmit={handleSubmit} className="p-4 flex justify-center flex-col gap-3 items-center w-full bg-blue-500 rounded-sm">
          <h2>Traveling List</h2>
          <div className="w-full flex flex-col">
            <label htmlFor="select">
              How many items?
            </label>
            <select 
              className="text-black" 
              name="select" 
              title="select" 
              onChange={handleItemNumber} 
              value={itemNumber}
            >
              {Array.from({length: 10}, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col">
            <label htmlFor="items">Item Name</label>
            <input 
              value={itemName}
              onChange={handleItemName}
              title="items" 
              type="text" 
              placeholder="e.g Toothpaste" 
            />
          </div>
          <div className="flex">
            <label htmlFor="isPacked">Is the item packed?</label>
            <input 
              checked={isPacked}
              onChange={handleIsPacked}
              type="checkbox" 
              name="isPacked" 
              id="isPacked" 
              title="isPacked" 
            />
          </div>
          <button className="w-max px-3 py-2 bg-blue-300" type="submit">Add</button>
        </form>
      </div>
      <div className="mt-6 bg-black p-5">
        <h3 className="text-lg font-semibold">🧳 Your Items</h3>
        <ul className="list-disc list-inside">
          {travelItems.map(({name, numberOfItems, packed}, id) => (
            <li key={id}>
              {numberOfItems} {name} – {packed ? '✅ Packed' : '❌ Not Packed'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

