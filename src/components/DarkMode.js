import React from "react";
import useDarkMode from "use-dark-mode";
import Slide from "@material-ui/core/Slide"
import Sun from "@material-ui/icons/WbSunnyRounded";
import Moon from "@material-ui/icons/Brightness2Rounded";
import IconButton from "@material-ui/core/IconButton";
const DarkMode = () => {
  const darkMode = useDarkMode(false);

  return (
    <div>
      <IconButton
        type="button"
        onClick={darkMode.value ? darkMode.disable : darkMode.enable}
      >
        <Slide
          direction={darkMode.value ? "down" : "up"}
          in={darkMode.value}
          appear={false}
          {...{ timeout: 500 }}
          style={{ transitionDelay: darkMode.value ? '500ms' : '0ms' }}
          mountOnEnter
          unmountOnExit
        >
          <Moon style={{ position: "absolute", color: "#ffb74d" }} />
        </Slide>
        <Slide
          direction={darkMode.value ? "up" : "down"}
          in={!darkMode.value}
          appear={false}
          {...{ timeout: 500 }}
          style={{ transitionDelay: darkMode.value ? '0ms' : '500ms' }}
          mountOnEnter
          unmountOnExit
        >
          <Sun style={{ position: "absolute", color: "#ff9800" }} />
        </Slide>
      </IconButton>
    </div>
  );
};

export default DarkMode;
