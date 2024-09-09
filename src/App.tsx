import { TrophyCounts, TrophyTitle, TrophyType } from 'psn-api';
import React, { useState, useEffect } from 'react';


interface Game {
  definedTrophies: TrophyCounts[];
  earnedTrophies: TrophyCounts[];
  hasTrophyGroups: boolean;
  hiddenFlag: boolean;
  lastUpdatedDateTime: string;
  npCommunicationId: string;
  npServiceName: string;
  progress: number;
  trophyGroupCount: number;
  trophySetVersion: string;
  trophyTitleIconUrl: string;
  trophyTitleName: string;
  trophyTitlePlatform: string;
}


const App = () => {
  const [games, setGames] = useState<TrophyType[]>([]);
  const [loading, setLoading] = useState(true);

 

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch('http://localhost:3001/games');
        const data = await response.json() as Array<TrophyType>;
        console.log('DAAATAAAA', data)
        setGames(data)
      } catch (error) {
        console.error('Error fetching games:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  if (loading) return <div>Loading...</div>;

  console.log("Inital", games)

  return (
    <div>
      <h1>My PSN Games</h1>
      <ul>
        {games.map((game, index) => (
          <>
            <li>title:</li>
            <li key={index}>{game}</li>
          </>

        ))}
      </ul>
    </div>
  );
};

export default App;
