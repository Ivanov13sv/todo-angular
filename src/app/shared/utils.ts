import { Todo } from "src/app/shared/models/todo";

export const filterBySearchInput = (item: Todo, searchField: string) => {
    return item.description.toLocaleLowerCase().includes(searchField.toLocaleLowerCase()) ? item : null;
}
