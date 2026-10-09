import { http, HttpResponse } from 'msw'
import type { Profile } from '../../../shared/types/profile'
import { compareOpportunity } from '../../job-opportunities/api/matchAnalysis'
import type {
  JobOpportunity,
  JobRequirement,
} from '../../job-opportunities/types'
import type { Application } from '../../applications/types'
import type {
  CareerInsight,
  InsightsSummary,
  RequirementInsight,
  SkillInsight,
} from '../types'

export function createInsightsHandlers(
  getProfile: () => Profile,
  getJobs: () => JobOpportunity[],
  getApplications: () => Application[],
) {
  return [
    http.get('/api/insights', () => {
      const profile = getProfile()
      const jobs = getJobs().filter(
        (job) =>
          job.status === 'confirmed' && job.trackingStatus !== 'archived',
      )
      const jobIds = new Set(jobs.map((job) => job.id))
      const appliedIds = new Set(
        getApplications()
          .map((application) => application.jobId)
          .filter((id) => jobIds.has(id)),
      )
      const requirements = new Map<string, RequirementInsight>()
      const alignments = new Map<string, Set<SkillInsight['alignment']>>()
      for (const job of jobs) {
        const match = profile.complete ? compareOpportunity(job, profile) : null
        const perJob = new Map<
          string,
          { requirement: JobRequirement; required: boolean }
        >()
        for (const requirement of job.requirements) {
          const name = requirement.text.trim()
          if (!name) continue
          const key = `${requirement.category}:${name.toLocaleLowerCase().replace(/\s+/g, ' ')}`
          const previous = perJob.get(key)
          perJob.set(key, {
            requirement: previous?.requirement ?? requirement,
            required:
              requirement.priority === 'required' ||
              Boolean(previous?.required),
          })
          if (requirement.category === 'skill' && match?.state === 'ready') {
            const alignment: SkillInsight['alignment'] =
              match.strongMatches.some((item) => item.id === requirement.id)
                ? 'strong'
                : match.partialMatches.some(
                      (item) => item.id === requirement.id,
                    )
                  ? 'partial'
                  : 'gap'
            const values =
              alignments.get(key) ?? new Set<SkillInsight['alignment']>()
            values.add(alignment)
            alignments.set(key, values)
          }
        }
        for (const [key, { requirement, required }] of perJob) {
          const item = requirements.get(key) ?? {
            name: requirement.text.trim(),
            category: requirement.category,
            opportunityCount: 0,
            requiredCount: 0,
            applicationCount: 0,
            jobIds: [],
          }
          item.opportunityCount++
          if (required) item.requiredCount++
          if (appliedIds.has(job.id)) item.applicationCount++
          item.jobIds.push(job.id)
          requirements.set(key, item)
        }
      }
      const skillDemand: SkillInsight[] = [...requirements]
        .filter(([, item]) => item.category === 'skill')
        .map(([key, item]) => {
          const values = alignments.get(key)
          const alignment: SkillInsight['alignment'] = !profile.complete
            ? 'unassessed'
            : values?.has('gap')
              ? 'gap'
              : values?.has('partial')
                ? 'partial'
                : values?.has('strong')
                  ? 'strong'
                  : 'unassessed'
          const demand = `${item.opportunityCount} confirmed ${item.opportunityCount === 1 ? 'opportunity' : 'opportunities'}`
          const applied = item.applicationCount
            ? `, including ${item.applicationCount} you applied to`
            : ''
          const impact =
            alignment === 'strong'
              ? `Documented in your profile and requested by ${demand}${applied}.`
              : alignment === 'partial'
                ? `Your experience mentions this skill, but your skills list does not. Requested by ${demand}${applied}.`
                : alignment === 'gap'
                  ? `Not documented in your profile. Requested by ${demand}${applied}; ${item.requiredCount} mark it required.`
                  : `Requested by ${demand}${applied}. Complete your profile to assess your evidence.`
          return { ...item, category: 'skill' as const, alignment, impact }
        })
        .sort(
          (a, b) =>
            b.opportunityCount - a.opportunityCount ||
            b.requiredCount - a.requiredCount ||
            a.name.localeCompare(b.name),
        )
      const skillGaps = skillDemand.filter(
        (item) => item.alignment === 'gap' || item.alignment === 'partial',
      )
      const highValueSkills = [...skillGaps]
        .sort(
          (a, b) =>
            b.requiredCount * 2 +
              b.applicationCount * 3 +
              b.opportunityCount -
              (a.requiredCount * 2 +
                a.applicationCount * 3 +
                a.opportunityCount) || a.name.localeCompare(b.name),
        )
        .slice(0, 5)
      const strongSkills = skillDemand.filter(
        (item) => item.alignment === 'strong',
      )
      const recurringRequirements = [...requirements.values()]
        .filter((item) => item.opportunityCount >= 2)
        .sort(
          (a, b) =>
            b.opportunityCount - a.opportunityCount ||
            b.requiredCount - a.requiredCount ||
            a.name.localeCompare(b.name),
        )
      const careerInsights: CareerInsight[] = []
      if (!jobs.length)
        careerInsights.push({
          title: 'Confirm a job analysis',
          explanation:
            'Confirmed requirements from saved and applied opportunities create your market view.',
          href: '/jobs',
        })
      if (!profile.complete)
        careerInsights.push({
          title: 'Complete your Career Profile',
          explanation:
            'A completed profile lets us compare your documented skills with recurring requirements.',
          href: '/profile',
        })
      if (highValueSkills[0])
        careerInsights.push({
          title: `Review ${highValueSkills[0].name}`,
          explanation: `${highValueSkills[0].impact} Add evidence if you have it, or consider developing it.`,
          href: '/profile/setup/skills',
        })
      if (strongSkills[0])
        careerInsights.push({
          title: `Highlight ${strongSkills[0].name}`,
          explanation: `${strongSkills[0].impact} Consider emphasizing this evidence when applying.`,
          href: '/profile',
        })
      const summary: InsightsSummary = {
        profileReady: profile.complete,
        analyzedOpportunityCount: jobs.length,
        applicationCount: appliedIds.size,
        skillDemand,
        skillGaps,
        highValueSkills,
        strongSkills,
        recurringRequirements,
        careerInsights,
      }
      return HttpResponse.json(summary)
    }),
  ]
}
