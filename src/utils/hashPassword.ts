import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const salts = 10;
    const hashedPassword = await bcrypt.hash(password, salts);
    return hashedPassword;
}