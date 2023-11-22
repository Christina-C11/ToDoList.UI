export interface ToDoItem {
    id?: string,
    title?: string,
    itemList?: ItemDetail[],
    priority?: number,
    dueDate?: Date,
    status?: number,
    createdBy?: string,
    createdDate?: Date,
    lastUpdatedBy?: string,
    lastUpdatedDate?: Date,
    getToDoItem?: GetToDoItem
}

export interface ItemDetail {
    itemId?: string, //will be using uuid
    description?: string,
    isCompleted?: boolean,
    createdBy?: string,
    createdDate?: Date,
    lastUpdatedBy?: string,
    lastUpdatedDate?: Date
}

export interface GetToDoItem{
    pageIndex?: number;
    totalPageCount?: number;
    recordPerPage?: number;
    toDoItems?: ToDoItem[]
}