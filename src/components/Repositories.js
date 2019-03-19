import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import getData from '../query';

class Repositories extends Component {

    constructor(props){
        super(props);
        const url = `https://api.github.com/repositories`;
        getData(url, this.props.auth)
            .then(
                response => this.props.getRepositories(response),
                error => console.log(`Rejected: ${error}`)
            );
    }

    getList() {
        let repositories = this.props.repositories;
        let list = repositories.map((repository, index) =>
            (<tr key={index}>
                <td>{repository.name}</td>
            </tr>)
        );

        return list;
    }

    render() {
        if(!this.props.auth){
            return <Redirect to='/' />;
         }

        return (
            <div className="container">
                <header className="bg-light p-3 clearfix">
                    <Link className="my-2 float-right" to="/users">Юзеры</Link>
                </header>
                <table className="table table-bordered">
                    <thead>
                    <tr><th>Репозитории</th></tr>
                    </thead>
                    <tbody>
                    {this.getList()}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    state => ({
        repositories: state.repositories.items,
        auth: state.repositories.auth
    }),
    dispatch => ({
        getRepositories: (repositories) => {
            dispatch({type: 'GET_REPOSITORIES', payload: repositories});
        }
    })
)(Repositories);

