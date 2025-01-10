import {useForm} from "react-hook-form";
import {observer} from "mobx-react-lite";
import './CreateOrUpdateCard.scss';
import {useStore} from "../../store/Store.context";

interface Props {
    open: boolean,
    onClose: () => void,
    parentId?: number
}

const CreateOrUpdateCard = ({open, onClose, parentId}:Props) => {
    const {register, handleSubmit, reset} = useForm();
    const {dashboard} = useStore();

    const onSubmit = (data) => {
        data.parentId = parentId;
        dashboard.onCreateCard(data)
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
        <div className='create-card-wrap'>
            <div className='create-card-inside'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input placeholder="Type Card Title..." {...register("title")}/>
                    <div className='actions-wrap'>
                        <button type='submit'>Create</button>
                        <button onClick={onClose}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default observer(CreateOrUpdateCard);
