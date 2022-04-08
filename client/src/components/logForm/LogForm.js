import React, {useState} from 'react';
import { loginUser } from "../../lib/lib";

export default function LogForm() {
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleUsernameInput = (e) => {
        setUsername(e.target.value);
        setMessage("");
    };

    const handlePasswordInput = (e) => {
        setPassword(e.target.value);
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (!username || !password) {
                return setMessage("All inputs are required");
            }
            setMessage("");
            setLoading(true);

            const res = await loginUser({ username, password });
            setLoading(false);
            setMessage(res.message);
        } catch (error) {}
    };

    return (
        <div className='homeWrapper'>
            <div className='logContainer'>
                <div className='logHeading'>
                    <h1>Authentification</h1>
                </div>
                <div className='logForm'>
                    <form>
                        <input value={username} onChange={handleUsernameInput} label="Enter username"></input>
                        <input value={password} onChange={handlePasswordInput} label="Enter password" type="password"></input>
                        <div>
                            {loading && "... processing"}
                            <p>{message}</p>
                                <div onClick={(e) => handleSubmit(e)} disabled={loading}>
                                Login
                                </div>
                        </div>
                     </form>
                </div>
            </div>
        </div>
    );
};