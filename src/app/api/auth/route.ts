// src/app/api/_helpers/auth.ts
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return { error: 'No token', status: 401 };
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
    return { decoded };
  } catch (err) {
    return { error: 'Invalid token', status: 403 };
  }
}