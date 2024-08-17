export function generateCode(size: number) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charsLength = chars.length;

    for (let i = 0; i < size; i++) {
        result += chars.charAt(Math.floor(Math.random() * charsLength));
    }

    return result;
}