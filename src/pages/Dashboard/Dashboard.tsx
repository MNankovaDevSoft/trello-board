import {observer} from "mobx-react-lite";
import './Dashboard.scss';
import {useStore} from "../../store/Store.context";
import Card from "../../shared/Card/Card";
import AddColumn from "../../partials/AddColumn/AddColumn";
import {useState} from "react";
import CreateOrUpdateCard from "../../partials/CreateOrUpdateCard/CreateOrUpdateCard";
import {Column} from "../../interfaces/dashboard.interface";

const Dashboard = () => {
    const {dashboard} = useStore();
    const [addColumnShown, setAddColumnShown] = useState(false);
    const [activeColumn, setActiveColumn] = useState<Column>(null);
    const [createCardShown, setCreateCardShown] = useState(false);
    const addColumn = () => {
        setAddColumnShown(true);
    }

    const createCard = (column: Column) => {
        setCreateCardShown(true);
        setActiveColumn(column);
    }

    return (
        <div className='root'>
            {
                dashboard.columns.map((column) => (
                    <div className='column' key={`column-${column.id}`}>
                        <div className='column-head'>
                            <h3>{column.name}</h3>
                        </div>
                        <div className='cards'>
                            {
                                column.items.map((card) => (
                                    <div key={`card-${card.id}`}>
                                        <Card data={card}/>
                                    </div>
                                ))
                            }
                        </div>
                        <button className='create-card-button' onClick={() => createCard(column)}>Create card</button>
                    </div>
                ))
            }
            <button className='add-column-button' onClick={addColumn}>+ Add column</button>
            <AddColumn
                open={addColumnShown}
                onClose={() => setAddColumnShown(false)}/>
            <CreateOrUpdateCard
                open={createCardShown}
                parentId={activeColumn?.id}
                onClose={() => setCreateCardShown(false)}/>
        </div>
    )
}

export default observer(Dashboard);
