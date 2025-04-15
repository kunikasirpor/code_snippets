// PROPS
import Proptypes from "prop-types";
function Students(props){
    return (
        <div className="students">
            <p>Name: {props.name}</p>
            <p>age {props.age}</p>
        </div>
    );
}
Students.propTypes = {
    Name: Proptypes.string,
    age : Proptypes.number
    
}
export default Students;