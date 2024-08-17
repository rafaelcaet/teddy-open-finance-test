import * as bcrypt from 'bcrypt';
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hashedPassword);
    return result;
}