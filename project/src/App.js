import {useEffect,useState} from "react";
// Define your base URL here
import "./App.css";
const baseURL = "https://backend-2-kvnj.onrender.com";

function App() {
  const [data, setData] = useState({ exampleField: '' });
  const [items, setItems] = useState([]);
  const [addCount, setAddCount] = useState(0);
  const [updateCount, setUpdateCount] = useState(0);

  useEffect(() => {
    fetchCounts();
  }, []);

  const fetchCounts = async () => {
    try {
      const response = await fetch(`${baseURL}/count`);
      if (response.ok) {
        const { addCount, updateCount } = await response.json();
        setAddCount(addCount);
        setUpdateCount(updateCount);
      }
    } catch (error) {
      console.error("Error fetching counts:", error);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(`${baseURL}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setItems([...items, data]);
        setData({ exampleField: '' }); // Reset input field
        fetchCounts();
      } else {
        console.error("Failed to add data:", response.statusText);
      }
    } catch (error) {
      console.error("Error adding data:", error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`${baseURL}/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // Assuming data contains the updated item
      });
      if (response.ok) {
        // Update the item in the local state
        const updatedItems = items.map(item => {
          if (item.id === data.id) {
            return data; // Replace the old item with the updated item
          }
          return item;
        });
        setItems(updatedItems);
        fetchCounts();
      } else {
        console.error("Failed to update data:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };
  

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
    <div className="input-container">
      <input type="text" name="exampleField" value={data.exampleField || ''} onChange={handleChange} />
    </div>
    <div className="button-container">
      <button onClick={handleAdd}>Add</button>
      <button onClick={handleUpdate}>Update</button>
    </div>

    <div className="count-container">
      <p>Add Count: {addCount}</p>
      <p>Update Count: {updateCount}</p>
    </div>

    <div className="item-container">
      {items.map((item, index) => (
        <div key={index} className="item">
          <p>{item.exampleField}</p>
        </div>
      ))}
    </div>
  </div>

  );
}

export default App;
