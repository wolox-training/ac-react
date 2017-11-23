import React, {Component} from 'react';
import './Suggestion.css'

class Suggestion extends Component {
    render() {
        let sug = []
        for (let i = 0; i < 5; i++) {
            sug.push( <img  key={i} src="http://wolox-training.s3.amazonaws.com/uploads/6942334-M.jpg"
                           className='image' alt=""/>);
        }
        return (
            <div className='suggestContainer' style={{marginTop:-20}}>
                <div className='suggestions'>
                    <h3 className='suggestionTitle'>Sugerencias</h3>
                    <div className='suggestionsContainer'>
                        { sug }
                    </div>

                </div>
            </div>
        );
    }
}

export default Suggestion;
