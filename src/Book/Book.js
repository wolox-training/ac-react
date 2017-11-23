import React, {Component} from 'react';
import './Book.css';


class Book extends Component {

    render() {
        let books = this.props.books;
        let self = this
        return (
            <div>
                {
                    books.map(book => (
                        <div key={'book_' + book.id} className='book' onClick={() => self.props.accion(book.id)}>
                            <div className="imgZone">
                                <div className="image">
                                    <img className='imagePhoto' src={book.image_url}
                                         alt={book.title + ' -- ' + book.author}/>
                                </div>
                            </div>
                            <div className="textZone">
                                <h3 className="title">{book.title}</h3>
                                <label className="author">{book.author}</label>
                            </div>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default Book;
