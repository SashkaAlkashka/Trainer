import { FC, FormEvent, useState } from 'react'
import './Auth.css'
import authBack from '../../image/loginBack.svg'
import Button1 from '../../components/buttons/Button1'
import Input from '../../components/input/Input'
import { AuthService } from '../../services/auth.service'
import { toast } from 'react-toastify'

const Auth: FC = () => {
  const [login, setLogin] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [errors, setErrors] = useState<{ login?: string; password?: string }>({})

  const validateForm = () => {
    const newErrors: { login?: string; password?: string } = {}

    if (!login) {
      newErrors.login = 'Email обязателен'
    } else if (!/^m.{7}@edu\.misis\.ru$/.test(login)) {
      newErrors.login = 'Логин должен соответствовать маске m*******@edu.misis.ru'
    }

    if (!password) {
      newErrors.password = 'Пароль обязателен'
    } else if (password.length < 6) {
      newErrors.password = 'Пароль должен быть не менее 6 символов'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    try {
      const data = await AuthService.login({ login, password })
      if (data && data.token) {
        localStorage.setItem('token', data.token)
        toast.success('Успешная аутентификация')
      } else {
        toast.error('Ошибка при аутентификации: токен не получен')
      }
    } catch (err: any) {
      const error = err.response?.data.message
      toast.error(error.toString())
    }
  }

  return (
    <div className='authContainer' style={{ backgroundImage: `url(${authBack})` }}>
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
              <form style={{ marginBottom: '20px' }} onSubmit={submit}>
                <label>логин</label>
                <Input
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder='Введите email'
                  name='email'
                  value={login}
                />
                {errors.login && <div className='error'>{errors.login}</div>}
                <label style={{ marginTop: '36px' }}>пароль</label>
                <Input
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  placeholder='Введите пароль'
                  name='password'
                  value={password}
                />
                {errors.password && <div className='error'>{errors.password}</div>}
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