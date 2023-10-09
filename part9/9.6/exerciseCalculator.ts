interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number

}


const calculateExercises  = (hours: string[]): Result => {

    const length: number = hours.length;
    const periodLength: number = length - 3;
    let trainingDays: number = 0;
    let sum: number = 0;
    let success: boolean = false;
    let rating: number = 1;
    let ratingDescription: string = "Not even close!";
    const target: number = parseInt(hours[length - 1]);

    for(let i = 2; i<length - 1; i++)
    {   
        
        if(isNaN(Number(hours[i]))){     
            throw new Error('Provided values were not all numbers!');
        }
     
        console.log(hours[i]);

        if(Number(hours[i]) != 0)
            trainingDays++;

        sum += Number(hours[i]);
    }

    const average: number = sum/periodLength;

    if(average > target){
        rating = 3;
        success = true;
        ratingDescription = "Excellent!";
    }
    else if(average > target/2)
    {
        rating = 2;
        success = false;
        ratingDescription = "Could have done better.";
    }
        

    const result: Result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
        
    };

    return result;

};
  
try {
    console.log(calculateExercises(process.argv));
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}