import React from "react";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Image from "gatsby-image";
import Grow from "@material-ui/core/Grow";
import CardContent from "@material-ui/core/CardContent";
import MuiAccordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const Accordion = withStyles({
  root: {
    boxShadow: "none",
    "&:before": {
      display: "none"
    }
  },
  expanded: {
    "&$expanded": {
      margin: 0
    }
  }
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    minHeight: "64px"
  }
})(MuiAccordionSummary);

const Music = ({ musicImages = [], props = [], data = [] }) => {
  return (
    <div className="cardlist">
      {data.site.siteMetadata.musiclist.map(music => {
        const image = musicImages.find(v =>
          new RegExp(music.image).test(v.relativePath)
        );
        return (
          <div className="music-card" key={music.name}>
            <Grow in={true} {...{ timeout: 500 }}>
              <div>
                <Card
                  style={{
                    transition: "background-color 0.5s ease",
                    color: "inherit"
                  }}
                >
                  <Image
                    alt={props.alt}
                    fluid={image.childImageSharp.fluid}
                    style={{
                      flex: 1,
                      margin: "0.9rem auto",
                      maxWidth: "90%",
                      borderRadius: "100%"
                    }}
                    imgStyle={{
                      borderRadius: "50%"
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
                  <Accordion
                    style={{ backgroundColor: "inherit", color: "inherit" }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <ExpandMoreIcon style={{ color: "#8f8f8f" }} />
                      }
                      id={music.image}
                    ></AccordionSummary>
                    <AccordionDetails>
                      <Typography>{music.description}</Typography>
                    </AccordionDetails>
                  </Accordion>
                </Card>
              </div>
            </Grow>
          </div>
        );
      })}
    </div>
  );
};
export default Music;
