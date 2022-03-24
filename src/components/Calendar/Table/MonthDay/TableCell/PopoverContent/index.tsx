import { useEffect, useState } from 'react'

import { Reminder } from 'redux/calendar-slice'
import ReminderForm from './ReminderForm'

import ReminderList from './ReminderList'

interface PopoverContentProps {
  selectedDay: Date
  reminders?: Reminder[]
}

export type PopoverOptions = 'list' | 'form'

export default function PopoverContent({
  selectedDay,
  reminders
}: PopoverContentProps) {
  const [content, setContent] = useState<PopoverOptions>('list')
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(
    null
  )

  const handleChangeContent = (option: PopoverOptions) => {
    setContent(option)
  }

  const handleSelectReminder = (reminder: Reminder | null) => {
    setSelectedReminder(reminder)

    if (reminder !== null) {
      handleChangeContent('form')
    }
  }

  useEffect(() => {
    if (content === 'list') handleSelectReminder(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  if (content === 'form')
    return (
      <ReminderForm
        reminder={selectedReminder || undefined}
        selectedDay={selectedDay}
        handleClose={() => handleChangeContent('list')}
      />
    )

  return (
    <ReminderList
      reminders={reminders}
      handleSelectReminder={(reminder) => handleSelectReminder(reminder)}
      handleChangeContent={(content) => handleChangeContent(content)}
    />
  )
}
