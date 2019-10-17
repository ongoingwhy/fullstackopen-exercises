import React, { useState , useEffect } from 'react'
import axios from 'axios'

const Filter =({onchange, filter}) => <input value={filter} onChange={onchange}/>

const InputForm = ({onsubmit, onchangeName, onchangeNum, newName, newNum}) => {
    return (
        <form onSubmit={onsubmit}>
            <div>
              name: <input value={newName} onChange={onchangeName}/>
            </div>
            <div>
              number: <input value={newNum} onChange={onchangeNum}/>
            </div>
            <div>
                <button type="submit">add</button> 
            </div>
        </form>
    );
}

const Contact = ({name, number}) => <li>{name} {number}</li>

const Contacts = ({contacts, filter}) => {
    const rows = () => {
      let display = [...contacts]
      if (filter !== '') {
        display = contacts.filter( (contact) => contact.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0)
      }

      return (
        display.map( (contact) => <Contact key={contact.name} name={contact.name} number={contact.number} />)
      );
    }

    return (
      <ul>
          {rows()}
      </ul>
    );
}

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNum, setNewNum ] = useState('');
  const [ searchFilter, setFilter ] = useState('');

  const addContact = (ev) => {
    ev.preventDefault();

    if (persons.findIndex(x => x.name === newName) >= 0)
      alert(`${newName} is already added to the phonebook`);
    else {
      let newPersons = persons.concat({name: newName, number: newNum});
      setPersons(newPersons);
      setNewName('');
      setNewNum('');
    }
  }

  const updateNewName = (ev) => setNewName(ev.target.value);

  const updateNewNum = (ev) => setNewNum(ev.target.value);

  const updateFilter = (ev) => setFilter(ev.target.value);

  useEffect (() => {
    axios.get('http://localhost:3001/persons')
    .then(response => {
      setPersons(response.data);
    })
  });

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onchange={updateFilter} filter={searchFilter}/>

      <h2>add a new</h2>
      <InputForm onsubmit={addContact} onchangeName={updateNewName} newName={newName}
      onchangeNum={updateNewNum} newNum={newNum} />

      <h2>Numbers</h2>
      <Contacts contacts={persons} filter={searchFilter} />
    </div>
  )
}

export default App