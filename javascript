import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      // User State
      user: null,
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, cart: [] }),

      // Cart State
      cart: [],
      
      addToCart: (product) => {
        const cart = get().cart
        const existingItem = cart.find(item => item.id === product.id)
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          set({ cart: [...cart, { ...product, quantity: 1 }] })
        }
      },

      removeFromCart: (productId) => {
        set({ cart: get().cart.filter(item => item.id !== productId) })
      },

      updateQuantity: (productId, quantity) => {
        if (quantity === 0) {
          get().removeFromCart(productId)
        } else {
          set({
            cart: get().cart.map(item =>
              item.id === productId ? { ...item, quantity } : item
            )
          })
        }
      },

      clearCart: () => set({ cart: [] }),

      getCartTotal: () => {
        return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0)
      }
    }),
    {
      name: 'electromart-storage'
    }
  )
)
