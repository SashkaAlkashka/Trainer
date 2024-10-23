import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import './Auth.css'
import authBack from '../../image/loginBack.svg'
import Button1 from '../../components/buttons/Button1'
import Input from '../../components/input/Input'
import { AuthService } from '../../services/auth.service'
import { toast } from 'react-toastify'


const Auth: FC = () => {

  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const name = "Makhina"
  const class_id = 1
  
  const submit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const data = await AuthService.login({ login, password, name, class_id });;
      if (data && data.token) { // Проверяем наличие token
        // Сохраняем токен в локальное хранилище или состояние
        localStorage.setItem('token', data.token);
        toast.success('Успешная аутентификация');
      } else {
        toast.error('Ошибка при аутентификации: токен не получен');
      }
    } catch (err: any) {
      const error = err.response?.data.message;
      toast.error(error.toString());
    }

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
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder='Введите email' 
                  name='email'
                />
                {/*login.isDirty && login.isEmpty && <div style={{ color: 'red' }}>Поле не может быть пустым</div>*/}
                {/*login.isDirty && login.misisEmailError && <div style={{ color: 'red' }}>Неккоректная почта. Введите почту вуза</div>*/}
                <label style={{marginTop: '36px'}}>пароль</label>
                <Input 
                  onChange={(e) => setPassword(e.target.value)}
                  type='password' 
                  placeholder='Введите пароль' 
                  name='password'
                />
                {/*password.isDirty && password.isEmpty && <div style={{ color: 'red' }}>Поле не может быть пустым</div>*/}
                {/*password.isDirty && password.minLengthError && <div style={{ color: 'red' }}>Минимальная длина пароля 6 символов</div>*/}
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