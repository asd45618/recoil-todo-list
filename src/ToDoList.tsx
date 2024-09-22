import { useState } from 'react';
import { useForm } from 'react-hook-form';

// function ToDoList() {
//   const [toDo, setToDo] = useState('');
//   const [toDoError, setToDoError] = useState('');
//   const onChange = (event: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = event;
//     setToDoError('');
//     setToDo(value);
//   };
//   const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (toDo.length < 10) {
//       return setToDoError('To do should be longer');
//     }
//     console.log('submit');
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} value={toDo} placeholder='Write a to do' />
//         <button>Add</button>
//         {toDoError !== '' ? toDoError : null}
//       </form>
//     </div>
//   );
// }

function ToDoList() {
  const { register, handleSubmit, formState } = useForm();
  const onValid = (data: any) => {};
  console.log(formState.errors);
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input {...register('Email', { required: true })} placeholder='Email' />
        <input
          {...register('first Name', { required: true })}
          placeholder='First name'
        />
        <input
          {...register('last Name', { required: true })}
          placeholder='Last name'
        />
        <input
          {...register('username', { required: true, minLength: 10 })}
          placeholder='Username'
        />
        <input
          {...register('password', { required: true, minLength: 5 })}
          placeholder='Password'
        />
        <input
          {...register('password1', {
            required: 'Password is required',
            minLength: {
              value: 5,
              message: 'Your password is so short',
            },
          })}
          placeholder='Password1'
        />
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;
