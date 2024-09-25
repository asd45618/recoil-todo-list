import { useRecoilState, useRecoilValue } from 'recoil';
import CreateToDo from './CreateToDo';
import { Categories, categoryState, toDoSelector, toDoState } from './atoms';
import ToDo from './ToDo';
import styled from 'styled-components';

const ToDoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  hr {
    width: 100%;
  }
`;

const ListWrapper = styled.div`
  width: 15%;
  ul {
    width: 100%;
    padding: 0;
    li {
      width: 100%;
      display: flex;
      justify-content: space-between;
      span {
        overflow: hidden;
      }
    }
  }
  h2 {
    text-align: center;
  }
`;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);
  return (
    <ToDoWrapper>
      <h1>To Dos</h1>
      <hr />
      <ListWrapper>
        <select value={category} onInput={onInput}>
          <option value={Categories.TO_DO}>To Do</option>
          <option value={Categories.DOING}>Doing</option>
          <option value={Categories.DONE}>Done</option>
        </select>
        <CreateToDo />
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ListWrapper>
    </ToDoWrapper>
  );
}

export default ToDoList;
