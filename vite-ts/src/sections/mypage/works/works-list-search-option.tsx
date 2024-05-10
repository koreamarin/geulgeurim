import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

type Props = {
  searchOption: string;
  onOption: (newValue: string) => void;
  searchOptionOptions: {
    value: string;
    label: string;
  }[];
};

export default function WorksListSearchOption({ searchOption, onOption, searchOptionOptions }: Props) {
  const popover = usePopover();

  const sortLabel = searchOptionOptions.find((option) => option.value === searchOption)?.label;

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        onClick={popover.onOpen}
        endIcon={
          <Iconify
            icon={popover.open ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        }
        sx={{ fontWeight: 'fontWeightSemiBold' }}
      >
        <Box component="span" sx={{ ml: 0.5, fontWeight: 'fontWeightBold', whiteSpace: 'nowrap' }}>
          {sortLabel}
        </Box>
      </Button>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 140 }}>
        {searchOptionOptions.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === searchOption}
            onClick={() => {
              popover.onClose();
              onOption(option.value);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
