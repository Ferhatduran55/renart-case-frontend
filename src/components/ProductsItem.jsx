import { onMount, createSignal } from "solid-js";
import styles from "./ProductsItem.module.css";
import ProductPopularityScore from "./ProductPopularityScore";

const productVariants = [
  {
    name: "yellow",
    label: "Yellow Gold",
    color: "#E6CA97",
  },
  {
    name: "white",
    label: "White Gold",
    color: "#D9D9D9",
  },
  {
    name: "rose",
    label: "Rose Gold",
    color: "#E1A4A9",
  },
];

function ProductVariants(props) {
  return () => {
    if (!props.images) {
      return <div class={styles.imagePlaceholder}>-</div>;
    }

    return productVariants
      .map((variant, index) => {
        const image =
          props.images[variant.name] ||
          props.images[
            Object.keys(props.images).find((key) =>
              key.toLowerCase().includes(variant.name)
            )
          ];

        if (!image) return null;

        return (
          <div
            class={`${styles.changeVariant} ${
              props.activeIndex() === index ? styles.active : ""
            }`}
            key={variant.name}
            data-variant-index={index}
            style={{ backgroundColor: variant.color }}
            title={variant.label}
            onClick={() => props.onVariantChange?.(image, variant.label, index)}
          ></div>
        );
      })
      .filter(Boolean);
  };
}

function ProductsItem(props) {
  const [productImage, setProductImage] = createSignal(null);
  const [productVariant, setProductVariant] = createSignal(null);
  const [activeVariantIndex, setActiveVariantIndex] = createSignal(0);

  const product = Object.assign({}, Object.values(props)[0]);

  onMount(() => {
    if (product.images) {
      const firstVariant = productVariants[0];

      const defaultImage =
        product.images[firstVariant.name] ||
        product.images[
          Object.keys(product.images).find((key) =>
            key.toLowerCase().includes(firstVariant.name)
          )
        ] ||
        Object.values(product.images)[0];

      setProductImage(defaultImage);
      setProductVariant(firstVariant.label);
      setActiveVariantIndex(0);
    }
  });

  const handleVariantChange = (newImage, variantLabel, variantIndex) => {
    setProductImage(newImage);
    setProductVariant(variantLabel);
    setActiveVariantIndex(variantIndex);
  };

  return (
    <div class={styles.productItem} key={product.id}>
      <div class={styles.imageContainer}>
        {productImage() ? (
          <img src={productImage()} alt={product.name} />
        ) : (
          <div class={styles.imagePlaceholder}>Image not found</div>
        )}
      </div>
      <div class={styles.detailsContainer}>
        <div class={styles.productName}>{product.name}</div>
        <div class={styles.priceContainer}>
          {product.price ? `$${parseFloat(product.price).toFixed(2)} USD` : "-"}
        </div>
        {product.images && (
          <div class={styles.variantsContainer}>
            <ProductVariants
              images={product.images}
              onVariantChange={handleVariantChange}
              activeIndex={activeVariantIndex}
            />
          </div>
        )}
        {productVariant() && (
          <div class={styles.variantLabel}>{productVariant()}</div>
        )}
        {product.popularityScore && (
          <div class={styles.productRatingContainer}>
            <ProductPopularityScore score={product.popularityScore} />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductsItem;
