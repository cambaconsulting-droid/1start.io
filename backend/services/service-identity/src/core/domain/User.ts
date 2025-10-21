// services/service-identity/src/core/domain/User.ts

export class User {
  readonly id: string;
  readonly email: string;
  readonly passwordHash: string;
  readonly organizationId?: string;

  constructor({ id, email, passwordHash, organizationId }: { id: string; email: string; passwordHash: string; organizationId?: string }) {
    this.id = id;
    this.email = email;
    this.passwordHash = passwordHash;
    this.organizationId = organizationId;
  }
}