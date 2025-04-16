import { useState, useEffect } from "react";
import phonebookService from "./services/personService";

const Filter = ({ value, onChange }) => (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
);

const PersonForm = ({
  name,
  number,
  onSubmit,
  onChangeName,
  onChangeNumber,
}) => {
  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          name: <input value={name} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={number} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </>
  );
};

const Persons = ({ personsArr, onClick }) => {
  return personsArr.map((person) => (
    <p key={person.name}>
      {person.name} {person.number}{" "}
      <button onClick={() => onClick(person.id)}>Delete</button>
    </p>
  ));
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    phonebookService.getAll().then((initialData) => setPersons(initialData));
  }, []);

  const showPerson = !filter
    ? persons
    : persons.filter((person) =>
        person.name.toLowerCase().includes(filter.toLowerCase())
      );

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const copy = persons.map((person) => person.name);
    if (copy.includes(newName))
      return alert(`${newName} is already added to phonebook`);
    const nameObj = {
      name: newName,
      number: newNumber,
    };
    phonebookService.create(nameObj).then((newObj) => {
      setPersons(persons.concat(newObj));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const deleleObj = persons.find((person) => person.id === id);
    if (confirm(`Delete ${deleleObj.name} ?`)) {
      phonebookService
        .deletePerson(deleleObj.id)
        .then(() => phonebookService.getAll())
        .then((newArr) => setPersons(newArr));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={filter} onChange={handleFilter} />

      <h2>Add a new</h2>

      <PersonForm
        onSubmit={addPerson}
        name={newName}
        number={newNumber}
        onChangeName={handleNewName}
        onChangeNumber={handleNewNumber}
      />

      <h2>Numbers</h2>

      <Persons personsArr={showPerson} onClick={deletePerson} />
    </div>
  );
};

export default App;
