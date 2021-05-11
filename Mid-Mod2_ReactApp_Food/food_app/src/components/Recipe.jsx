import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

class Recipe extends Component {
    render() {
        const {meal} = this.props;
        // console.log("Recipe.jsx ", meal)
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
            </Card>
        )
    }
}

export default Recipe;