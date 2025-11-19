import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import Toast from './Toast'

const Notifications = () => {
  const { user } = useAuth()
  const [notifications, setNotifications] = useState([])
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')
  const [toastType, setToastType] = useState('success')

  useEffect(() => {
    if (!user) return

    // Verificar novas recomendações para perfis visualizados
    const checkNewRecommendations = () => {
      try {
        const userId = user.id || user.email
        const viewHistory = JSON.parse(localStorage.getItem('viewHistory') || '[]')
        const recommendations = JSON.parse(localStorage.getItem('recommendations') || '[]')
        const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]')

        // Buscar perfis visualizados pelo usuário
        const viewedProfileIds = [...new Set(
          viewHistory
            .filter(v => v.userId === userId)
            .map(v => v.profileId)
        )]

        // Buscar recomendações recentes (últimas 24 horas) para esses perfis
        const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
        const newRecommendations = recommendations.filter(rec => {
          const recDate = new Date(rec.timestamp)
          const isRecent = recDate > oneDayAgo
          const isViewedProfile = viewedProfileIds.includes(rec.profileId)
          const isNotOwn = rec.userId !== userId
          const isNotRead = !readNotifications.some(
            n => n.type === 'recommendation' && n.recommendationId === rec.id
          )
          return isRecent && isViewedProfile && isNotOwn && isNotRead
        })

        if (newRecommendations.length > 0) {
          // Criar notificações
          const newNotifications = newRecommendations.map(rec => ({
            id: `notif-${rec.id}`,
            type: 'recommendation',
            message: `${rec.userName} recomendou ${rec.profileName}!`,
            recommendationId: rec.id,
            profileId: rec.profileId,
            timestamp: rec.timestamp
          }))

          setNotifications(newNotifications)
          
          // Mostrar toast para a primeira notificação
          if (newNotifications.length > 0) {
            setToastMessage(newNotifications[0].message)
            setToastType('success')
            setShowToast(true)
          }
        }
      } catch (error) {
        console.error('Erro ao verificar notificações:', error)
      }
    }

    // Verificar imediatamente
    checkNewRecommendations()

    // Verificar a cada 30 segundos
    const interval = setInterval(checkNewRecommendations, 30000)

    return () => clearInterval(interval)
  }, [user])

  const markAsRead = (notificationId, recommendationId) => {
    try {
      const readNotifications = JSON.parse(localStorage.getItem('readNotifications') || '[]')
      readNotifications.push({
        id: notificationId,
        type: 'recommendation',
        recommendationId: recommendationId,
        readAt: new Date().toISOString()
      })
      localStorage.setItem('readNotifications', JSON.stringify(readNotifications))
      
      setNotifications(prev => prev.filter(n => n.id !== notificationId))
    } catch (error) {
      console.error('Erro ao marcar notificação como lida:', error)
    }
  }

  // Este componente não renderiza nada visualmente, apenas gerencia as notificações
  // As notificações são mostradas via Toast
  return (
    <>
      <Toast
        message={toastMessage}
        type={toastType}
        isVisible={showToast}
        onClose={() => {
          setShowToast(false)
          // Marcar primeira notificação como lida quando fechar o toast
          if (notifications.length > 0) {
            markAsRead(notifications[0].id, notifications[0].recommendationId)
          }
        }}
      />
    </>
  )
}

export default Notifications

