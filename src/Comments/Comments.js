import React, {Component} from 'react';
import './Comments.css'

class Comment extends Component {
    render() {
        return (
            <div className='newComment'>
                <div className="leftSide">
                    <img src={require('../Assets/avatar-small.png')}
                         className='image' alt=""/>
                </div>
                <div className="rightSide">
                    <span>Kimberly Carter</span><br/>
                    <label className="date">xx/xx/xx</label>
                    <h5 className='comentario'>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                        tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h5>
                </div>
            </div>
        )
    }

}

class Comments extends Component {
    render() {
        return (
            <div className='comContainer' style={{marginTop: -20}}>
                <div className='comments'>
                    <h3 className='commentTitle'>Comentarios</h3>
                    <div className='newComment'>
                        <div className="leftSide">
                            <img src={require('../Assets/avatar-small.png')}
                                 className='image' alt=""/>
                        </div>
                        <div className="rightSide">
                            <span>Agregar comentario</span><br/>
                            <textarea cols="30" rows="10"></textarea>
                            <button>Enviar</button>
                        </div>
                    </div>
                    <Comment/>
                    <Comment/>

                </div>
            </div>
        );
    }
}


Comments.propTypes = {};

export default Comments;
