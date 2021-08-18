

const User = (props) => {
    const {user} = props;
    return(
        <div className='user' >
            <h2>{user.username}</h2>
            <h3>Loves {user.genre}</h3>
            <h3>Contact: {user.email}</h3>
        </div>
    )
}

export default User;