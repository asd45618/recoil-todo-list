import { useForm } from 'react-hook-form';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { categoryState, toDoState } from './atoms';
import styled from 'styled-components';

const FormWrapper = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  input {
    flex: 0 0 78%;
  }
  button {
    flex: 0 0 20%;
  }
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();

  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue('toDo', '');
  };

  return (
    <FormWrapper onSubmit={handleSubmit(handleValid)}>
      <input
        {...register('toDo', { required: 'Please write a To Do' })}
        placeholder='Write a to do'
      />
      <button>Add</button>
    </FormWrapper>
  );
}

export default CreateToDo;
