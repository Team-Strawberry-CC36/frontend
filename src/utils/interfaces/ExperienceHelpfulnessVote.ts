export default interface ExperienceHelpfulnessVote {
  vote_id: number,
  user_id: string,
  experience_id: number,
  helpfulness: "up" | "down"
}


interface ApiResponse<T> {
  message: string;
  data: T
}


type ExperienceApiResponse = ApiResponse<ExperienceHelpfulnessVote[]>
