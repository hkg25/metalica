import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  card: {
    width: 150,
    display: 'inline-block',
    margin: '0 2px',
  },
  pos: {
    marginBottom: 0,
    color: theme.palette.text.secondary,
  },
});

function MarketWidget(props) {
  const { classes } = props;
  let item = props.item;

  return (
    <span>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h3">
            {item.title}
          </Typography>
          <Typography className={classes.pos}>{item.price}</Typography>
        </CardContent>
      </Card>
    </span>
  );
}

MarketWidget.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MarketWidget);