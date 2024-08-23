import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import './Auth.css'
import authBack from '../../image/loginBack.svg'
import Button1 from '../../components/buttons/Button1'
import Input from '../../components/input/Input'

const Auth: FC = () => {

  type LoginForm = {
    email: {
      value: string;
    };
    password: {
      value: string;
    };
  }
 

  type ValidationRule = {
    minLength?: number;
    isEmail?: boolean;
    isPassword?: boolean;
    isMisisEmail?: boolean;
  };

  const useValidation = (value: string, validations: ValidationRule) => {
    const [isEmpty, setEmpty] = useState<boolean>(true)
    const [minLengthError, setMinLengthError] = useState<boolean>(false)
    const [misisEmailError, setMisisEmailError] = useState<boolean>(false)
 
    useEffect(() => {
      for (const validation in validations) {
        switch (validation) {
          case 'minLength':
            value.length < validations[validation]! 
              ? setMinLengthError(true) 
              : setMinLengthError(false);
            break;
          case 'isEmpty':
            value ? setEmpty(false) : setEmpty(true)
            break;
          case 'isMisisEmail':
            const misisEmailRegex = /^m[0-9]{7}@misis\.ru$/;
            misisEmailRegex.test(value) 
              ? setMisisEmailError(false) 
              : setMisisEmailError(true);
            break;
        }
      }
    }, [value, validations])
    return {
      isEmpty,
      minLengthError,
      misisEmailError,
    }
  }

  const useInput = (initialValue: string, validations: ValidationRule) => {
    const [value, setValue] = useState<string>(initialValue)
    const [isDirty, setDirty] = useState<boolean>(false)
    const valid = useValidation(value, validations)

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value)
    }

    const onBlur = (e: ChangeEvent<HTMLInputElement>) => {
      setDirty(true)
    }

    return {
      value,
      onChange,
      onBlur,
      isDirty,
      ...valid
    }
  }

  const emailValidations = {
    isEmpty: true,
    isMisisEmail: true
  };

  const passwordValidations = {
    isEmpty: true,
    minLength: 6
  };

  const email = useInput('', emailValidations)
  const password = useInput('', passwordValidations)
  
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & LoginForm;
    const email = target.email.value;
  }

  return (
    <div className='authContainer' style={{backgroundImage: `url(${authBack})`}}>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col'>
            <div className='left-item'>
              <h1>СНОВА</h1>
              <h1>ПРИВЕТ</h1>
              <Button1 className='btn-guest'>Я гость</Button1>
            </div>
          </div>
          <div className='col form'>
            <div className='form-container' >
              <form style={{marginBottom: '20px'}} onSubmit={submit}>
                <label>логин</label>
                <Input 
                  onChange={email.onChange} 
                  onBlur={email.onBlur} 
                  value={email.value} 
                  placeholder='Введите email' 
                  name='email'
                />
                {email.isDirty && email.isEmpty && <div style={{ color: 'red' }}>Поле не может быть пустым</div>}
                {email.isDirty && email.misisEmailError && <div style={{ color: 'red' }}>Неккоректная почта. Введите почту вуза</div>}
                <label style={{marginTop: '36px'}}>пароль</label>
                <Input 
                  onChange={password.onChange} 
                  onBlur={password.onBlur} 
                  value={password.value} 
                  type='password' 
                  placeholder='Введите пароль' 
                  name='password'
                />
                {password.isDirty && password.isEmpty && <div style={{ color: 'red' }}>Поле не может быть пустым</div>}
                {password.isDirty && password.minLengthError && <div style={{ color: 'red' }}>Минимальная длина пароля 6 символов</div>}
                <a>Забыли пароль?</a>
                <Button1 type='submit' className='btn-sigh-in'>Войти</Button1>
              </form>
              <div className='or-divider'>
                <div className='line'></div>
                <span>Или</span>
                <div className='line'></div>
              </div>
              <Button1 className='sigh-up'>зарегистрироваться</Button1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth