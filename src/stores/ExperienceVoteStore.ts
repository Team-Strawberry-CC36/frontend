import { reactive } from 'vue';
import type ExperienceHelpfulnessVote from '@/utils/interfaces/ExperienceHelpfulnessVote';
import { defineStore } from 'pinia';

export const useExperienceVoteStore = defineStore('experienceVoteStore', () => {
  const details = reactive<ExperienceHelpfulnessVote[]>([])

  function useMock() {
    details.splice(0, details.length); // Clear existing array
    details.push(
      {
        vote_id: 1,
        user_id: "fxQ7AmIq1ZR0cge9EIBUAHXWt5e2",
        experience_id: 1,
        helpfulness: "up",
      },
      {
        vote_id: 2,
        user_id: "fxQ7AmIq1ZR0cge9EIBUAHXWt5e2",
        experience_id: 2,
        helpfulness: "down",
      },
      {
        vote_id: 3,
        user_id: "fxQ7AmIq1ZR0cge9EIBUAHXWt5e2",
        experience_id: 3,
        helpfulness: "up",
      },
      {
        vote_id: 4,
        user_id: "fxQ7AmIq1ZR0cge9EIBUAHXWt5e2",
        experience_id: 4,
        helpfulness: "down",
      },
      {
        vote_id: 5,
        user_id: "fxQ7AmIq1ZR0cge9EIBUAHXWt5e2",
        experience_id: 5,
        helpfulness: "up",
      }
    );
  }

  function update(data: ExperienceHelpfulnessVote[]) {
    details.push(...data)
  }

  function clear() {
    details.splice(0, details.length);
  }

  return { details, useMock, update, clear };
});
