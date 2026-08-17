import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, onSnapshot } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from '../context/AuthContext'
import './LoveAlarm.css'

export function LoveAlarm() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [ringing, setRinging] = useState(false)
  const currentCountRef = useRef(0)

  useEffect(() => {
    if (!user) return

    const q = query(collection(db, 'declarations'), where('recipientId', '==', user.uid))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const currentCount = snapshot.size
      currentCountRef.current = currentCount
      
      const savedCount = parseInt(localStorage.getItem(`love_alarm_${user.uid}`) || '0', 10)
      
      if (currentCount > savedCount) {
        setRinging(true)
      }
    })

    return () => unsubscribe()
  }, [user])

  if (!user) return null

  const triggerExplosion = (x, y) => {
    for (let i = 0; i < 15; i++) {
      const spark = document.createElement('div')
      
      // Inline styles for guaranteed rendering independently of CSS classes
      spark.style.position = 'fixed'
      spark.style.left = `${x}px`
      spark.style.top = `${y}px`
      spark.style.width = '16px'
      spark.style.height = '16px'
      spark.style.pointerEvents = 'none'
      spark.style.zIndex = '99999'
      spark.style.display = 'flex'
      spark.style.alignItems = 'center'
      spark.style.justifyContent = 'center'
      
      spark.innerHTML = `<svg width="100%" height="100%" viewBox="0 0 24 24" fill="#ef4444" stroke="none"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" /></svg>`
      
      document.body.appendChild(spark)

      const angle = Math.random() * Math.PI * 2
      const distance = 40 + Math.random() * 80
      const tx = Math.cos(angle) * distance
      const ty = Math.sin(angle) * distance
      
      // Native Web Animations API (bypasses any CSS stylesheet issues)
      const animation = spark.animate([
        { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
        { opacity: 1, offset: 0.5 },
        { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5) rotate(${Math.random() * 90 - 45}deg)`, opacity: 0 }
      ], {
        duration: 800 + Math.random() * 300, // 800ms to 1100ms
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
        fill: 'forwards'
      })

      animation.onfinish = () => {
        if (document.body.contains(spark)) {
          document.body.removeChild(spark)
        }
      }
    }
  }

  const handleClick = (e) => {
    if (ringing) {
      const rect = e.currentTarget.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2
      
      triggerExplosion(x, y)
      setRinging(false)
      localStorage.setItem(`love_alarm_${user.uid}`, currentCountRef.current.toString())
      setTimeout(() => {
        navigate('/perfil')
      }, 900)
    } else {
      navigate('/perfil')
    }
  }

  return (
    <button 
      className={`love-alarm-btn ${ringing ? 'ringing' : ''}`}
      onClick={handleClick}
      aria-label="Love Alarm"
      title="Love Alarm"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {ringing && <span className="love-alarm-indicator"></span>}
    </button>
  )
}
