import styles from './App.module.css';
import ProductsCarousel from './components/ProductsCarousel';
import "../node_modules/solid-rating/dist/index.css";
import "solid-slider/slider.css";

function App() {
  return (
    <div class={styles.App}>
      <ProductsCarousel />
    </div>
  );
}

export default App;
