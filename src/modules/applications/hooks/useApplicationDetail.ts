import { useEffect, useState } from 'react'
import { applicationApi } from '../api/applicationApi'
import type {
  Application,
  ApplicationStage,
  ImportantDate,
  InterviewRecord,
} from '../types'

export function useApplicationDetail(applicationId: string) {
  const [saved, setSaved] = useState<Application | null>(null)
  const [draft, setDraft] = useState<Application | null>(null)
  const [loading, setLoading] = useState(true)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    let active = true
    applicationApi
      .get(applicationId)
      .then((item) => {
        if (active) {
          setSaved(item)
          setDraft(item)
        }
      })
      .catch((issue: Error) => {
        if (active) setError(issue.message)
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [applicationId])

  function update(changes: Partial<Application>) {
    setDraft((current) => (current ? { ...current, ...changes } : current))
    setError('')
    setNotice('')
  }
  function addDate() {
    if (!draft) return
    update({
      importantDates: [
        ...draft.importantDates,
        { id: crypto.randomUUID(), label: '', date: '' },
      ],
    })
  }
  function updateDate(id: string, changes: Partial<ImportantDate>) {
    if (!draft) return
    update({
      importantDates: draft.importantDates.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    })
  }
  function removeDate(id: string) {
    if (!draft) return
    update({
      importantDates: draft.importantDates.filter((item) => item.id !== id),
    })
  }
  function addInterview() {
    if (!draft) return
    update({
      interviews: [
        ...draft.interviews,
        {
          id: crypto.randomUUID(),
          title: '',
          date: '',
          status: 'scheduled',
          notes: '',
        },
      ],
    })
  }
  function updateInterview(id: string, changes: Partial<InterviewRecord>) {
    if (!draft) return
    update({
      interviews: draft.interviews.map((item) =>
        item.id === id ? { ...item, ...changes } : item,
      ),
    })
  }
  function removeInterview(id: string) {
    if (!draft) return
    update({ interviews: draft.interviews.filter((item) => item.id !== id) })
  }
  async function save() {
    if (!draft || busy) return
    if (
      !draft.appliedOn ||
      draft.importantDates.some((item) => !item.label.trim() || !item.date) ||
      draft.interviews.some((item) => !item.title.trim() || !item.date)
    ) {
      setError(
        'Complete or remove each unfinished date and interview entry before saving.',
      )
      return
    }
    setBusy(true)
    setError('')
    setNotice('')
    try {
      const updated = await applicationApi.update(draft.id, {
        stage: draft.stage,
        appliedOn: draft.appliedOn,
        notes: draft.notes,
        importantDates: draft.importantDates,
        interviews: draft.interviews,
      })
      setSaved(updated)
      setDraft(updated)
      setNotice('Application updated.')
    } catch (issue) {
      setError((issue as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return {
    draft,
    loading,
    busy,
    error,
    notice,
    changed: JSON.stringify(draft) !== JSON.stringify(saved),
    setStage: (stage: ApplicationStage) => update({ stage }),
    setAppliedOn: (appliedOn: string) => update({ appliedOn }),
    setNotes: (notes: string) => update({ notes }),
    addDate,
    updateDate,
    removeDate,
    addInterview,
    updateInterview,
    removeInterview,
    save,
  }
}
