import { FC } from 'react'
import './Auth.css'
import authBack from '../../image/loginBack.svg'
import Button1 from '../../components/buttons/Button1'
import Input from '../../components/input/Input'

const Auth: FC = () => {
  
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
            <div className='form-container'>
              <form style={{marginBottom: '20px'}}>
                <label>логин</label>
                <Input placeholder='Введите email' name='email'></Input>
                <label style={{marginTop: '36px'}}>пароль</label>
                <Input placeholder='Введите пароль' name='password'></Input>
              </form>
              <a>Забыли пароль?</a>
              <Button1 className='btn-sigh-in'>Войти</Button1>
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
