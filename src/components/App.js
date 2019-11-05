import React from 'react';
import Card from './Card';
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';
class  App extends React.Component{

    constructor() {
        super();

        this.state = {
            list: [],
            genres: [],
        };
    }



    genreSelect = id => {
        //console.log(this.state.genres().toString());
        axios.get(endpoints.genreMovies(id)).then(data => {
            this.setState({
                list: data.data.results
            });
        });
        this.setState({
            showPopular: false
        })
    };

    popularSelect = () => {
        axios.get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                })
            });
        this.setState({
            showPopular: true
        })
    }

    componentDidMount() {
        axios.get(endpoints.genres()).then(data => {
            this.setState({
                genres: data.data.genres
            });
        });

        axios.get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                });
            });
    }


    render() {

        return (
            <div>
                <nav className='navbar bg-primary'>
                    <button
                        type='button'
                        className='link-button'
                        onClick={() => this.popularSelect()}
                    >
                        Most Popular
                    </button>
                    {this.state.genres.map((genre) => (
                        <button
                            key={genre.id}
                            type='button'
                            className='link-button'
                            onClick={() => this.genreSelect(genre.id)}
                        >
                            {genre.name}
                        </button>
                    ))}
                </nav>

                {this.state.list.map((card) => (
                  <Card
                      key={card.id}
                      title={card.original_title}
                      backgroundImage={getImageUrl(card.backdrop_path)}
                      data={card.release_date}
                      voteAverage={card.vote_average}
                      voteCount={card.vote_count}
                      description={card.overview}

                  />
              ))}
            </div>
        );
    }
}

export default App;