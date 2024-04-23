import React, { useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users?page=2

function App() {

  const [users, setUsers] = useState([]);
  const [invais, setInvais] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [success,setSuccess] = useState(false);
  const [searchValue, setSearchValue] = useState('');


  React.useEffect(() => {
fetch('https://reqres.in/api/users?page=2')
.then(res => res.json())
.then((json) => {
  setUsers(json.data);
})
  .catch((err) => {
    console.warn(err);
    alert('Ошибка при получении');
  
  
}).finally(() => setLoading(false));

  },[]);
  
  const onChanchSearchValue = (event) => {
    setSearchValue(event.target.value);
  }

  const onClickInvated = (id) => {
    if(invais.includes(id)) {
      setInvais(prev => prev.filter(_id => _id !== id));
    } else {setInvais((prev) => [...prev, id])};
    
  }

   const onClickSendInvite = () => {
    setSuccess(true);
   }
  return (
    <div className="App">
      {
        success ? (<Success count={invais.length} />) 
        :
         (<Users 
      onChanchSearchValue={onChanchSearchValue}
      searchValue={searchValue} 
      items={users} 
      isLoading={isLoading}
      onClickInvated = {onClickInvated}
      invais = {invais}
      onClickSendInvite={onClickSendInvite}
      />)
      }
     
      
    </div>
  );
}

export default App;
