const Numbers = ({name, number, deletePerson}) => {


    return (

        <>
        <div>
        {name} {number} <button onClick={deletePerson}>Delete?</button>
        </div>
       </>
    )
}
export default Numbers