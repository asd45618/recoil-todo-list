import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

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

const ErrorMsg = styled.span`
  color: #ed4a4a;
`;

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  password1: string;
  extraError?: string;
  // [key: string]: string;
}

function ToDoList() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({
    defaultValues: {
      email: '@naver.com',
    },
  });
  const onValid = (data: IFormData) => {
    if (data.password !== data.password1) {
      setError(
        'password1',
        { message: 'Password are not the same' },
        { shouldFocus: true }
      );
    }
    // setError('extraError', { message: 'Server offline.' });
  };
  console.log(errors);
  return (
    <div>
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver\.com$/,
              message: 'Only naver.com emails allowed',
            },
          })}
          placeholder='Email'
        />
        <ErrorMsg>{errors?.email?.message}</ErrorMsg>
        <input
          {...register('firstName', {
            required: 'First name is required',
            validate: {
              noNico: (value) =>
                value.includes('nico') ? 'no nicos allowed' : true,
              noNick: (value) =>
                value.includes('nick') ? 'no nick allowed' : true,
            },
          })}
          placeholder='First name'
        />
        <ErrorMsg>{errors?.firstName?.message}</ErrorMsg>
        <input
          {...register('lastName', { required: 'Last name is required' })}
          placeholder='Last name'
        />
        <ErrorMsg>{errors?.lastName?.message}</ErrorMsg>
        <input
          {...register('userName', {
            required: 'User name is required',
            minLength: 10,
          })}
          placeholder='Username'
        />
        <ErrorMsg>{errors?.userName?.message}</ErrorMsg>
        <input
          {...register('password', {
            required: 'password is required',
            minLength: 5,
          })}
          placeholder='Password'
        />
        <ErrorMsg>{errors?.password?.message}</ErrorMsg>
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
        <ErrorMsg>{errors?.password1?.message}</ErrorMsg>
        <button>Add</button>
        <ErrorMsg>{errors?.extraError?.message}</ErrorMsg>
      </form>
    </div>
  );
}

export default ToDoList;
