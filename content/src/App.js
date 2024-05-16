import React, { useEffect } from 'react';
import './index.scss';
import  Collection  from './Collection';


const cats = [
  { "name": "Все" },
  { "name": "Море" },
  { "name": "Горы" },
  { "name": "Архитектура" },
  { "name": "Города" }
]
function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [isLoding, setIsLoding ] = React.useState(true);
  const [serchValue, setSerchValue] = React.useState('');
  const [collections, setCollection] = React.useState([]);

  useEffect(() => {
    setIsLoding(true);
    const category = categoryId ? `category=${categoryId}` : ''
fetch(`https://6635ccd8415f4e1a5e255d64.mockapi.io/collection?page=${page}&limit=3&${category}`)
 .then ((res) => res.json()) 
 .then ((json) => {
  setCollection(json) 
})
 .catch((error) => {
  console.warn(error);
  alert('Error');
 })
 .finally(() => setIsLoding(false));
  
 }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, i) => 
          (<li 
          onClick={() => setCategoryId(i)}
          className={categoryId === i ? 'active' : '' } key={obj.name}>{obj.name}</li>))}
        </ul>
        <input value = {serchValue} onChange = {(e) => setSerchValue(e.target.value)} className="search-input" placeholder="Поиск по названию" />
      </div>
      <div className="content">
        {isLoding ? <h1>Идет загрузка...</h1> :
        (collections
        .filter((obj) => {
        return obj.name.toLowerCase().includes(serchValue.toLowerCase())})
        .map((obj) => (
        <Collection
        key={obj.id}
           name = {obj.name}
          images={obj.photos} 
         
        />
        )))
        
        }
        
      </div>
      <ul className="pagination">
        {
          [...Array(5)].map((_, i) => (
            <li onClick = {() => setPage(i+1)} className={page === i+1  ? 'active': ''}>{i+1}</li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
