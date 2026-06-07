import { X, Minus, Plus, Trash2 } from 'lucide-react'
import { useStore } from '../store/useStore'
import { useRouter } from 'next/router'

export default function Cart({ onClose }) {
  const { cart, updateQuantity, removeFromCart, getCartTotal } = useStore()
  const router = useRouter()

  const handleCheckout = () => {
    onClose()
    router.push('/checkout')
  }

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-panel" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart ({cart.length})</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <button className="btn-secondary" onClick={onClose}>Continue Shopping</button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image_url} alt={item.name} />
                  
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                    
                    <div className="quantity-controls">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="item-actions">
                    <p className="item-total">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="total-section">
                <span>Total Amount:</span>
                <span className="total-amount">₹{getCartTotal().toLocaleString('en-IN')}</span>
              </div>
              <button className="btn-primary checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>

      <style jsx>{`
        .cart-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          z-index: 2000;
          animation: fadeIn 0.3s;
        }

        .cart-panel {
          position: fixed;
          right: 0;
          top: 0;
          height: 100%;
          width: 450px;
          max-width: 90%;
          background: var(--charcoal);
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          animation: slideInRight 0.3s ease-out;
        }

        .cart-header {
          padding: 24px;
          border-bottom: 1px solid rgba(220, 20, 60, 0.2);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          letter-spacing: 1px;
        }

        .close-btn {
          background: transparent;
          border: none;
          color: var(--silver);
          cursor: pointer;
          transition: color 0.3s;
        }

        .close-btn:hover {
          color: var(--crimson);
        }

        .empty-cart {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 24px;
          padding: 40px;
        }

        .empty-cart p {
          color: var(--silver);
          font-size: 18px;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 16px;
        }

        .cart-item {
          display: flex;
          gap: 16px;
          padding: 16px;
          background: var(--steel);
          border-radius: 12px;
          margin-bottom: 12px;
          transition: all 0.3s;
        }

        .cart-item:hover {
          background: rgba(45, 45, 45, 0.8);
        }

        .cart-item img {
          width: 80px;
          height: 80px;
          object-fit: cover;
          border-radius: 8px;
        }

        .item-details {
          flex: 1;
        }

        .item-details h3 {
          font-size: 16px;
          margin-bottom: 8px;
          color: var(--white);
        }

        .item-price {
          color: var(--crimson);
          font-weight: 600;
          margin-bottom: 12px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quantity-controls button {
          background: var(--charcoal);
          border: 1px solid rgba(220, 20, 60, 0.3);
          color: var(--white);
          width: 28px;
          height: 28px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s;
        }

        .quantity-controls button:hover {
          background: var(--crimson);
          border-color: var(--crimson);
        }

        .quantity-controls span {
          font-weight: 600;
          min-width: 30px;
          text-align: center;
        }

        .item-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: space-between;
        }

        .item-total {
          font-size: 18px;
          font-weight: 700;
          color: var(--white);
        }

        .remove-btn {
          background: transparent;
          border: none;
          color: var(--silver);
          cursor: pointer;
          transition: color 0.3s;
        }

        .remove-btn:hover {
          color: var(--crimson);
        }

        .cart-footer {
          padding: 24px;
          border-top: 1px solid rgba(220, 20, 60, 0.2);
          background: var(--steel);
        }

        .total-section {
          display: flex;
          justify-content: space-between;
          margin-bottom: 20px;
          font-size: 18px;
        }

        .total-amount {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          color: var(--crimson);
          letter-spacing: 1px;
        }

        .checkout-btn {
          width: 100%;
        }
      `}</style>
    </div>
  )
      }
