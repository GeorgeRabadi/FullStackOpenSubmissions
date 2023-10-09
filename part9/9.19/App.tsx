import { useState, useEffect } from 'react';
import {NonSensitiveDiaryEntry, Weather, Visibility, NewDiaryEntry, ValidationError} from './types'
import {getAllDiaries, createDiary} from './services/diaryService'
import axios from 'axios';


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
      }).catch((error) =>
      {
        if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
          alert(error.message);
          
        } else {
          console.error(error);
      }
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
        <input type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)} 
        />
      </div>  
      <div> Weather:
        <div>sunny <input type="radio" name="weather" onChange={() => setWeather('sunny' as Weather)} /></div>
        <div>rainy <input type="radio" name="weather" onChange={() => setWeather('rainy' as Weather)} /></div>
        <div>cloudy <input type="radio" name="weather" onChange={() => setWeather('cloudy' as Weather)} /></div>
        <div>stormy <input type="radio" name="weather" onChange={() => setWeather('stormy' as Weather)} /></div>
        <div>windy <input type="radio" name="weather" onChange={() => setWeather('windy' as Weather)} /></div>
      </div>
      <div>Visibility:
        <div>great <input type="radio" name="visibility" onChange={() => setVisibility('great' as Visibility)} /></div>
        <div>good <input type="radio" name="visibility" onChange={() => setVisibility('good' as Visibility)} /></div>
        <div>ok <input type="radio" name="visibility" onChange={() => setVisibility('ok' as Visibility)} /></div>
        <div>poor <input type="radio" name="visibility" onChange={() => setVisibility('poor' as Visibility)} /></div>
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