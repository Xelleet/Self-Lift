import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import RequireAuth from "./RequireAuth";

function Profile({ userData }){
    const[count, setCount] = useState(0);
    <RequireAuth userId={userData.id}/>
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
                    <TaskForm userId={userData.id}/>
                </div>
        </div>
    )
}

export default Profile;