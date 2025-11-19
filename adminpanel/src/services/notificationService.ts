import config from '../../config';

export type NotificationType = 'contact' | 'visit'

export interface NotificationItem {
    id: number
    type: NotificationType
    title: string
    description?: string
    createdAt: string
    link: string
}

export interface NotificationCounts {
    total: number
    contactNew: number
    visitPending: number
}

const BASE_URL = config.api.baseUrl;
const CONTACT_ENDPOINT = `${BASE_URL}/contact`
const CONTACT_STATS_ENDPOINT = `${BASE_URL}/contact/stats`
const VISIT_ENDPOINT = `${BASE_URL}/schedule-visit`
const VISIT_STATS_ENDPOINT = `${BASE_URL}/schedule-visit/stats`

async function safeJson<T>(res: Response, fallback: T): Promise<T> {
    try {
        if (!res.ok) return fallback
        return (await res.json()) as T
    } catch {
        return fallback
    }
}

export async function fetchNotificationCounts(): Promise<NotificationCounts> {
    const [contactStatsRes, visitStatsRes] = await Promise.all([
        fetch(CONTACT_STATS_ENDPOINT),
        fetch(VISIT_STATS_ENDPOINT),
    ])

    const contactStats = await safeJson(contactStatsRes, {
        total: 0,
        new: 0,
        read: 0,
        responded: 0,
    })
    const visitStats = await safeJson(visitStatsRes, {
        total: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
    })

    const contactNew = Number(contactStats?.new || 0)
    const visitPending = Number(visitStats?.pending || 0)
    return {
        total: contactNew + visitPending,
        contactNew,
        visitPending,
    }
}

export async function fetchRecentNotifications(limitPerType: number = 5): Promise<NotificationItem[]> {
    const [contactsRes, visitsRes] = await Promise.all([
        fetch(CONTACT_ENDPOINT),
        fetch(VISIT_ENDPOINT),
    ])

    type Contact = {
        id: number
        name: string
        email: string
        subject: string
        message: string
        status: string
        createdAt: string
    }

    type Visit = {
        id: number
        name: string
        propertyTitle?: string
        preferredDate: string
        preferredTime: string
        status: string
        createdAt: string
    }

    const contacts = await safeJson<Contact[]>(contactsRes, [])
    const visits = await safeJson<Visit[]>(visitsRes, [])

    const newContacts = contacts
        .filter((c) => c.status === 'new')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limitPerType)
        .map<NotificationItem>((c) => ({
            id: c.id,
            type: 'contact',
            title: `New contact from ${c.name}`,
            description: c.subject || c.message?.slice(0, 80),
            createdAt: c.createdAt,
            link: '/contact-forms',
        }))

    const pendingVisits = visits
        .filter((v) => v.status === 'pending')
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, limitPerType)
        .map<NotificationItem>((v) => ({
            id: v.id,
            type: 'visit',
            title: `Visit request from ${v.name}`,
            description: v.propertyTitle ? `Property: ${v.propertyTitle}` : undefined,
            createdAt: v.createdAt,
            link: '/schedule-visits',
        }))

    const merged = [...newContacts, ...pendingVisits].sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    return merged
}

export async function markContactAsRead(id: number): Promise<void> {
    try {
        await fetch(`${CONTACT_ENDPOINT}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: 'read' }),
        })
    } catch {
        // swallow; UI will refresh anyway
    }
}


