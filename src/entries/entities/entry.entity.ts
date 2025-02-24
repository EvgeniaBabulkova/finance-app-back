import { Category } from 'src/categories/entities/category.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entry {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	amount: number;

	@Column()
	description: string;

	@ManyToOne(() => Category, (category) => category.entries, {
		eager: true,
	})
	category: Category;
}
