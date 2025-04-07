import React, {useState} from "react";
import RequireAuth from "./RequireAuth";

function Login({setIsAuthenticated, setUserData}){
    const [formData, setFormData] = useState({
            login: '',
            password: '',
        });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        };
    
        const handleSubmit = async (e) => {
            e.preventDefault();
    
            try {
                const response = await fetch('http://localhost:8000/api/login/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        username: formData.login,
                        password: formData.password
                    })
                });
    
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || 'Ошибка входа');
                }
    
                const data = await response.json();
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                setUserData({
                    username: data.username,
                    email: data.email
                });
                <RequireAuth userId={data.id}/>
                alert('Вы успешно вошли!');
            } catch (error) {
                console.error('Ошибка:', error);
                alert(error.message || 'Произошла ошибка при входе');
            }
        };
    return(
        <div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="login" className="block text-sm font-medium text-gray-700">
                                    Login
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="login"
                                        name="login"
                                        type="text"
                                        autoComplete="login"
                                        required
                                        value={formData.login}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Пароль
                                </label>
                                <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        autoComplete="new-password"
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    Войти
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
        </div>
    )
}

export default Login;