export class Todo{
    id!: number;
    description!: string;
    status!: 'completed' | 'incompleted' | 'important';
}