import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../Role';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	username: string;

	@Column()
	password: string;

	@Column({
		type: 'enum',
		enum: Role,
		default: [Role.User],
	})
	role: Role; // This is the property in the entity class that holds the value of the `role` column
}
