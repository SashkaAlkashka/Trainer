import { FC } from 'react'
import { ButtonProps1 } from './Button1.props'
import cn from 'classnames'
import styles from './Button.module.css'


const Button1: FC<ButtonProps1> = ({ className, children, ...props}) => {
  return (
    <button className={cn(styles['button-accent'], className)} {...props}>{children}</button>
  )
}

export default Button1
