import { useState, useEffect } from 'react';
import {NonSensitiveDiaryEntry} from './types'
import {getAllDiaries} from './services/diaryService'

const App = () => {
  
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => {      
      setDiaries(data)    
    })  
  }, [])

  return (
    <div>
      {diaries.map((diary, i) => <div key = {i}>
        <h1>Diary {i+1}</h1>
        <div>id: {diary.id}</div>
        <div>date: {diary.date}</div>
        <div>weather: {diary.weather}</div>
        <div>visibility: {diary.visibility}</div>
      </div>
      )}
    </div>
  );
};

export default App;