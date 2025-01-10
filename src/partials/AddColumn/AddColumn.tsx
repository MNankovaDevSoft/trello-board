import {useForm} from "react-hook-form";
import {useStore} from "../../store/Store.context";
import {observer} from "mobx-react-lite";
import './AddColumn.scss';

interface Props {
    open: boolean,
    onClose: () => void
}
const AddColumn = ({open, onClose}:Props) => {
    const {register, handleSubmit, reset} = useForm();
    const {dashboard} = useStore();
    const onSubmit = (data) => {
        if (!data.name) {
            //@todo Add validations
            return;
        }
        dashboard.addColumn(data);
        onModalClose();
    };
    const onModalClose = (event?) => {
        event?.preventDefault();
        onClose();
        reset();
    };

    if(!open) {
        return;
    }
    return (
        <div className='add-column-wrap'>
            <div className='add-column-inside'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="Type Column Name..." {...register("name")}/>
                    <div className='actions-wrap'>
                        <button type='submit'>Create</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default observer(AddColumn);
