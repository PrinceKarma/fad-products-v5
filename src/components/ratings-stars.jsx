import React from "react";
import { Star, StarHalf } from 'phosphor-react';

export const RatingStars = (props) => {
    const rating = props.rating;

    return (
        <span className="rating-stars">
            {
                [...Array(5)].map((_, i) => {
                    if (i < Math.floor(rating)) {
                        return (
                            <Star
                                key={i}
                                className="rating-star"
                                weight="fill"
                                color="#F6E05E"
                            />
                        );
                    } else if (rating - i > 0 && rating - i < 1) {
                        return (
                            <StarHalf
                                key={i}
                                className="rating-star"
                                weight="fill"
                                color="#F6E05E"
                            />
                        );
                    } else {
                        return (
                            <Star
                                key={i}
                                className="rating-star"
                                weight="fill"
                                color="#E2E8F0"
                            />
                        );
                    }
                })
            }
        </span>
    );
};
