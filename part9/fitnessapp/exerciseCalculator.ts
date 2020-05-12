interface result { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: String,
    target: number,
    average: number 
}

const calculateExercises = (days: Array<number>, target: number): result => {
    let sum=0, rating:number, ratingDescription:String
    days.forEach(day => sum=sum+day)
    let average = sum/days.length
    if(average===target) {
        rating=3
        ratingDescription = "perfect match"
    }else if(target-average<2) {
        rating=2
        ratingDescription = "not too bad but could be better"
    } else if(target-average<4) {
        rating=1
        ratingDescription = "could be much better"
    }
    
    return { 
        periodLength: days.length,
        trainingDays: days.filter(day => day!==0).length,
        success: (average===target ? true : false),
        rating,
        ratingDescription,
        target,
        average 
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2))