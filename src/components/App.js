import React from 'react';
import Card from './Card';
import axios from 'axios';
import {endpoints, getImageUrl} from '../config';
class  App extends React.Component{


    constructor() {
        super();

        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        axios
            .get(endpoints.mostPopularMovies())
            .then((data) => {
                this.setState({
                    list: data.data.results,
                });
            });

    }


    render() {

        return (
            <div>

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