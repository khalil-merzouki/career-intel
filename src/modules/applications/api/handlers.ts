import { http, HttpResponse } from 'msw'
import { applicationStages } from '../stages'
import type {
  Application,
  ApplicationSource,
  CreateApplicationInput,
  UpdateApplicationInput,
} from '../types'

const storageKey = 'career-intel-applications'
let applications = loadApplications()

function loadApplications(): Application[] {
  try {
    const saved = localStorage.getItem(storageKey)
    if (!saved) return []
    const parsed = JSON.parse(saved) as Application[]
    if (!Array.isArray(parsed)) return []
    return parsed.map((item) => ({
      ...item,
      notes: item.notes ?? '',
      importantDates: item.importantDates ?? [],
      interviews: item.interviews ?? [],
      stageHistory: item.stageHistory ?? [],
    }))
  } catch {
    return []
  }
}

function storeApplications(next: Application[]) {
  applications = next
  try {
    localStorage.setItem(storageKey, JSON.stringify(next))
  } catch {
    /* Keep the mock in memory when storage is unavailable. */
  }
}

function validDate(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value))
    return false
  const [year, month, day] = value.split('-').map(Number)
  const date = new Date(Date.UTC(year, month - 1, day))
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  )
}

function validUpdate(input: UpdateApplicationInput) {
  return (
    applicationStages.some((item) => item.value === input?.stage) &&
    validDate(input.appliedOn) &&
    typeof input.notes === 'string' &&
    Array.isArray(input.importantDates) &&
    input.importantDates.length <= 50 &&
    input.importantDates.every(
      (item) =>
        typeof item.id === 'string' &&
        typeof item.label === 'string' &&
        item.label.trim() &&
        validDate(item.date),
    ) &&
    Array.isArray(input.interviews) &&
    input.interviews.length <= 50 &&
    input.interviews.every(
      (item) =>
        typeof item.id === 'string' &&
        typeof item.title === 'string' &&
        item.title.trim() &&
        validDate(item.date) &&
        ['scheduled', 'completed', 'cancelled'].includes(item.status) &&
        typeof item.notes === 'string',
    )
  )
}

export function createApplicationHandlers(
  getJob: (id: string) => ApplicationSource | undefined,
  markJobApplied: (id: string) => void,
) {
  function currentDetails(application: Application): Application {
    const job = getJob(application.jobId)
    return job
      ? {
          ...application,
          role: job.role,
          company: job.company,
          location: job.location,
        }
      : application
  }

  return [
    http.get('/api/applications', () =>
      HttpResponse.json(applications.map(currentDetails)),
    ),
    http.get('/api/applications/by-job/:jobId', ({ params }) => {
      const application = applications.find(
        (item) => item.jobId === params.jobId,
      )
      return HttpResponse.json(application ? currentDetails(application) : null)
    }),
    http.get('/api/applications/source/:jobId', ({ params }) => {
      const job = getJob(String(params.jobId))
      return job
        ? HttpResponse.json(job)
        : HttpResponse.json(
            { message: 'Job opportunity not found.' },
            { status: 404 },
          )
    }),
    http.get('/api/applications/:applicationId', ({ params }) => {
      const application = applications.find(
        (item) => item.id === params.applicationId,
      )
      return application
        ? HttpResponse.json(currentDetails(application))
        : HttpResponse.json(
            { message: 'Application not found.' },
            { status: 404 },
          )
    }),
    http.post('/api/applications', async ({ request }) => {
      const input = (await request.json()) as CreateApplicationInput
      if (
        !input ||
        typeof input.jobId !== 'string' ||
        !validDate(input.appliedOn)
      ) {
        return HttpResponse.json(
          { message: 'Choose a valid application date.' },
          { status: 400 },
        )
      }
      const job = getJob(input.jobId)
      if (!job)
        return HttpResponse.json(
          { message: 'Job opportunity not found.' },
          { status: 404 },
        )
      const existing = applications.find((item) => item.jobId === input.jobId)
      if (existing)
        return HttpResponse.json(
          {
            message: 'This opportunity already has an application.',
            applicationId: existing.id,
          },
          { status: 409 },
        )
      const now = new Date().toISOString()
      const application: Application = {
        id: crypto.randomUUID(),
        jobId: job.id,
        role: job.role,
        company: job.company,
        location: job.location,
        stage: 'applied',
        appliedOn: input.appliedOn,
        notes: '',
        importantDates: [],
        interviews: [],
        stageHistory: [
          { id: crypto.randomUUID(), stage: 'applied', date: input.appliedOn },
        ],
        createdAt: now,
        updatedAt: now,
      }
      storeApplications([application, ...applications])
      markJobApplied(job.id)
      return HttpResponse.json(application, { status: 201 })
    }),
    http.put(
      '/api/applications/:applicationId',
      async ({ params, request }) => {
        const index = applications.findIndex(
          (item) => item.id === params.applicationId,
        )
        if (index < 0)
          return HttpResponse.json(
            { message: 'Application not found.' },
            { status: 404 },
          )
        const input = (await request.json()) as UpdateApplicationInput
        if (!validUpdate(input))
          return HttpResponse.json(
            { message: 'Check the stage, dates, and entries before saving.' },
            { status: 400 },
          )
        const previous = applications[index]
        const history = previous.stageHistory.map((event, eventIndex) =>
          eventIndex === 0 && event.stage === 'applied'
            ? { ...event, date: input.appliedOn }
            : event,
        )
        const updated: Application = {
          ...previous,
          ...input,
          importantDates: input.importantDates.map((item) => ({
            ...item,
            label: item.label.trim(),
          })),
          interviews: input.interviews.map((item) => ({
            ...item,
            title: item.title.trim(),
          })),
          stageHistory:
            input.stage === previous.stage
              ? history
              : [
                  ...history,
                  {
                    id: crypto.randomUUID(),
                    stage: input.stage,
                    date: new Date().toISOString().slice(0, 10),
                  },
                ],
          updatedAt: new Date().toISOString(),
        }
        const next = [...applications]
        next[index] = updated
        storeApplications(next)
        return HttpResponse.json(currentDetails(updated))
      },
    ),
  ]
}
