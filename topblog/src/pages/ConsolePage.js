import React, { useEffect } from 'react';

const ConsolePage = () => {
    useEffect(() => {
        // Ваш код для работы с консолью, например:
        console.log('Привет, это страница с консолью!');
    }, []);

    return (
        <div>
            <h1>Console Page</h1>
            <p>Откройте консоль браузера, чтобы увидеть вывод.</p>
        </div>
    );
};

export default ConsolePage;