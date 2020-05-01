import React, { useState } from 'react'
import { navigate } from 'gatsby'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#009ba1',
  },
})(props => <Tabs {...props} TabIndicatorProps={{ children: <div /> }} />);

const StyledTab = withStyles({
  root: {
    textTransform: 'none',
    color: 'inherit',
    '&:hover': {
      color: '#009ba1',
    },
    '&$selected': {
      color: '#009ba1',
    },
  },
  selected: {},
})(props => <Tab disableRipple {...props} />);

const RouterTabs = ({ routers = [], currentPage}) => {
  const [index] = useState(
    routers.findIndex(v => v.link === currentPage)
  )
  return (
    <StyledTabs value={index} onChange={(_, value) => navigate(routers[value].link)} centered>
      {routers.map(router => (
        <StyledTab label={router.name} key={router.link} />
      ))}
    </StyledTabs>
  )
}

export default RouterTabs