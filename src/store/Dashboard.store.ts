import RootStore from "./Root.store";
import {makeAutoObservable} from "mobx";
import {CardData, Column} from "../interfaces/dashboard.interface";

export default class DashboardStore {
    public root: RootStore;
    public columns: Column[] = [
        {
            id: 1,
            name: 'TO DO',
            items: [
                {
                    id: 1,
                    title: 'Some card title',
                    parentId: 1
                },
                {
                    id: 2,
                    title: 'One more card title',
                    parentId: 1
                },
                {
                    id: 3,
                    title: 'Some different card title',
                    parentId: 1
                }
            ]
        },
        {
            id: 2,
            name: 'In progress',
            items: [
                {
                    id: 4,
                    title: 'Some card title 3',
                    parentId: 2
                },
            ]
        },
        {
            id: 3,
            name: 'DONE',
            items: []
        }
    ]

    constructor(root: RootStore) {
        this.root = root;
        makeAutoObservable(this, {
            root: false
        });
    }

    addColumn(column: Pick<Column, 'name'>) {
        const lastItem = this.columns.slice().sort().reverse()[0];
        this.columns.push({
            ...column,
            id: lastItem ? lastItem.id + 1 : 1,
            items: []
        })
    }

    onRemoveCard(data: CardData) {
        const columns = this.columns.slice();
        const column = columns.find((item) => {
            return item.id === data.parentId;
        });
        if (column) {
            const itemIndex = column.items.findIndex(item => item.id === data.id);
            column.items.splice(itemIndex, 1);
            this.columns = columns;
        }
    }

    onUpdateCard(data: CardData) {
        console.log("data: ", data)
        // const columns = this.columns.slice();
        // const column = columns.find((item) => {
        //     return item.id === data.parentId;
        // });
        // if (column) {
        //     const itemIndex = column.items.findIndex(item => item.id === data.id);
        //     column.items.splice(itemIndex, 1);
        //     this.columns = columns;
        // }
    }

    onMoveUp(data: CardData) {
        const columns = this.columns.slice();
        const column = columns.find((item) => {
            return item.id === data.parentId;
        });
        if (column) {
            const currentIndex = column.items.findIndex(item => item.id === data.id);
            const temp = column.items[currentIndex - 1];
            column.items[currentIndex - 1] = column.items[currentIndex];
            column.items[currentIndex] = temp;
        }
    }

    onMoveDown(data: CardData) {
        const columns = this.columns.slice();
        const column = columns.find((item) => {
            return item.id === data.parentId;
        });
        if (column) {
            const currentIndex = column.items.findIndex(item => item.id === data.id);
            const temp = column.items[currentIndex + 1];
            column.items[currentIndex + 1] = column.items[currentIndex];
            column.items[currentIndex] = temp;
        }
    }

    onChangeStatus(data: CardData, parentId: number) {
        const temp = {...data};
        const column = this.columns.find(item => item.id === parentId);
        if (column) {
            this.onRemoveCard(data);
            temp.parentId = column.id;
            column.items.push(temp);
        }
    }

    onCreateCard(data: Omit<CardData, 'id'>) {
        const column = this.columns.find(item => item.id === data.parentId);
        if (column) {
            const lastId = this.columns.map(item => item.items).slice().flat(1).map(item => item.id).sort().reverse()[0];
            column.items.push({
                ...data,
                id: lastId ? lastId + 1 : 1
            })
        }
    }
}
