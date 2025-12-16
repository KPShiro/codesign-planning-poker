import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { EVENTS, type PokerEvent } from '@codesign-planning-poker/shared';

const socket = io('http://localhost:3000');

function App() {
    const [messages, setMessages] = useState<string[]>([]);

    useEffect(() => {
        socket.on(EVENTS.TEST_PONG, (data: PokerEvent) => {
            setMessages((prev) => [...prev, `Server says: ${data.message} at ${data.timestamp}`]);
        });

        return () => {
            socket.off(EVENTS.TEST_PONG);
        };
    }, []);

    const sendPing = () => {
        const payload: PokerEvent = {
            message: 'Hello from React!',
            timestamp: Date.now(),
        };
        socket.emit(EVENTS.TEST_PING, payload);
    };

    return (
        <div style={{ padding: 20 }}>
            <h1>Planning Poker MVP</h1>
            <button onClick={sendPing}>Wyślij PING do serwera</button>

            <h3>Logi:</h3>
            <ul>
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
