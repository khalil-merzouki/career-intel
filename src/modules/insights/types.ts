export interface RequirementInsight {
  name: string
  category: 'skill' | 'language' | 'certification' | 'education' | 'location' | 'work'
  opportunityCount: number
  requiredCount: number
  applicationCount: number
  jobIds: string[]
}

export interface SkillInsight extends RequirementInsight {
  category: 'skill'
  alignment: 'strong' | 'partial' | 'gap' | 'unassessed'
  impact: string
}

export interface CareerInsight {
  title: string
  explanation: string
  href: '/profile' | '/profile/setup/skills' | '/jobs'
}

export interface InsightsSummary {
  profileReady: boolean
  analyzedOpportunityCount: number
  applicationCount: number
  skillDemand: SkillInsight[]
  skillGaps: SkillInsight[]
  highValueSkills: SkillInsight[]
  strongSkills: SkillInsight[]
  recurringRequirements: RequirementInsight[]
  careerInsights: CareerInsight[]
}
