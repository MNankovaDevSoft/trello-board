export interface Column {
    id: number,
    name: string
    items: CardData[]
}

export interface CardData {
    id: number,
    title: string,
    parentId: number
}
