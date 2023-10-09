interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number

}

const calculateExercises  = (hours: number[], target: number): Result => {

    const periodLength: number = hours.length
    let trainingDays: number = 0
    let sum: number = 0
    let success: boolean = false
    let rating: number = 1
    let ratingDescription: string = "Not even close!"

    for(let i = 0; i<periodLength; i++)
    {
        if(hours[i] >= 1)
            trainingDays++

        sum += hours[i]
    }

    const average: number = sum/periodLength

    if(average > target){
        rating = 3
        success = true
        ratingDescription = "Excellent!"
    }
    else if(average > target/2)
    {
        rating = 2
        success = false
        ratingDescription = "Could have done better."
    }
        

    const result: Result = {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
        
    }

    return result

}

const hours: number[] = [3, 0, 2, 4.5, 0, 3, 1]
console.log(calculateExercises(hours, 2))