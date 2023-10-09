import CoursePart from '../types'

const Part = ({part}: {part: CoursePart}) =>
{
    switch(part.kind){
        case "basic":
            return(
                <>description: {part.description}</>
            );
        case "group":
            return(
                <>Group Project Count: {part.groupProjectCount}</>
            );
        case "background":
            return(
                <>description: {part.description}<br /> Refer to: {part.backgroundMaterial}</>
            );
        case "special":
            return(
                <>Required skills: {part.requirements.map((requirement, i) => <div key ={i}>{requirement}</div> )}</>
            );

    }
}

export default Part