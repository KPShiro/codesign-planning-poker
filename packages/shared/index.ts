export interface PokerEvent {
    message: string;
    timestamp: number;
}

export const EVENTS = {
    TEST_PING: 'test-ping',
    TEST_PONG: 'test-pong',
} as const;
