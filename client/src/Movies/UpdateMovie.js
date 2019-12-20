import React, { Component } from 'react';
import axios from 'axios';

export default class UpdateMovie extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: null
        }
    }


    componentDidMount() {
        this.fetchMovie(this.props.match.params.id);
    }

    componentWillReceiveProps(newProps) {
        if (this.props.match.params.id !== newProps.match.params.id) {
            this.fetchMovie(newProps.match.params.id);
        }
    }

    fetchMovie = id => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => this.setState({ movie: res.data }))
            .catch(err => console.log(err.response));
    };

    handleChanges = e => {
        this.setState({ movie: { ...this.state.movie, [e.target.name]: e.target.value } })
    }

    handleSubmit = e => {
        e.preventDefault()
        axios
            .put(`http://localhost:5000/api/movies/${this.props.match.params.id}`, this.state.movie)
            .then(res => console.log(res))
            .catch(err => console.log(err))
        setTimeout(() => this.props.history.push('/'), 1000)
    }

    render() {
        if (!this.state.movie) {
            return <div>Loading movie information...</div>;
        }
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Update Title</label>
                    <input
                        type='text'
                        name='title'
                        value={this.state.movie.title}
                        onChange={this.handleChanges}
                    />
                    <label>Update Director</label>
                    <input
                        type='text'
                        name='director'
                        value={this.state.movie.director}
                        onChange={this.handleChanges}
                    />
                    <label>Update Metascore</label>
                    <input
                        type='number'
                        name='metascore'
                        value={this.state.movie.metascore}
                        onChange={this.handleChanges}
                    />
                    <label>Update Stars</label>
                    <input
                        type='text'
                        name='stars'
                        value={this.state.movie.stars}
                        onChange={this.handleChanges}
                    />
                    <button type='submit'>Update</button>
                </form>
            </div>
        )
    }
}