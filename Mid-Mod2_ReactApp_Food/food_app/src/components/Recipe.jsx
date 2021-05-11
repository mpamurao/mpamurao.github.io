import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';
import Grid from '@material-ui/core/Grid';





class Recipe extends Component {

    render() {
        const {meal} = this.props;
       
        return(
       
            //  materialUI Card component
            <Card className="RecipeContainer" elevation={5} m={3}>
                {/* make card clickable */}
                <CardActionArea href={meal.url} target="_blank">
                    {/* info for card */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {meal.label}
                        </Typography>
                        

                        
                        <Typography gutterBottom variant="subtitle2" component="h2">
                        <div className="cuisineType">
                            {meal.cuisineType[0].toUpperCase()}
                        </div>
                        <div className="mealType">
                            {meal.dishType[0].toUpperCase()}, {meal.mealType[0].toUpperCase()}
                        </div>

                        </Typography>
                    </CardContent>
                    {/* image */}
                    <CardMedia component="img" alt={meal.label} title={meal.label} src={meal.image} height="250"/>
                    

                </CardActionArea>
                                    
                {/* <a href={meal.url} target="_blank">{meal.label}</a>
               
                <a href={meal.url} target="_blank"><img src={meal.image} alt={meal.label} /></a> */}
            </Card>

          

        )
    }
}

export default Recipe;