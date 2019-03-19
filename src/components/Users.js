import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import getData from '../query';

class Users extends Component {

    constructor(props){
        super(props);
        const url = `https://api.github.com/users`;
        getData(url, this.props.auth)
            .then(
                response => this.props.getUsers(response),
                error => console.log(`Rejected: ${error}`)
            );
    }

    getList() {
        let users = this.props.users;
        let list = users.map((user, index) =>
            (<tr key={index}>
                <td>{user.login}</td>
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
                    <Link className="my-2 float-right" to="/repositories"> Репозитории </Link>
                </header>
                <table className="table table-bordered">
                    <thead>
                    <tr><th>Юзеры</th></tr>
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
        users: state.users.items,
        auth: state.users.auth
    }),
    dispatch => ({
        getUsers: (users) => {
            dispatch({type: 'GET_USERS', payload: users});
        }
    })
)(Users);

