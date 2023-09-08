const Numbers = ({persons, search}) => {

    return (

        <>
        <h2>Numbers</h2>
        <div>
        {persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase())).map(person => <div key = {person.id}> {person.name} {person.number} </div>)}
        </div>
       </>
    )
}
export default Numbers