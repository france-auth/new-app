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

  const handDelete = () => {
    const lastItem = travelItems.length - 1
    const newTravelItems = [...travelItems.slice(0, lastItem - 1)]
    setTravelItems(() => [...newTravelItems])
  }

  return (
    <div className="bg-white flex flex-col relative justify-center items-center min-h-screen w-full p-5">
      <div className="items-center justify-center rounded-sm p-5 w-full flex flex-col max-w-[400px]">
        <form 
          onSubmit={handleSubmit} 
          className="gap-4 p-4 flex justify-center flex-col items-center w-full bg-blue-500 rounded-lg"
        >
          <h2 className="text-xl font-semibold">Traveling List</h2>
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="select">How many items?</label>
            <select 
              className="text-black border-[1px] px-2 py-1 rounded-lg" 
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
          <div className="w-full flex flex-col gap-2">
            <label htmlFor="items">Item Name</label>
            <input 
              value={itemName}
              onChange={handleItemName}
              title="items" 
              type="text" 
              required
              placeholder="e.g Toothpaste" 
              className="px-2 py-1 outline-0 border-[1px] bg-black rounded-lg"
            />
          </div>
          <div className="flex gap-3">
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
          <button className="mx-auto w-max rounded-lg px-5 py-2 bg-black" type="submit">Add</button>
          <button className="mx-auto w-max rounded-lg px-5 py-2 bg-red-600" type="button" onClick={handDelete} >Delete</button>
        </form>
      </div>
      <div className="max-w-[400px] rounded-lg mt-6 bg-black p-5 flex flex-col justify-center items-center gap-3">
        <h3 className="text-xl font-semibold">🧳 Your Items</h3>
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

