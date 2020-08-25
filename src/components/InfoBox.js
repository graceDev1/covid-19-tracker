import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import '../InfoBox.css';


function InfoBox({title, cases,active,isRed, total, ...props}) {
    return (
        <Card 
        onClick={props.onClick}
        className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                {/* title */}
                <Typography className="infoBox_title" color="textSecondary">
                    {title}
                </Typography>
                {/* +120k Number of cases  */}
                <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}` }> {cases} </h2>
                {/* +1.M Total */}
                <Typography className="info__total" color="textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox

