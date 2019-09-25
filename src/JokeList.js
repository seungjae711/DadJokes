import React, { Component } from 'react';
import axios from "axios"
import uuid from "uuid/v4"
import Joke from "./Joke"
import "./JokeList.css"

class JokeList extends Component {
    static defaultProps = {
        numJokesToGet: 10
    };

    constructor(props) {
        super(props);
        this.state = { jokes: [] };
    };

    componentDidMount() {
        this.resetJokes();
    };

    async resetJokes () {
        let jokes = []
        while( jokes.length < this.props.numJokesToGet ) {
            let res = await axios.get("https://icanhazdadjoke.com/", {
                headers: { Accept: "application/json" }
            })
            jokes.push({ text: res.data.joke, votes: 0, id: uuid()});
        }
        this.setState({ jokes: jokes })
    }
 
    handleVote(id, delta) {
        this.setState(st => ({
            jokes: st.jokes.map(j => 
                j.id === id ? {...j, votes: j.votes + delta } :  j    
            )
        }));
    }

    handleClick = () => {
        this.resetJokes();
    }
    render() {
        const jokes = this.state.jokes.map(j => (
            <Joke 
            key ={j.id} 
            votes={j.votes} 
            text={j.text} 
            upvote={()=> this.handleVote(j.id, 1)}
            downvote={() => this.handleVote(j.id, -1)}
        />
        ))

        return (
            <div className ="JokeList">
                <div className="JokeList-sidebar">
                    <h1 className= "JokeList-title">
                        <span>Dad</span> Jokes
                    </h1>
                    <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' />
                    <button className='JokeList-getmore' onClick={this.handleClick}>
                        Get Jokes
                    </button>
                </div>

                <div className= "JokeList-jokes ">
                    {jokes}
                </div>
            </div>
        );
    }
}

export default JokeList;