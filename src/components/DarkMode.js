import React from 'react'
import useDarkMode from 'use-dark-mode'
import Sun from '@material-ui/icons/WbSunnyRounded'
import Moon from '@material-ui/icons/Brightness2Rounded'
import IconButton from '@material-ui/core/IconButton'
const DarkMode = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <IconButton
      type="button"
      onClick={darkMode.value? (darkMode.disable) : (darkMode.enable) }
      >
        {
          darkMode.value?
          (<Moon style={{ color:'#ffb74d' }}/>):
          (<Sun style={{ color: '#ff9800' }}/>)
        }
      </IconButton>
    </div>
  );
};

export default DarkMode;
