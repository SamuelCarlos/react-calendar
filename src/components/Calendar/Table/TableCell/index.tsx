import { useRef, useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  Popover,
  ClickAwayListener
} from '@mui/material'
import { DayData } from '..'
import PopoverContent from './PopoverContent'

import * as S from './styles'

interface TableCellProps {
  data: DayData
  selected?: boolean
  handleSelect: (date: Date) => void
}

export default function TableCell({
  data,
  selected,
  handleSelect
}: TableCellProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const anchorEl = useRef<HTMLButtonElement | null>(null)

  const { date, reminders } = data

  const id = isPopoverOpen ? 'popover' : undefined

  return (
    <S.Button
      ref={anchorEl}
      aria-describedby={id}
      onClick={(e) => {
        if (!selected) handleSelect(data.date)
        if (selected) setIsPopoverOpen(true)
      }}
      disabled={isPopoverOpen}
      data-testid="table-cell"
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        height="100%"
        width="100%"
        paddingBottom="10px"
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          justifySelf="flex-start"
          margin="5px 0 0 5px"
        >
          <Typography variant="h6">{date.getDate()}</Typography>
        </Stack>
        {reminders && (
          <Box
            className="reminders-box"
            overflow="hidden"
            maxHeight="70px"
            height="100%"
            margin="0"
          >
            {reminders.map((reminder) => {
              return (
                <Stack
                  key={reminder.id}
                  bgcolor={reminder.color}
                  margin="1px 0"
                  padding="1px 3px 1px 3px"
                  boxShadow="1px 1px 1px rgba(0,0,0, 0.1)"
                  overflow="auto"
                  direction="row"
                  justifyContent="flex-start"
                >
                  <Typography
                    variant="caption"
                    max-width="100%"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    fontSize="0.85rem"
                    fontWeight={100}
                  >
                    {`${new Date(reminder.date)
                      .getHours()
                      .toString()
                      .padStart(2, '0')}:${new Date(reminder.date)
                      .getMinutes()
                      .toString()
                      .padStart(2, '0')} - `}
                    {reminder.text}
                  </Typography>
                </Stack>
              )
            })}
          </Box>
        )}
        <ClickAwayListener
          onClickAway={() => {
            if (!isPopoverOpen) {
              setIsPopoverOpen(false)
            }
          }}
        >
          <Popover
            id={id}
            open={isPopoverOpen}
            anchorEl={anchorEl.current}
            onClose={() => setIsPopoverOpen(false)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            disablePortal
            sx={{ maxHeight: '350px' }}
          >
            <PopoverContent reminders={reminders} selectedDay={date} />
          </Popover>
        </ClickAwayListener>
      </Box>
    </S.Button>
  )
}
