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
    lastUpdatedDate?: Date
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