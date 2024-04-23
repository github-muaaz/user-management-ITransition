import {useEffect, useState} from "react";
import moment from "moment";

import BlockSvg from "../assets/icons/block.svg";
import DeleteSvg from "../assets/icons/delete.svg";
import Api from "../service/api";
import storage from "../store/local-storage";
import configJson from "../config.json";
import history from "../router/history";
import Modal from "../component/modal";

const Users = () => {
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const [users, setUsers] = useState([]);
    const [selectedUsers, setSelected] = useState([]);

    const {user: currentUser} = storage.get(configJson.storageKey);

    useEffect(() => {
        Api.FetchData(`/user/list/${page}/${size}`)
            .then(data => {
                if (data)
                    setUsers(data)
            })
    }, [page, size]);

    const handleClick = (userId) => {
        // Check if the user is already selected
        if (selectedUsers.includes(userId))
            setSelected(prev => prev.filter(selectedId => selectedId !== userId));
        else
            setSelected(prev => [...prev, userId]);
    }

    const handleSelectAll = () => {
        // check if deselect all
        if (selectedUsers.length === users.length) {
            setSelected([]);
            return;
        }

        setSelected(() => users.map(user => user.id));
    }

    const handleBlock = () => {
        if (selectedUsers.length > 0)
            Api.PutData('/user', selectedUsers)
                .then(res => {

                    console.log('success', res)

                    if (res?.success) {


                        setUsers(prev =>
                            prev
                                .map(user => {
                                    if (selectedUsers.includes(user.id))
                                        user.status = false;

                                    return user;
                                }))
                    }
                })
    }

    const handleUnblock = () => {
        if (selectedUsers.length > 0)
            Api.PutData('/user/unblock', selectedUsers)
                .then(res => {
                    if (res?.success)
                        setUsers(prev =>
                            prev
                                .map(user => {
                                    if (selectedUsers.includes(user.id))
                                        user.status = true;

                                    return user;
                                }))
                })
    }

    const handleDelete = () => {
        if (selectedUsers.length > 0)
            Api.Delete('/user', selectedUsers)
                .then((res) => {
                    if (res?.success)
                        setUsers(prev =>
                            prev
                                .filter(user => !selectedUsers.includes(user.id)))
                })
    }

    const handleLogout = () => {
        Api.Logout();

        history.go('/')
    }

    return (
        <div className="container">
            <Modal onAccepted={handleLogout} targetId={'logoutModal'}/>

            <div className="row mb-5 mt-5">
                <div className="col-9">
                    <h1>Users list</h1>
                </div>

                <div className="col-3">
                    <div className="row align-items-center">
                        <h5 className="col">Hello, {currentUser?.name}!</h5>

                        <button type="button" data-bs-toggle="modal" data-bs-target="#logoutModal"
                                className="col btn btn-outline-danger">Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="mb-4 row justify-content-end">
                <div className="col-1">
                    <button type="button" onClick={handleBlock} className="btn btn-danger">Block</button>
                </div>
                <div className="col-1">
                    <img className="btn" onClick={handleUnblock} src={BlockSvg} alt="unBlock icon"/>
                </div>
                <div className="col-1">
                    <img className="btn" onClick={handleDelete} src={DeleteSvg} alt="unBlock icon"/>
                </div>
            </div>

            <table className="table table-striped table-hover">
                <thead>
                <tr>
                    <th scope="col">
                        <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedUsers.length === users?.length}
                            onChange={handleSelectAll}
                            id="flexCheckAll"
                        />
                    </th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Last Login Time</th>
                    <th scope="col">Registration Time</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr onClick={() => handleClick(user.id)} key={user.id}>
                        <th scope="row">
                            <input
                                className="form-check-input"
                                checked={selectedUsers.includes(user.id)}
                                type="checkbox"
                                onChange={() => {}}
                                id={`flexCheck-${user.id}`}
                            />
                        </th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{moment(user.lastLoginTime).fromNow()}</td>
                        <td>{moment(user.registrationTime).fromNow()}</td>
                        <td>
                            <span className={`badge rounded-pill ${user.status ? 'text-bg-success' : 'text-bg-danger'}`}>
                                {user.status ? 'Active' : 'Blocked'}
                            </span>
                        </td>
                    </tr>
                ))}
                </tbody>

            </table>
        </div>
    )
}

export default Users;
