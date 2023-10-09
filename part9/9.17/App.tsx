import { useState, useEffect } from 'react';
import {NonSensitiveDiaryEntry, Weather, Visibility, NewDiaryEntry} from './types'
import {getAllDiaries, createDiary} from './services/diaryService'

const App = () => {
  
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState<Weather>('' as Weather)
  const [visibility, setVisibility] = useState<Visibility>('' as Visibility)
  const [comment, setComment] = useState('')

  useEffect(() => {
    getAllDiaries().then(data => {      
      setDiaries(data)    
    })  
  }, [])

  const diaryCreation = (event: React.SyntheticEvent) =>
  {
    const newDiary: NewDiaryEntry =
    {
      weather,
      visibility,
      comment,
      date

    }

    event.preventDefault()
    createDiary(newDiary).then(data => {

        const newNonSensetiveDiary: NonSensitiveDiaryEntry = {
          id: data.id,
          weather: data.weather,
          date: data.date,
          visibility: data.visibility,
        }
        
        setDiaries(diaries.concat(newNonSensetiveDiary))    
      })
  }

  return (
    <div>
      {diaries.map((diary, i) => <div key = {i}>
        <h1>Diary {i+1}</h1>
        <div>date: {diary.date}</div>
        <div>weather: {diary.weather}</div>
        <div>visibility: {diary.visibility}</div>
      </div>
      )}
      <h1>Add Diary</h1>
      <form onSubmit={diaryCreation}>     
      <div> Date:
        <input
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        />
      </div>  
      <div> Weather:
        <input
          value={weather}
          onChange={(event) => setWeather(event.target.value as Weather)} 
        />
      </div>
      <div>Visibility:
        <input
          value={visibility}
          onChange={(event) => setVisibility(event.target.value as Visibility)} 
        />
      </div>
      <div>Comment:
         <input
          value={comment}
          onChange={(event) => setComment(event.target.value)} 
        />
      </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default App;