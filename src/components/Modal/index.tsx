import { colors } from '../../config/theme'
import { type HandleModal, type ModalIsOpenAndTitle } from '../../types/modal'
import XMarkIcon from '../Icons/XMarkIcon'
import Portal from '../Portal'

interface Props extends ModalIsOpenAndTitle {
  onClose: HandleModal
  children: React.ReactNode
}

const Modal: React.FC<Props> = ({ children, onClose, isOpen, title = '' }) => {
  return (
    <Portal elementID='modal'>
      {isOpen
        ? (
        <section className='fixed top-0 left-0 w-screen h-screen grid text-white px-4 py-16'>
          <article className='relative z-20 w-full max-h-full max-w-lg m-auto grid-rows-[auto_1fr] shadow-md shadow-primary overflow-auto bg-black'>
            <header className='sticky top-0 flex justify-between items-center text-2xl px-4 py-2 bg-primary '>
              <h2 className='text-black font-bold'>{title}</h2>
              <button
                type='button'
                className='text-center hover:invert'
                onClick={onClose}
              >
                <XMarkIcon fill={colors.black} className='p-1'/>
              </button>
            </header>
            <div className='px-4 py-8'>
              {children}
            </div>
          </article>
          <button
            type='button'
            onClick={onClose}
            className='absolute cursor-default top-0 left-0 w-screen h-screen bg-black opacity-75'
          />
        </section>
          )
        : null}
    </Portal>
  )
}

export default Modal
