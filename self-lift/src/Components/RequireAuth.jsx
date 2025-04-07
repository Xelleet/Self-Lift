import React, { useState, useEffect } from 'react';

const RequireAuth = ({ userId }) => { // Принимаем ID пользователя
  const [token, setToken] = useState(null);

  // Уникальный ключ для каждого пользователя
  const storageKey = `userToken_${userId}`;

  useEffect(() => {
    const storedToken = localStorage.getItem(storageKey);
    if (storedToken) {
      setToken(storedToken);
    }
  }, [userId]); // Зависимость от userId

  const handleLogin = () => {
    const fakeToken = `token_for_user_${userId}_${Date.now()}`;
    localStorage.setItem(storageKey, fakeToken);
    setToken(fakeToken);
    alert(`Пользователь ${userId} вошёл!`);
  };

  const handleLogout = () => {
    localStorage.removeItem(storageKey);
    setToken(null);
    alert(`Пользователь ${userId} вышел!`);
  };

  return (
    <div>
      <h2>Управление токенами (User ID: {userId})</h2>
      {token ? (
        <div>
          <p>Токен: <code>{token}</code></p>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      ) : (
        <button onClick={handleLogin}>Войти</button>
      )}
    </div>
  );
};

export default RequireAuth;