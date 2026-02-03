export const LocalStorage = {
    saveData: (key: string, value: string) => {
        localStorage.setItem(key, value);
    },
    getData: (key: string): string | null => {
        return localStorage.getItem(key);
    },
    removeData: (key: string) => {
        localStorage.removeItem(key);
    },
    clearData: () => {
        localStorage.clear();
    },
};
