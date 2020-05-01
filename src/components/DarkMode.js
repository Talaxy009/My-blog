import React from 'react'
import clsx from 'clsx'
import useDarkMode from 'use-dark-mode'
import { makeStyles } from '@material-ui/core/styles'
import Sun from '@material-ui/icons/WbSunnyRounded'
import Moon from '@material-ui/icons/Brightness2Rounded'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles({
  turnOn:{
    display:'none',
  },
  turnOff:{
    display:'block',
  }
});

const DarkMode = () => {
  const darkMode = useDarkMode(false);
  const classes = useStyles();

  return (
    <div>
      <IconButton
      type="button"
      onClick={darkMode.enable}
      className={
        clsx({[classes.turnOff]:!darkMode.value , [classes.turnOn]: darkMode.value})
      }
      >
        <Sun style={{ color: '#ff9800' }}/>
      </IconButton>
      <IconButton
      type="button"
      onClick={darkMode.disable}
      className={
        clsx({[classes.turnOn]:!darkMode.value , [classes.turnOff]: darkMode.value})
      }
      >
        <Moon style={{ color:'#ffb74d' }}/>
      </IconButton>
    </div>
  );
};

export default DarkMode;