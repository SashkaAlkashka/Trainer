import { FC } from 'react'
import './Registration.css'
import regBack from '../../image/regBack.svg'
import Input from '../../components/input/Input'
import Button1 from '../../components/buttons/Button1'

const Registration: FC = () => {
  return (
    <>
        <div className='regContainer' style={{backgroundImage: `url(${regBack})`}}>
            <div className='container'>
                <div className='row justify-content-center'>
                        <div className='col form'>
                            <div className='form-container'>
                                <form style={{marginBottom: '20px'}}>
                                    <div className='container'>
                                        <div className='row'>
                                        <div style={{marginRight: '50px'}} className='col'>
                                            <label>логин</label>
                                            <Input placeholder='Введите email' name='email'></Input>
                                            <label style={{marginTop: '22px'}}>пароль</label>
                                            <Input placeholder='Введите пароль' name='password'></Input>
                                            <label style={{marginTop: '22px'}}>повторите пароль</label>
                                            <Input placeholder='Повторите пароль' name='password'></Input>
                                        </div>
                                        <div className='col right-column'>
                                            <label>поток</label>
                                            <Input placeholder='Введите номер курса' name='email'></Input>
                                            <label style={{marginTop: '22px'}}>группа</label>
                                            <Input placeholder='Введите поток (БИВТ)' name='email'></Input>
                                            <label style={{marginTop: '22px'}}>группа</label>
                                            <Input placeholder='Введите номер группы' name='email'></Input>
                                        </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <Button1 className='sigh-up'>зарегистрироваться</Button1>
                            <div className='button-container'>
                                <Button1 className='back'>Назад</Button1>
                                <p className='waring'>Такой группы не существует</p>
                                <div className='space'/>
                            </div>
                        </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Registration
