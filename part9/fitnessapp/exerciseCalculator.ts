interface result { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: String;
    target: number;
    average: number; 
}

interface ExerciseInput {
    target: number;
    days: Array<number>;
}

const parseArguments = (args: Array<string>): ExerciseInput => {
    if(args.length < 4) throw new Error('Not enough arguments');

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        const target: number = Number(args[2]);
        const numberOfDays: number = Number(args[3]);
        let days:Array<number> =[];
        for(let i=0; i<numberOfDays; i++){
            if(!isNaN(Number(args[i+4]))){
                days.push(Number(args[i+4]));
            } else{
                throw new Error(`${(args[i+4])} is not a number!`);
            }
        }
        return {
            target,
            days
        } 
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

const calculateExercises = (days: Array<number>, target: number): result => {
    let sum=0, rating:number, ratingDescription:String;
    days.forEach(day => sum=sum+day);
    let average = sum/days.length;
    if(average===target) {
        rating=3;
        ratingDescription = 'perfect match';
    }else if(target-average<2) {
        rating=2;
        ratingDescription = 'not too bad but could be better';
    } else if(target-average<4) {
        rating=1;
        ratingDescription = 'could be much better';
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

try {
    const { target, days } = parseArguments(process.argv);
    console.log(calculateExercises(days,target));
} catch (error) {
    console.log('Error, something bad happened, message: ', error.message);
}