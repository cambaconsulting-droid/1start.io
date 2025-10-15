// services/service-identity/src/core/use-cases/register-user/index.ts

import { prisma } from '@1start/db';
import bcrypt from 'bcryptjs';

// Definimos los datos que necesita este caso de uso
export interface RegisterUserRequest {
  email: string;
  password: string;
  organizationName: string;
}

export async function execute(request: RegisterUserRequest) {
  const { email, password, organizationName } = request;

  // 1. Validación (idéntica a la anterior)
  if (!email || !password || !organizationName) {
    throw new Error('Email, password, and organization name are required');
  }

  // 2. Verificar existencia
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // 3. Encriptar contraseña
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  // 4. Crear en la base de datos
  const newUser = await prisma.user.create({
    data: {
      email,
      passwordHash,
      organization: { create: { name: organizationName } },
    },
    include: { organization: true },
  });

  // 5. Devolver el resultado (sin la contraseña)
  return {
    id: newUser.id,
    email: newUser.email,
    organizationId: newUser.organization?.id,
  };
}