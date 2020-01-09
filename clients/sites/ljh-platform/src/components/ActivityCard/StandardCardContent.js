import { CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@material-ui/icons/ExpandLessOutlined';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styles from './styles';
import withStyles from '@material-ui/core/styles/withStyles';

const StandardCardContent = ({ classes, content, media, cardIn, handleContent, expandCard }) => {

  const cardContentHandler = (text) => {
    var maxLength = 100;
    var newStr = text.substring(0, maxLength);
    var removedStr = text.substring(maxLength, text.length);
    //onMouseLeave={hideExtraText}
    return (<p>
      {newStr}
      <span style={expandCard ? { display: "none" } : { display: "inline" }} onClick={handleContent}><b> . . . </b><ExpandMoreOutlinedIcon className={classes.contentToggleBtns} /></span>
      <span style={expandCard ? { display: "inline" } : { display: "none" }} >{removedStr}
        <ExpandLessOutlinedIcon className={classes.contentToggleBtns} style={{ float: "right" }} onClick={handleContent} />
      </span>
    </p>);
  }

  const TextWithValue = ({ text, value }) => (
    <Grid className={classes.textWithValueContent} alignItems="center" container spacing={0}>
      <Grid item xs={4}>
        <Typography classes={{ root: classes.textWithValueContentValue }}>{value}</Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography classes={{ root: classes.textWithValueContentText }}>{text}</Typography>
      </Grid>
    </Grid>
  );

  const Paragraph = ({ text }) => (
    <Grid className={classes.paragraphText} container>
      <Typography variant="body2" component="div">
        {(cardIn === "actions" && window.screen.width >= 960) ?
          (text && text.length > 130) ? cardContentHandler(text) : (text ? (<p>{text.replace(/\\n/g, '\n')}</p>) : '')
          :
          text && text.replace(/\\n/g, '\n')
        }
        {/* {(text && text.length > 100) ? cardContentHandler(text) : (text ? (<p>{text.replace(/\\n/g, '\n')}</p>) : '')}
        {text && text.replace(/\\n/g, '\n')} */}
      </Typography>
    </Grid>
  );

  const EventText = ({ text, value }) => (
    <Grid className={classes.eventContent} container>
      <Grid item xs={12}>
        <Typography className={classes.eventText} variant="overline" component="p">
          {text}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes.eventValue} variant="caption" component="p">
          {value}
        </Typography>
      </Grid>
    </Grid>
  );

  const cardContent =
    content &&
    content.map((data, index) => {
      switch (data.variant) {
        case 'text_with_value':
          return <TextWithValue key={`${data.id}-${index}`} {...data} />;
        case 'paragraph':
          return <Paragraph key={`${data.id}-${index}`} {...data} />;
        case 'event_text':
          return <EventText key={`${data.id}-${index}`} {...data} />;
        default:
          return null;
      }
    });

  const imageUrl = media && media.url;
  return (
    <React.Fragment>
      {imageUrl && <CardMedia className={classes.cardMedia} image={imageUrl} />}
      <CardContent className={classes.cardCopy} >
        <Grid container>{cardContent}</Grid>
      </CardContent>
    </React.Fragment>
  );
};

StandardCardContent.propTypes = {
  classes: PropTypes.object,
  content: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      variant: PropTypes.string
    })
  ),
  media: PropTypes.shape({
    url: PropTypes.string,
    variant: PropTypes.string
  })
};

export default withStyles(styles)(StandardCardContent);
