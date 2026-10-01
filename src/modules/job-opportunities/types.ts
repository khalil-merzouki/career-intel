export type RequirementCategory =
  'skill' | 'language' | 'certification' | 'location' | 'work'
export type RequirementPriority = 'required' | 'preferred'
export type OpportunityStatus = 'draft' | 'confirmed'
export type WorkType = 'remote' | 'hybrid' | 'on-site' | 'unknown'
export type SalarySource = 'listed' | 'estimated'

export interface JobRequirement {
  id: string
  category: RequirementCategory
  text: string
  priority: RequirementPriority
}

export interface JobOpportunity {
  id: string
  role: string
  company: string
  location: string
  workType: WorkType
  salary: string
  salarySource: SalarySource
  url: string
  description: string
  seniority: string
  experience: string
  requirements: JobRequirement[]
  status: OpportunityStatus
  createdAt: string
}

export interface JobOpportunityInput {
  url: string
  description: string
}
