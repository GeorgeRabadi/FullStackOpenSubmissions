const calculateBmi = (weight: number, height: number): String => {
    const bmi = 10000 * weight / (height*height)
    
    if(bmi > 25)
        return "Overweight";
    else if(18.5 < bmi && bmi < 25)
        return "Normal (Healthy Weight)";
    else
        return "Underweight";
  }
  
console.log(calculateBmi(78, 178));