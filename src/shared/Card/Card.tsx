import {observer} from "mobx-react-lite";
import {useStore} from "../../store/Store.context";
import './Card.scss';
import {CardData} from "../../interfaces/dashboard.interface";

interface Props {
    data: CardData,
}
const Card = ({data}:Props) => {

    const {dashboard} = useStore();
    const column = dashboard.columns.find((item) => item.id === data.parentId);
    const isFirst = column.items[0]?.id === data.id;
    const isLast = column.items[column.items.length-1]?.id === data.id;

    return (
        <div className={'card-wrap'}>
            <button className='remove-card' onClick={() => dashboard.onRemoveCard(data)}>Remove card</button>
            <h4>{data.title}</h4>
            <div className='actions-wrap'>
                {
                    !isFirst && (
                        <button onClick={() => dashboard.onMoveUp(data)}>Move up</button>
                    )
                }
                {
                    !isLast && (
                        <button onClick={() => dashboard.onMoveDown(data)}>Move down</button>
                    )
                }
            </div>
            <select onChange={(e) => dashboard.onChangeStatus(data, Number(e.target.value))} value={data.parentId}>
                {
                    dashboard.columns.map((column) => (
                        <option key={`status-${column.id}`} value={column.id}>{column.name}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default observer(Card);
