import React from 'react';

class Carousel extends React.Component {
    constructor (props) {
        super (props);
        this.state = {
            photos : [],
            active : 0
        }
    }

    static getDerivedStateFromProps({ media }) {
        let photos = ["http://placecorgi.com/600/600"];

        if (media.length) {
            photos = media.map (({ large }) => large);
        }

        //return the object we want to be merged 
        //in the state
        return { photos };
    }
    
    //Always use arrow functions for event listeners and when we pass
    //function from parent to child component .....
    handleIndexClick = (event) => {
        this.setState ({
            //anything returned from DOM is a string
            //so we have to convert string to number
            //put a plus sign in front to convert string to number
            active : +event.target.dataset.index,
        })
    }

    render () {

        const { photos, active } = this.state;

        return (
            <div className="carousel">
                <img src={photos[active]} alt="animal" />
                <div className="carousel-smaller">
                    {photos.map((photo, index) => {
                        return (
                            <img 
                                src={photo}
                                onClick={this.handleIndexClick}
                                data-index={index}
                                className={index === active ? "active" : ""}
                                alt="animal thumbnail" />
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Carousel;