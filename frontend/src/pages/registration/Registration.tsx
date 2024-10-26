import { FC, useState } from 'react'
import './Registration.css'
import regBack from '../../image/regBack.svg'
import Input from '../../components/input/Input'
import Button1 from '../../components/buttons/Button1'
import { AuthService } from '../../services/auth.service'
import { toast } from 'react-toastify'

const Registration: FC = () => {
    const [login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [name, setName] = useState<string>('')
    const [class_, setClass] = useState<string>('')
    const [repeatPassword, setRepeatPassword] = useState<string>('')
    const [errors, setErrors] = useState<{ login?: string; password?: string; name?: string; class_?: string }>({})

    const validateForm = () => {
        const newErrors: { login?: string; password?: string; name?: string; class_?: string; repeatPassword?: string} = {}

        if (!login) {
            newErrors.login = 'Логин обязателен'
        } else if (!/^m.{7}@edu\.misis\.ru$/.test(login)) {
            newErrors.login = 'Логин должен соответствовать маске m*******@edu.misis.ru'
        }

        if (!password) {
            newErrors.password = 'Пароль обязателен'
        } else if (password.length < 6) {
            newErrors.password = 'Пароль должен быть не менее 6 символов'
        }

        if (!name) {
            newErrors.name = 'Имя обязательно'
        }

        if (!class_) {
            newErrors.class_ = 'Группа обязательна'
        }

        if(!repeatPassword) {
            newErrors.repeatPassword = 'Обязательно повторите пароль'
        } else if(repeatPassword != password) {
            newErrors.repeatPassword = 'Пароли не совпадают'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        try {
            const data = await AuthService.registration({ login, password, name, class_ })
            if (data && data.token) {
                localStorage.setItem('token', data.token)
                toast.success('Аккаунт создан')
            } else {
                toast.error('Ошибка при регистрации: токен не получен')
            }
        } catch (err: any) {
            const error = err.response?.data.message
            toast.error(error.toString())
        }
    }

    return (
        <>
            <div className='regContainer' style={{ backgroundImage: `url(${regBack})` }}>
                <div className='container'>
                    <div className='row justify-content-center'>
                        <div className='col form'>
                            <div className='form-container'>
                                <form onSubmit={registrationHandler} style={{ marginBottom: '20px' }}>
                                    <div className='container'>
                                        <div className='row'>
                                            <div style={{ marginRight: '50px' }} className='col'>
                                                <label>логин</label>
                                                <Input
                                                    placeholder='Введите email'
                                                    name='login'
                                                    onChange={(e) => setLogin(e.target.value)}
                                                    value={login}
                                                ></Input>
                                                <label style={{ marginTop: '22px' }}>пароль</label>
                                                <Input
                                                    placeholder='Введите пароль'
                                                    name='password'
                                                    type='password'
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    value={password}
                                                ></Input>
                                                <label style={{ marginTop: '22px' }}>повторите пароль</label>
                                                <Input 
                                                    placeholder='Повторите пароль' 
                                                    name='password'
                                                    value={repeatPassword}
                                                    type='password'
                                                    onChange={(e) => setRepeatPassword(e.target.value)}
                                                    ></Input>
                                            </div>
                                            <div className='col right-column'>
                                                <label>Имя</label>
                                                <Input placeholder='Имя' name='name'
                                                    onChange={(e) => setName(e.target.value)}
                                                    value={name}
                                                ></Input>
                                                <label style={{ marginTop: '22px' }}>Группа</label>
                                                <Input
                                                    placeholder='Введите группу'
                                                    name='class'
                                                    onChange={(e) => setClass(e.target.value)}
                                                    value={class_}
                                                ></Input>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='sigh-up-container'><Button1 className='sigh-up'>ЗАРЕГИСТРИРОВАТЬСЯ</Button1></div>
                                </form>
                            </div>

                            <div className='button-container'>
                                <Button1 className='back'>Назад</Button1>
                                {Object.keys(errors).length > 0 && (
                                <p className='waring'>
                                    {Object.values(errors).map((error, index) => (
                                        <span key={index}>{error}<br /></span>
                                    ))}
                                </p>
                                )}
                                <div className='space' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Registration