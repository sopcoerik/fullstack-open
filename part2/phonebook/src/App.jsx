import { useEffect, useState } from 'react'
import services from "./services/persons"

export const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newPerson, setNewPerson] = useState({
    name: '',
    number: ''
  })
  const [searchInput, setSearchInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  useEffect(() => {
    services.getAll().then(response => setPersons(response))
  }, [])

  const onFormInputChange = (e) => setNewPerson({...newPerson, [e.target.name]: e.target.value})
  const onSearchInputChange = (e) => setSearchInput(e.target.value)
  const saveNewPerson = (person) => setPersons(persons.concat(person))
  const deletePerson = (personId) => services.remove(personId).then(r => setPersons(persons.filter(pers => pers.id !== personId))).catch(e => {setErrorMessage("Data already removed from server"); setTimeout(() => setErrorMessage(''), 5000)})
  const updatePerson = (personId, newPerson) => services.update(personId, newPerson).then(resp => setPersons(persons.map(pers => pers.id !== resp.id ? pers : resp)))

  const sendNewPerson = (person) => {
    services.create(person).then(response => saveNewPerson(response))
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    const presentPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    try{
      if(presentPerson) {
        const userConfirm = confirm(`${newPerson.name} is already added to phonebook, replace the old number with a new one?`)
        userConfirm && updatePerson(presentPerson.id, newPerson)
        userConfirm && setSuccessMessage(`Updated number for ${newPerson.name}`)
        userConfirm && setTimeout(() => setSuccessMessage(''), 5000)
      } else {
        sendNewPerson(newPerson)
        setSuccessMessage(`Added ${newPerson.name}`)
        setTimeout(() => setSuccessMessage(''), 5000)
      }
    } catch(e) {
      setErrorMessage(`Failed to add person to list`)
      setTimeout(() => setErrorMessage(''), 5000)
    }

    setNewPerson({
      name: '',
      number: ''
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification errorMessage={errorMessage} successMessage={successMessage}/>
      <Filter searchInput={searchInput} onChange={onSearchInputChange}/>
      <h2>add a new</h2>
      <PersonForm onFormSubmit={onFormSubmit} onFormInputChange={onFormInputChange} newPerson={newPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} searchInput={searchInput} deletePerson={deletePerson}/>
    </div>
  )
}

const Filter = ({searchInput, onChange}) => <div>filter shown with: <input value={searchInput} onChange={onChange}/></div>

const PersonForm = ({onFormSubmit, onFormInputChange, newPerson}) => (
  <form onSubmit={onFormSubmit}>
    <div>
      name: <input name="name" onChange={onFormInputChange} value={newPerson.name}/>
    </div>
    <div>
      number: <input name="number" onChange={onFormInputChange} value={newPerson.number}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
)

const Persons = ({persons, searchInput, deletePerson}) => {
  const renderedPersons = persons.filter(person => person.name.toLowerCase().includes(searchInput.toLowerCase())).map(person => <Person key={person.id} person={person} onDelete={() => deletePerson(person.id)}/>)

  return renderedPersons
}

const Person = ({person, onDelete}) => (<p>{person.name} {person.number} <button onClick={() => confirm(`Delete ${person.name}?`) && onDelete()}>delete</button></p>)

const Notification = ({errorMessage, successMessage}) => <h1 className={`${errorMessage && "error"} ${successMessage && "success"}`}>{errorMessage || successMessage || ""}</h1>