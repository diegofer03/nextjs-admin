import { XCircleIcon } from '@heroicons/react/24/outline'
// import { MouseEventHandler } from 'react'

// interface alertType {
//   alert: object
//   handleClose: MouseEventHandler
// }

const Alert = ({ alert, handleClose }: any) => {
  if (alert && alert.autoClose) {
    setTimeout(() => {
      handleClose()
    }, 5000)
  }
  const color = alert.type === 'success' ? 'green-100' : 'red-100'
  return (
    <>
      {alert?.active && (
        <div x-data className={`bg-${color} p-5 w-full rounded mb-8`}>
          <div className="flex space-x-3">
            <div className="flex-1 leading-tight text-sm text-black font-medium">
              {alert.message}
            </div>
            <button type="button">
              <XCircleIcon className="w-6 h-6 text-gray-600" onClick={handleClose} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Alert
