import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import {
    fetchNotificationCounts,
    fetchRecentNotifications,
    type NotificationCounts,
    type NotificationItem,
} from '../services/notificationService'

interface NotificationContextValue {
    counts: NotificationCounts
    items: NotificationItem[]
    loading: boolean
    refresh: () => Promise<void>
}

const defaultCounts: NotificationCounts = { total: 0, contactNew: 0, visitPending: 0 }

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined)

export const useNotifications = (): NotificationContextValue => {
    const ctx = useContext(NotificationContext)
    if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
    return ctx
}

export const NotificationProvider: React.FC<{ children: React.ReactNode; pollingMs?: number }> = ({
    children,
    pollingMs = 30000,
}) => {
    const [counts, setCounts] = useState<NotificationCounts>(defaultCounts)
    const [items, setItems] = useState<NotificationItem[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    const refresh = useCallback(async () => {
        setLoading(true)
        try {
            const [c, i] = await Promise.all([
                fetchNotificationCounts(),
                fetchRecentNotifications(),
            ])
            setCounts(c)
            setItems(i)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        // initial load
        refresh()
        // polling
        const timer = window.setInterval(() => {
            refresh()
        }, pollingMs)
        return () => window.clearInterval(timer)
    }, [pollingMs, refresh])

    const value = useMemo(
        () => ({ counts, items, loading, refresh }),
        [counts, items, loading, refresh]
    )

    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>
}





