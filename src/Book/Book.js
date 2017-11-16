import React, {Component} from 'react';
import './Book.css';


class Book extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let books = this.props.books;

        return (
            <div>
                {
                    books.map(function (book) {
                        return (
                            <div key={'book_' + book.id} className='book'>
                                <div className="imgZone">
                                    <div className="image">
                                        <img className='imagePhoto' src={book.image_url}
                                             alt={book.title + ' - ' + book.author}/>
                                    </div>
                                </div>
                                <div className="textZone">
                                    <h3 className="title">{book.title}</h3>
                                    <label className="author">{book.author}</label>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        );
    }
}

export default Book;
