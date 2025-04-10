import React, { useState } from "react";

function TaskForm({ userId }) { // Предполагаем, что userId передается как prop
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        points_to_complete: '', // Очки до выполнения
        // current_points: 0, // Текущие очки начнем с 0, не поле ввода
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTaskData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!taskData.title || !taskData.points_to_complete) {
            setError('Название и Очки до выполнения обязательны.');
            return;
        }

        try {
            // TODO: Заменить на реальный user ID после интеграции аутентификации
            const currentUserId = userId || 1; // Placeholder
            const token = localStorage.getItem('token'); // Получаем токен

            if (!token) {
                 setError('Ошибка: Вы не авторизованы.');
                 // Возможно, здесь стоит перенаправить на страницу входа
                 return;
            }


            const response = await fetch(`http://localhost:8000/api/users/${currentUserId}/tasks/`, { // URL предполагаемый
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Token ${token}` // Добавляем токен в заголовок
                },
                body: JSON.stringify({
                    title: taskData.title,
                    description: taskData.description,
                    points_to_complete: parseInt(taskData.points_to_complete, 10), // Убедимся, что это число
                    // current_points не отправляем, т.к. он должен быть 0 по умолчанию на бэке
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                 // Попытаемся извлечь сообщение об ошибке из разных возможных полей
                 const errorMessage = errorData.detail || errorData.message || JSON.stringify(errorData);
                 throw new Error(`Ошибка ${response.status}: ${errorMessage}`);
            }

            const newTask = await response.json();
            setSuccess(`Задача "${newTask.title}" успешно создана!`);
            // Очистить форму после успеха
            setTaskData({
                title: '',
                description: '',
                points_to_complete: '',
            });
            // TODO: Обновить список задач пользователя, если он отображается где-то

        } catch (err) {
            console.error('Ошибка при создании задачи:', err);
            setError(err.message || 'Произошла ошибка при создании задачи.');
        }
    };

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                    Создать новую задачу
                </h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    {error && <div className="p-3 bg-red-100 text-red-700 rounded">{error}</div>}
                    {success && <div className="p-3 bg-green-100 text-green-700 rounded">{success}</div>}

                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Название задачи <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                id="title"
                                name="title"
                                type="text"
                                required
                                value={taskData.title}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Описание (необязательно)
                        </label>
                        <div className="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                value={taskData.description}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="points_to_complete" className="block text-sm font-medium text-gray-700">
                            Очки до выполнения <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1">
                            <input
                                id="points_to_complete"
                                name="points_to_complete"
                                type="number"
                                required
                                min="1" // Задачи должны иметь хотя бы 1 очко
                                value={taskData.points_to_complete}
                                onChange={handleChange}
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                     {/* Отображение текущих очков, если нужно */}
                     {/* <div className="mt-1">
                         <p className="text-sm text-gray-500">Текущие очки: 0</p>
                     </div> */}


                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Создать задачу
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default TaskForm; 