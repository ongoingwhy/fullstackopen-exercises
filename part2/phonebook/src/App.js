import React, { useState , useEffect } from 'react'
import contacts from './services/contacts'

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

const Contact = ({name, number, id, onClick}) => 
  <li>{name} {number} <button onClick={() => onClick(name, id)}>delete</button></li>

const Contacts = ({contacts, filter, onClick}) => {
    const rows = () => {
      let display = [...contacts]
      if (filter !== '') {
        display = contacts.filter( (contact) => contact.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0)
      }

      return (
        display.map( (contact) => 
          <Contact key={contact.name} name={contact.name} number={contact.number} id={contact.id} onClick={onClick}/>)
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

  const removeContact = (name, id) => {
    let result = window.confirm(`Delete ${name} ?`);
    if (result)
      contacts
      .removeContact(id)
      .then(() => setPersons(persons.filter(person => person.id !== id)));
  }

  const addContact = (ev) => {
    ev.preventDefault();

    if (persons.findIndex(x => x.name === newName) >= 0) {
      //alert(`${newName} is already added to the phonebook`);
      let result = window.confirm(`${newName} is already added to the phonebook, replace the old
      number with a new one?`);
      
      if (result) {
        let oldPerson = persons.find(person => person.name === newName)
        oldPerson.number = newNum;
        contacts
        .editNumber(oldPerson)
        .then(newPerson => {
          setPersons(persons.map(person => person.name !== newName ? person : newPerson));
          setNewName('');
          setNewNum('');
        });
      }
    }
    else {
      contacts
      .addContact({name: newName, number: newNum})
      .then(newContact => {
        setPersons(persons.concat(newContact));
        setNewName('');
        setNewNum('');
      });
    }
  }

  const updateNewName = (ev) => setNewName(ev.target.value);

  const updateNewNum = (ev) => setNewNum(ev.target.value);

  const updateFilter = (ev) => setFilter(ev.target.value);

  useEffect (() => {
    contacts.getAll()
    .then(newPersons => setPersons(newPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onchange={updateFilter} filter={searchFilter}/>

      <h2>add a new</h2>
      <InputForm onsubmit={addContact} onchangeName={updateNewName} newName={newName}
      onchangeNum={updateNewNum} newNum={newNum} />

      <h2>Numbers</h2>
      <Contacts contacts={persons} filter={searchFilter} onClick={removeContact}/>
    </div>
  )
}

export default App