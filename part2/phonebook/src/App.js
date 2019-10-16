import React, { useState } from 'react'


const ShowForm = ({onsubmit, onchange, newname}) => {
    return (
        <form onSubmit={onsubmit}>
            <div>
            name: <input value={newname} onChange={onchange}/>
            </div>
            <div>
                <button type="submit">add</button> 
            </div>
        </form>
    );
}

const ShowContacts = ({contacts}) => {
    const rows = () => contacts.map( (x) => <li key={x.name}>{x.name}</li> );

    return (
        <ul>
            {rows()}
        </ul>
    );
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]);

  const [ newName, setNewName ] = useState('');

  const addContact = (ev) => {
    ev.preventDefault();

    if (persons.findIndex(x => x.name === newName) >= 0)
      alert(`${newName} is already added to the phonebook`);
    else {
      let newPersons = persons.concat({name: newName});
      setPersons(newPersons);
      setNewName('');
    }
  }

  const updateNewName = (ev) => {
      setNewName(ev.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ShowForm onsubmit={addContact} onchange={updateNewName} newname={newName}/>
      <h2>Numbers</h2>
      <ShowContacts contacts={persons} />
    </div>
  )
}

export default App