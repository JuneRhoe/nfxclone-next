import MuiModal, { ModalProps as MuiModalProps } from '@mui/material/Modal'

export type ModalProps = MuiModalProps

export default function Modal({ ...props }: ModalProps) {
  return (
    <MuiModal {...props} disableAutoFocus>
      {props.children}
    </MuiModal>
  )
}
