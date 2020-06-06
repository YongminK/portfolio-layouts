import React from "react";
import {Card, CardContent, Typography, Grid} from "@material-ui/core";
import styles from './Cards.module.css';
import CountUp from "react-countup";
import cx from 'classnames'
const Cards = ({data: {confirmed, recovered, deaths, lastUpdate}}) => {
    if(!confirmed) return 'Loading...'
    const CARDS = [
        {
            title: 'infected',
            data: <CountUp start={0} end={confirmed.value} duration={2.5} separator=','/>,
            date: new Date(lastUpdate).toDateString(),
            number: 'Number of infected from COVID-19'
        },
        {
            title: 'recovered',
            data: <CountUp start={0} end={recovered.value} duration={2.5} separator=','/>,
            date: new Date(lastUpdate).toDateString(),
            number: 'Number of recoveries from COVID-19'
        },
        {
            title: 'deaths',
            data: <CountUp start={0} end={deaths.value} duration={2.5} separator=','/>,
            date: new Date(lastUpdate).toDateString(),
            number: 'Number of deaths caused by COVID-19'
        }
    ]
    return (
        <div className={styles.container}>
            <Grid container spacing={3} justify='center'>
                {
                    CARDS.map((item, index) =>
                        <Grid item component={Card} xs={12} md={3} className={cx(styles.card, styles[item.title])} key={`card-${index}`}>
                            <CardContent>
                                <Typography color="textSecondary" gutterBottom>{item.title}</Typography>
                                <Typography variant='h5'>{item.data}</Typography>
                                <Typography color="textSecondary">{item.date}</Typography>
                                <Typography variant='body2'>{item.number}</Typography>
                            </CardContent>
                        </Grid>
                    )
                }
            </Grid>
        </div>
    )
}

export default Cards;