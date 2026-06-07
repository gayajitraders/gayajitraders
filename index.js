import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import Navbar from '../components/Navbar'
import ProductCard from '../components/ProductCard'
import { Zap, Package, Truck, Shield } from 'lucide-react'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error) {
      setProducts(data)
    }
    setLoading(false)
  }

  const categories = ['All', 'Electronics', 'Kitchen', 'Home']
  
  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory)

  return (
    <>
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content animate-in">
          <h1>
            <span className="gradient-text">PREMIUM</span> ELECTRONICS
            <br />
            <span style={{ color: 'var(--white)' }}>AT YOUR DOORSTEP</span>
          </h1>
          <p>Discover the latest gadgets, appliances & electronics with unbeatable deals</p>
          <button className="btn-primary">Shop Now</button>
        </div>
        <div className="hero-image animate-in-2">
          <div className="floating-card card-1"></div>
          <div className="floating-card card-2"></div>
          <div className="floating-card card-3"></div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature animate-in-1">
          <Zap size={32} />
          <h3>Flash Deals</h3>
          <p>Limited time offers</p>
        </div>
        <div className="feature animate-in-2">
          <Truck size={32} />
          <h3>Free Delivery</h3>
          <p>On orders above ₹499</p>
        </div>
        <div className="feature animate-in-3">
          <Shield size={32} />
          <h3>Secure Payment</h3>
          <p>100% safe & secure</p>
        </div>
        <div className="feature animate-in-4">
          <Package size={32} />
          <h3>Easy Returns</h3>
          <p>7-day return policy</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="category-filter">
        {categories.map(cat => (
          <button
            key={cat}
            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Products Grid */}
      <section className="products-section">
        <div className="products-grid">
          {loading ? (
            [...Array(6)].map((_, i) => (
              <div key={i} className="skeleton" style={{ height: '400px' }}></div>
            ))
          ) : (
            filteredProducts.map((product, index) => (
              <div key={product.id} className={`animate-in-${(index % 4) + 1}`}>
                <ProductCard product={product} />
              </div>
            ))
          )}
        </div>
      </section>

      <style jsx>{`
        .hero {
          max-width: 1400px;
          margin: 60px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          min-height: 600px;
        }

        .hero-content h1 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 72px;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: 2px;
        }

        .hero-content p {
          font-size: 20px;
          color: var(--silver);
          margin-bottom: 32px;
          max-width: 500px;
        }

        .hero-image {
          position: relative;
          height: 500px;
        }

        .floating-card {
          position: absolute;
          background: linear-gradient(135deg, var(--crimson), #FF1744);
          border-radius: 20px;
          animation: float 6s ease-in-out infinite;
        }

        .card-1 {
          width: 200px;
          height: 200px;
          top: 0;
          right: 100px;
        }

        .card-2 {
          width: 250px;
          height: 250px;
          top: 150px;
          right: 0;
          animation-delay: 2s;
        }

        .card-3 {
          width: 180px;
          height: 180px;
          bottom: 0;
          right: 150px;
          animation-delay: 4s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .features {
          max-width: 1400px;
          margin: 80px auto;
          padding: 0 24px;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .feature {
          background: var(--charcoal);
          padding: 32px;
          border-radius: 16px;
          text-align: center;
          border: 1px solid rgba(220, 20, 60, 0.2);
          transition: all 0.3s;
        }

        .feature:hover {
          border-color: var(--crimson);
          transform: translateY(-8px);
        }

        .feature :global(svg) {
          color: var(--crimson);
          margin-bottom: 16px;
        }

        .feature h3 {
          font-size: 20px;
          margin-bottom: 8px;
        }

        .feature p {
          color: var(--silver);
          font-size: 14px;
        }

        .category-filter {
          max-width: 1400px;
          margin: 60px auto 40px;
          padding: 0 24px;
          display: flex;
          gap: 16px;
          overflow-x: auto;
        }

        .category-btn {
          background: var(--steel);
          color: var(--white);
          border: 2px solid transparent;
          padding: 12px 32px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
          white-space: nowrap;
        }

        .category-btn.active {
          background: var(--crimson);
          border-color: var(--crimson);
        }

        .category-btn:hover {
          border-color: var(--crimson);
        }

        .products-section {
          max-width: 1400px;
          margin: 0 auto 80px;
          padding: 0 24px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .hero {
            grid-template-columns: 1fr;
            text-align: center;
          }

          .hero-content h1 {
            font-size: 56px;
          }

          .hero-image {
            display: none;
          }

          .features {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-content h1 {
            font-size: 42px;
          }

          .features {
            grid-template-columns: 1fr;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  )
    }
