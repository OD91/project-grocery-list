import Head from "next/head";
import Header from "../Components/Header";
import SearchItem from "../Components/SearchItem";
import AddItem from "../Components/AddItem";
import Content from "../Components/Content";
import Footer from "../Components/Footer";
import apiRequest from "../Components/apiRequest";
import { useState, useEffect } from "react";


export default function Home() {
  const API_URL = 'http://localhost:3500/items';
  
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error('Did not receive expected data');
        const listItems = await response.json()
        setItems(listItems);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message)
      } finally {
        setIsLoading(false);
      }
    }
    setTimeout(() => {
      (async () => await fetchItems())();
    }, 2000)
  }, [])

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const addItem = async (item) => {
    const id = items.length ? items[items.length -1].id +1 : 1;
    const myNewItem = { id, checked: false, item };
    const listItems = [...items, myNewItem];
    setAndSaveItems(listItems);
    // Create, API
    const postOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(myNewItem)
    }
    const result = await apiRequest(API_URL, postOptions);
    if (result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    const listItems = items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setAndSaveItems(listItems);
    // Update, API
    const myItem = listItems.filter((item) => item.id === id);
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked})
    };
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, updateOptions);
    if (result) setFetchError(result);
  };

  const handleDelete = async (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);

    // Delete, API
    const deleteOptions = { method: 'DELETE'};
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl, deleteOptions);
    if (result) setFetchError(result);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    addItem(newItem);
    setNewItem('');
  }

  return (
    <div className="flex flex-col justify-content-start container mx-auto h-screen max-w-screen-md">
      <div className="bg-blue-500 text-white w-full text-center text-4xl font-semibold">
        <Header title="Grocery List"/>
      </div>
      <div>
        <AddItem 
          newItem={newItem}
          setNewItem={setNewItem}
          handleSubmit={handleSubmit}/>
      </div>
      <div>
        <SearchItem 
          search={search}
          setSearch={setSearch}/>
      </div>
      <main>
      {isLoading && <p>Loading Items...</p>}
      {fetchError && !isLoading && <p className={`text-red-600 text-center`}>{`Error: ${fetchError}`}</p>}
        {!fetchError && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLocaleLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}/>}  
      </main>
      <div className="bg-blue-500 text-white w-full text-center">
        <Footer length={items.length}/>
      </div>      
    </div>
  );
}
