import React from "react";

function Profile({ userData }){
    /*const [userData, setUserData] = React.useState({
        username: '',
        email: ''
    });

    React.useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/users/me/', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Не удалось получить данные пользователя');
                }

                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error('Ошибка:', error);
                alert('Не удалось загрузить данные профиля');
            }
        };

        fetchUserData();
    }, []);*/
    return(
        <div>
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Профиль пользователя
                        </h2>
                    </div>

                    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Имя пользователя
                                    </label>
                                    <div className="mt-1">
                                        <p className="text-lg font-medium text-gray-900">
                                            {userData?.username || 'Не указано'}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Email
                                    </label>
                                    <div className="mt-1">
                                        <p className="text-lg font-medium text-gray-900">
                                            {userData?.email || 'Не указано'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Profile;