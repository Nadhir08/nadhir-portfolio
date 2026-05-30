import { useState, useEffect } from 'react'

export interface GithubUser {
  login: string
  name: string
  public_repos: number
  followers: number
  following: number
  created_at: string
  bio: string
  avatar_url: string
  html_url: string
}

export interface GithubRepo {
  id: number
  name: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  html_url: string
  topics: string[]
  updated_at: string
}

interface GithubData {
  user: GithubUser | null
  repos: GithubRepo[]
  loading: boolean
  error: string | null
}

export function useGithub(username: string): GithubData {
  const [data, setData] = useState<GithubData>({
    user: null,
    repos: [],
    loading: true,
    error: null,
  })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API error')

        const user = (await userRes.json()) as GithubUser
        const repos = (await reposRes.json()) as GithubRepo[]

        setData({ user, repos, loading: false, error: null })
      } catch {
        setData(prev => ({ ...prev, loading: false, error: 'Failed to load GitHub data' }))
      }
    }

    fetchData()
  }, [username])

  return data
}
