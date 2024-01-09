import { clsx } from 'clsx';

export const Button = ({label,type="button",onClick, style= '',isDisable = true }) => {
    clsx('foo', true && 'bar', 'baz');


    const btn_empty = "px-10 py-1 rounded-lg border-blue-600 border-2 bg-[#11235A] font-normal text-white  ${style}"
    const btn_default = "x-10 py-1 rounded-lg border-blue-600 font-normal  text-white bg-slate-300 text-slate-600 text-bold px-10 bg-red"
    return (
        <button 
     
        disabled={isDisable}
        onClick={onClick} type={type} 
        className={clsx({ 'btn-empty': isDisable, 'btn-default': !isDisable })}>{label}</button>
    )
}