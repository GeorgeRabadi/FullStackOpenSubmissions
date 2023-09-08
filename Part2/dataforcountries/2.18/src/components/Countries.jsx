const Countries = ({country, length}) =>
{
    

   
    if(length == 1){

        let arr = []

        for (var key in country.languages) {
            if (country.languages.hasOwnProperty(key)) {
            arr.push(country.languages[key])
            }
        } 

        return(

            <>
            <h1>{country.name.official}</h1>
            <div>capital {country.capital}</div>
            <div>area {country.area}</div>
            <h2>languages</h2>
            <ul>
            {arr.map( (language, i) => <li key = {i}>{language}</li>)}
            </ul>
    
            </>
            
            )

    }
   
    if(length < 10)
        return(
            <div>{country.name.official}</div>
        )


    
   
}

export default Countries