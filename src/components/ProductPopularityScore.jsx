import styles from "./ProductPopularityScore.module.css";
import Rating from "solid-rating";

function ProductPopularityScore({ score }) {
  const starRating = Math.max(1, Math.min(5, score * 5));
  
  return (
    <div class={styles.ratingContainer}>
      <Rating
        maxRating={5}
        size={18}
        initialRating={starRating}
        color="#d8d8d8"
        activeColor="#f6d4a8"
        readOnly={true}
      />
      <span class={styles.ratingText}>{starRating.toFixed(1)}/5</span>
    </div>
  );
}

export default ProductPopularityScore;
