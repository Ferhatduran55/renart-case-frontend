import ProductsItem from "./ProductsItem";
import { createSignal, onMount } from "solid-js";
import { createSlider } from "solid-slider";
import styles from "./ProductsCarousel.module.css";
import ILeftArrow from "../assets/Icons/ILeftArrow";
import IRightArrow from "../assets/Icons/IRightArrow";

function ProductsCarousel() {
  const [products, setProducts] = createSignal([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal(null);

  let sliderRef;

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (err) {
      setError(err.error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchProducts();
  });
  
  const sliderOptions = {
    loop: false,
    slides: { perView: 4, spacing: 100 },
    renderMode: "performance",
    breakpoints: {
      "(min-width: 0px)": {
        slides: { perView: 1, spacing: 1000, origin: "center" },
      },
      "(min-width: 600px)": {
        slides: { perView: 2, spacing: 25 },
      },
      "(min-width: 1200px)": {
        slides: { perView: 3, spacing: 75 },
      },
      "(min-width: 1400px)": {
        slides: { perView: 4, spacing: 100 },
      },
    },
  };

  const [slider, { current, next, prev, moveTo }] = createSlider(sliderOptions);

  return (
    <div class={styles.productsCarouselContainer}>
      <div class={styles.productListTitle}>Product List</div>
      {loading() && (
        <div class={""}>
          <p>Products are loading...</p>
        </div>
      )}

      {error() && (
        <div class={""}>
          <p>Error: {error()}</p>
          <button onClick={fetchProducts}>Try Again</button>
        </div>
      )}

      {!loading() && !error() && (
        <div class={styles.sliderContainer}>
          {products().length === 0 ? (
            <p>Products not found.</p>
          ) : (
            <>
              <button class={styles.sliderButton} onClick={() => prev()}>
                <ILeftArrow class={styles.sliderButtonIcon} />
              </button>

              <button class={styles.sliderButton} onClick={() => next()}>
                <IRightArrow class={styles.sliderButtonIcon} />
              </button>
              
              <div
                use:slider
                ref={sliderRef}
                classList={{ [styles.productsCarousel]: true }}
              >
                {products().map((product) => (
                  <ProductsItem props={{ ...product }} />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ProductsCarousel;
