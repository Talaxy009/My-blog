import React from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import Image from 'gatsby-image'
import CardContent from '@material-ui/core/CardContent'
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const ExpansionPanel = withStyles({
    root: {
        boxShadow: 'none',
        '&:before': {
            display: 'none',
        },
    },
    expanded: {
        '&$expanded': {
            margin: 0,
        }
    }
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
    root: {
        minHeight: '64px',
    },
})(MuiExpansionPanelSummary);

const Music = ({ musicImages = [], props = [], data = [] }) =>{
    return (
        <div className="cardlist">
            {data.site.siteMetadata.musiclist.map(music => {
                const image = musicImages.find(v =>
                    new RegExp(music.image).test(v.relativePath)
                )
                return(
                    <div className="music-card" key={music.name}>
                        <Card style={{ transition: 'background-color 0.3s ease', color:'inherit'}}>
                            <Image
                                alt={props.alt}
                                fluid={image.childImageSharp.fluid}
                                style={{
                                    flex: 1,
                                    margin: '0.9rem auto',
                                    maxWidth: '90%',
                                    borderRadius: '100%',
                                }}
                                imgStyle={{
                                    borderRadius: '50%',
                                }}
                            />
                        <CardContent>
                            <Typography variant="body1" component="p">
                                专辑：{music.name}
                            </Typography>
                            <Typography variant="body1" component="p">
                                乐队：{music.band}
                            </Typography>
                            <Typography variant="body1" component="p">
                                发行日期：{music.time}
                            </Typography>
                        </CardContent>
                        <ExpansionPanel style={{backgroundColor:'inherit', color:'inherit'}}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon style={{color:'#8f8f8f'}}/>}
                                id={music.image}
                            >
                            </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <Typography>
                                        {music.description}
                                    </Typography>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                    </Card>
                    </div>
                )
            })}
        </div>
    )
}
export default Music