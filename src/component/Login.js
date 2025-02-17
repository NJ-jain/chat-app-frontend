import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../features/auth/authThunks';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        const result = await dispatch(loginUser({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            navigate('/');
        } else if (error) {
            alert(error);
        }
    }

    return(
        <>
            login
            <br />
            <input 
                type="email" 
                placeholder="email...." 
                value={email} 
                onChange={(e)=> setEmail(e.target.value)} 
                disabled={loading}
            />
            <input 
                type="password" 
                placeholder="password...." 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)} 
                disabled={loading}
            />
            <button onClick={handleSubmit} disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </>
    )
}

export default Login;