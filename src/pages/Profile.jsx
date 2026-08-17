import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, query, where, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import { useAuth } from '../context/AuthContext'
import { Button } from '../components/ui/Button'
import './Profile.css'

// SVGs minimalistas
const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)

const TrashIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
)

export function Profile() {
  const { user, userData } = useAuth()
  const navigate = useNavigate()

  const [sentCount, setSentCount] = useState(0)
  const [receivedCount, setReceivedCount] = useState(0)
  const [myConfessions, setMyConfessions] = useState([])
  const [receivedConfessions, setReceivedConfessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('sent') // 'sent' | 'received'

  // Edit state
  const [editingId, setEditingId] = useState(null)
  const [editBody, setEditBody] = useState('')
  const [editIsPublic, setEditIsPublic] = useState(true)

  useEffect(() => {
    // Si no está autenticado, redirigir
    if (!user) {
      navigate('/login')
      return
    }

    async function loadProfileData() {
      try {
        setLoading(true)

        // Fetch declaraciones enviadas por este usuario
        const sentQuery = query(collection(db, 'declarations'), where('authorId', '==', user.uid))
        const sentSnapshot = await getDocs(sentQuery)
        
        const confessionsData = sentSnapshot.docs.map(document => ({
          id: document.id,
          ...document.data()
        }))
        
        // Sort locally by createdAt desc since we didn't add an index
        confessionsData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis() || Date.now()
          const timeB = b.createdAt?.toMillis() || Date.now()
          return timeB - timeA
        })

        setSentCount(confessionsData.length)
        setMyConfessions(confessionsData)

        // Fetch declaraciones recibidas (donde recipientId === user.uid)
        const receivedQuery = query(collection(db, 'declarations'), where('recipientId', '==', user.uid))
        const receivedSnapshot = await getDocs(receivedQuery)
        
        const receivedData = receivedSnapshot.docs.map(document => ({
          id: document.id,
          ...document.data()
        }))

        receivedData.sort((a, b) => {
          const timeA = a.createdAt?.toMillis() || Date.now()
          const timeB = b.createdAt?.toMillis() || Date.now()
          return timeB - timeA
        })

        setReceivedCount(receivedData.length)
        setReceivedConfessions(receivedData)

      } catch (error) {
        console.error("Error loading profile data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadProfileData()
  }, [user, navigate])

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta confesión permanentemente?")) {
      try {
        await deleteDoc(doc(db, 'declarations', id))
        setMyConfessions(prev => prev.filter(c => c.id !== id))
        setSentCount(prev => prev - 1)
      } catch (error) {
        console.error("Error deleting document: ", error)
        alert("Hubo un error al eliminar la confesión.")
      }
    }
  }

  const startEditing = (conf) => {
    setEditingId(conf.id)
    setEditBody(conf.body)
    setEditIsPublic(conf.isPublic)
  }

  const cancelEditing = () => {
    setEditingId(null)
  }

  const saveEditing = async (id) => {
    try {
      const docRef = doc(db, 'declarations', id)
      await updateDoc(docRef, {
        body: editBody,
        isPublic: editIsPublic
      })
      
      setMyConfessions(prev => prev.map(c => {
        if (c.id === id) {
          return { ...c, body: editBody, isPublic: editIsPublic }
        }
        return c
      }))
      
      setEditingId(null)
    } catch (error) {
      console.error("Error updating document: ", error)
      alert("Hubo un error al actualizar la confesión.")
    }
  }

  if (loading) {
    return (
      <div className="profile container" style={{ textAlign: 'center', padding: '5rem' }}>
        <p>Cargando tu perfil...</p>
      </div>
    )
  }

  if (!user) return null // Se encarga el useEffect

  return (
    <div className="profile container">
      <div className="profile-header">
        <span className="badge badge-accent">👤 Tu perfil</span>
        <h2>{userData?.firstName} {userData?.lastName}</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>@{userData?.username}</p>
      </div>

      <div className="profile-stats">
        <div className="profile-stat-card">
          <span className="profile-stat-number">{sentCount}</span>
          <span className="profile-stat-label">Declaraciones Enviadas</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-number">{receivedCount}</span>
          <span className="profile-stat-label">Declaraciones Recibidas</span>
        </div>
      </div>

      <section className="profile-list-section">
        <div className="profile-tabs" style={{ display: 'flex', gap: '1rem', marginBottom: 'var(--space-xl)', borderBottom: '1px solid var(--color-border-soft)' }}>
          <button 
            onClick={() => setActiveTab('sent')}
            style={{ 
              background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
              fontSize: '1rem', fontWeight: '600',
              color: activeTab === 'sent' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'sent' ? '2px solid var(--color-primary)' : '2px solid transparent'
            }}
          >
            Mis Confesiones (Enviadas)
          </button>
          <button 
            onClick={() => setActiveTab('received')}
            style={{ 
              background: 'none', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer',
              fontSize: '1rem', fontWeight: '600',
              color: activeTab === 'received' ? 'var(--color-primary)' : 'var(--color-text-secondary)',
              borderBottom: activeTab === 'received' ? '2px solid var(--color-primary)' : '2px solid transparent'
            }}
          >
            Confesiones Recibidas
          </button>
        </div>

        {activeTab === 'sent' && (
          <>
            {myConfessions.length === 0 ? (
              <div className="feed-empty-state" style={{ padding: '3rem', textAlign: 'center', border: '1px dashed var(--color-border-soft)', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ margin: 0 }}>No has enviado ninguna confesión todavía.</p>
              </div>
            ) : (
              <div className="profile-grid">
                {myConfessions.map(conf => (
                  <div key={conf.id} className="profile-card">
                    <div className="profile-card-header">
                      <span>Para: <strong>{conf.recipientName || 'Alguien'}</strong></span>
                      <span>{conf.createdAt?.toDate().toLocaleDateString() || 'Reciente'}</span>
                    </div>
                    
                    {editingId === conf.id ? (
                      <div className="profile-edit-form">
                        <textarea 
                          className="profile-edit-textarea" 
                          rows={4}
                          value={editBody}
                          onChange={(e) => setEditBody(e.target.value)}
                        />
                        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={editIsPublic} 
                            onChange={(e) => setEditIsPublic(e.target.checked)}
                          />
                          Hacer pública
                        </label>
                        <div className="profile-edit-actions">
                          <Button variant="outline" size="sm" onClick={cancelEditing}>Cancelar</Button>
                          <Button variant="primary" size="sm" onClick={() => saveEditing(conf.id)}>Guardar</Button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="profile-card-body">
                          {conf.body}
                        </div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.5rem' }}>
                          Privacidad: {conf.isPublic ? 'Pública 🌎' : 'Privada 🔒'}
                        </div>
                        <div className="profile-card-actions">
                          <button 
                            className="profile-btn-icon" 
                            onClick={() => startEditing(conf)}
                            title="Editar"
                            aria-label="Editar"
                          >
                            <EditIcon />
                          </button>
                          <button 
                            className="profile-btn-icon" 
                            onClick={() => handleDelete(conf.id)}
                            style={{ color: '#ef4444' }}
                            title="Eliminar"
                            aria-label="Eliminar"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {activeTab === 'received' && (
          <>
            {receivedConfessions.length === 0 ? (
              <div className="feed-empty-state" style={{ padding: '3rem', textAlign: 'center', border: '1px dashed var(--color-border-soft)', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ margin: 0 }}>Nadie te ha confesado su crush todavía. 💔</p>
              </div>
            ) : (
              <div className="profile-grid">
                {receivedConfessions.map(conf => (
                  <div key={conf.id} className="profile-card">
                    <div className="profile-card-header">
                      <span>De: <strong>{conf.isAnonymous ? 'Anónimo' : (conf.authorName || 'Usuario')}</strong></span>
                      <span>{conf.createdAt?.toDate().toLocaleDateString() || 'Reciente'}</span>
                    </div>
                    <div className="profile-card-body">
                      {conf.body}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
