import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";

function Profile({userData, isAuthenticated, logout }){
    const [tasks, setTasks] = useState([]);

  // Функция для загрузки задач
  const fetchTasks = async () => {
    const token = localStorage.getItem('token');
    if (!token || !userData) return;

    try {
      const response = await fetch(`http://localhost:8000/api/users/${userData.id}/tasks`, {
        headers: {
          'Authorization': `Token ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setTasks(data);  // Обновляем задачи
      } else {
        console.error('Ошибка при получении задач');
      }
    } catch (error) {
      console.error('Ошибка при получении задач:', error);
    }
  };

  // Загружаем задачи, если пользователь аутентифицирован
  useEffect(() => {
    if (isAuthenticated && userData) {
      fetchTasks();
    }
  }, [isAuthenticated, userData]);  // Обновляется при изменении userData или isAuthenticated
    return(
        <div>
                <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Профиль пользователя с задачами
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
                    <TaskForm userId={userData.id}/>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                      {tasks.map((task) => (
                        <div
                          key={task.id}
                          className="bg-white rounded-2xl shadow-md p-4 hover:shadow-lg transition duration-200 border border-gray-200"
                        >
                          <h2 className="text-lg font-semibold text-gray-800 mb-2">{task.title}</h2>
                    
                          <p className="text-sm text-gray-600 mb-4">
                            {task.description?.length > 100
                              ? `${task.description.slice(0, 100)}...`
                              : task.description}
                          </p>
                            
                          <div className="text-sm text-gray-500 mt-auto">
                            🎯 Очки: <span className="font-bold text-green-600">{task.current_points}/{task.points_to_complete}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                </div>
                <button onClick={logout}>Выйти</button>
        </div>
    )
}

export default Profile;