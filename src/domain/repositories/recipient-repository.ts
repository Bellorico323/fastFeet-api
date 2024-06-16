import { Recipient } from "../entities/recipient";

export interface RecipientRepository {
  create(recipient: Recipient): Promise<void>
}