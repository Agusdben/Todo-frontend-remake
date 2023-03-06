import React from 'react'
import { colors } from '../../config/theme'
import { type Modal as ModalType } from '../../types/modal'
import Button from '../Button'
import XMarkIcon from '../Icons/XMarkIcon'
import Modal from '../Modal'

interface Props {
  modal: ModalType
  descriptions: string[]
  type: string
  onDelete: () => void
  onCancel: () => void
}

const ModalDelete: React.FC<Props> = ({ modal, descriptions, type, onDelete, onCancel }) => {
  const handleOnDelete = (): void => {
    onDelete()
    onCancel()
  }

  return (
    <Modal isOpen={modal.isOpen} title={modal.title} onClose={modal.handleModal}>
      <div className='flex flex-col gap-5 text-xl'>
        <div className='text-7xl flex justify-center'>
          <XMarkIcon fill={colors.primary} className='p-2 border-1 rounded-full border-primary'/>
        </div>
        <div className='flex flex-col items-center gap-3'>
          <p className='text-center'>
            This action will delete{' '}
            <strong className='text-primary'>{descriptions.length}</strong>{' '}
            {type}{descriptions.length !== 1 ? 's' : ''}{' '}
            permanently.
          </p>
          <ul className='flex flex-col overflow-auto max-h-56 w-full max-w-xs bg-black-700 gap-3 px-2 scrollbar-thin scrollbar-thumb-primary scrollbar-track-black-700 scrollbar-thumb-rounded-sm'>
          {
            descriptions.map((desc, index) => (
              <li className='inline-block break-words p-1 max-w-full ' key={desc + index.toString()}>
                <span className='mr-2 text-primary font-bold  '>{index + 1}.</span>
                <span>{desc}</span>
              </li>
            ))
          }
          </ul>
        </div>
        <div className='flex gap-4 justify-center'>
          <Button type='button' onClick={onCancel}>Cancel</Button>
          <Button type='button' solid onClick={handleOnDelete}>Delete</Button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalDelete
