import { useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "../components/FeaturedProducts";

const AllProducts = ({ allProducts, loading }) => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          All Products
        </h2>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover our complete collection of eco-friendly fashion
        </p>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
          </div>
        ) : allProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allProducts.map((product) => (
              <div
                key={product._id}
                className="bg-gray-900 bg-opacity-10 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl border border-emerald-500/30"
              >
                <div className="overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-white">
                    {product.name}
                  </h3>
                  <p className="text-emerald-300 font-medium mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center">
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-300">No products available</p>
          </div>
        )}
      </div>
    </div>
  );
};

const HomePage = () => {
  const {
    fetchFeaturedProducts,
    fetchAllProducts,
    products,
    allProducts,
    isLoading,
    loading,
  } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
    fetchAllProducts();
  }, [fetchFeaturedProducts, fetchAllProducts]);

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Explore Our Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>

        {!isLoading && products.length > 0 && (
          <FeaturedProducts featuredProducts={products} />
        )}

        <AllProducts allProducts={allProducts} loading={loading} />
      </div>
    </div>
  );
};
export default HomePage;
