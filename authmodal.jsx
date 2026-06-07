import { useState } from 'react'
import { X } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { useStore } from '../store/useStore'
import toast from 'react-hot-toast'

export default function AuthModal({ onClose }) {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [step, setStep] = useState('phone') // 'phone' or 'otp'
  const [loading, setLoading] = useState(false)
  const { setUser } = useStore()

  const sendOTP = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        phone: `+91${phone}`,
      })

      if (error) throw error

      toast.success('OTP sent to your phone!')
      setStep('otp')
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        phone: `+91${phone}`,
        token: otp,
        type: 'sms'
      })

      if (error) throw error

      setUser({ phone: `+91${phone}`, ...data.user })
      toast.success('Login successful!')
      onClose()
    } catch (error) {
      toast.error('Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-header">
          <h2>Welcome to <span className="gradient-text">ElectroMart</span></h2>
          <p>Login with OTP to continue</p>
        </div>

        {step === 'phone' ? (
          <form onSubmit={sendOTP} className="auth-form">
            <div className="form-group">
              <label>Phone Number</label>
              <div className="phone-input">
                <span className="country-code">+91</span>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  required
                  maxLength={10}
                />
              </div>
            </div>

            <button type="submit" className="btn-primary" disabled={loading || phone.length !== 10}>
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOTP} className="auth-form">
            <div className="form-group">
              <label>Enter OTP</label>
              <input
                type="text"
                placeholder="6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                className="otp-input"
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading || otp.length !== 6}>
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>

            <button type="button" className="btn-secondary" onClick={() => setStep('phone')}>
              Change Number
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: var(--charcoal);
          border: 1px solid rgba(220, 20, 60, 0.3);
          border-radius: 16px;
          padding: 40px;
          max-width: 450px;
          width: 90%;
          position: relative;
          animation: slideUp 0.3s ease-out;
        }

        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .close-btn {
          position: absolute;
          top: 16px;
          right: 16px;
          background: transparent;
          border: none;
          color: var(--silver);
          cursor: pointer;
          transition: color 0.3s;
        }

        .close-btn:hover {
          color: var(--crimson);
        }

        .modal-header {
          margin-bottom: 32px;
        }

        .modal-header h2 {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 32px;
          margin-bottom: 8px;
        }

        .modal-header p {
          color: var(--silver);
        }

        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          color: var(--silver);
          font-weight: 500;
          font-size: 14px;
        }

        .phone-input {
          display: flex;
          align-items: center;
          background: var(--steel);
          border-radius: 8px;
          overflow: hidden;
        }

        .country-code {
          padding: 14px 16px;
          background: rgba(220, 20, 60, 0.2);
          color: var(--crimson);
          font-weight: 600;
          border-right: 1px solid rgba(220, 20, 60, 0.3);
        }

        .phone-input input,
        .otp-input {
          flex: 1;
          padding: 14px 16px;
          background: var(--steel);
          border: none;
          color: var(--white);
          font-size: 16px;
          outline: none;
        }

        .otp-input {
          width: 100%;
          text-align: center;
          font-size: 24px;
          letter-spacing: 8px;
          font-family: 'Bebas Neue', sans-serif;
          border-radius: 8px;
        }

        button[disabled] {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  )
    }
