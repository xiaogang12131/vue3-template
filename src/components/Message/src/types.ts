export interface MessageProps {
  id?: string
  center?: boolean
  offset?: number
  duration?: number
  message?: string
  showClose?: boolean
  type?: 'success' | 'warning' | 'info' | 'error' | ''
}

export type MessageOptions = MessageProps | string

export interface MessageFn {
  (options?: MessageOptions): void
  error: (options?: MessageOptions) => void
}
