const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Team = require('./models/team');
const Player = require('./models/player');
const User = require('./models/user');
const Stats = require('./models/stats');
const TopScorer = require('./models/topScorer');
const TeamPerformance = require('./models/teamPerformance');
const GoalsScored = require('./models/goalsScored');
const connectDB = require('./db');

const seedData = async () => {
  await connectDB();

  const teams = [
    { name: "Bayern München", founded: 1900, stadium: "Allianz Arena", logo: "/images/bayern.svg", color: "#DC052D", titles: "35 Titles" },
    { name: "RB Leipzig", founded: 2009, stadium: "Red Bull Arena", logo: "/images/rb.png", color: "#DD0741", titles: "1 Title" },
    { name: "Eintracht Frankfurt", founded: 1899, stadium: "Deutsche Bank Park", logo: "/images/frankfurt.png", color: "#E1000F", titles: "1 Title" },
    { name: "Bayer 04 Leverkusen", founded: 1904, stadium: "BayArena", logo: "/images/bayer.png", color: "#E32221", titles: "0 Titles" },
    { name: "SC Freiburg", founded: 1904, stadium: "Schwarzwald-Stadion", logo: "/images/freiburg.png", color: "#9C3D2A", titles: "0 Titles" },
    { name: "1. FC Union Berlin", founded: 1966, stadium: "An der Alten Försterei", logo: "/images/union.png", color: "#F40000", titles: "0 Titles" },
    { name: "Borussia Dortmund", founded: 1909, stadium: "Signal Iduna Park", logo: "/images/dortmund.png", color: "#FDE100", titles: "5 Titles" },
    { name: "Werder Bremen", founded: 1899, stadium: "Weserstadion", logo: "/images/bremen.png", color: "#006848", titles: "4 Titles" },
    { name: "Bor. Mönchengladbach", founded: 1900, stadium: "Borussia-Park", logo: "/images/gladbach.png", color: "#1C9E4C", titles: "5 Titles" },
    { name: "1. FSV Mainz 05", founded: 1905, stadium: "MEWA Arena", logo: "/images/mainz.png", color: "#9E2A2F", titles: "0 Titles" },
    { name: "VfB Stuttgart", founded: 1893, stadium: "Mercedes-Benz Arena", logo: "/images/stuttgart.png", color: "#9E1B32", titles: "5 Titles" },
    { name: "VfL Wolfsburg", founded: 1945, stadium: "Volkswagen Arena", logo: "/images/wolfsburg.png", color: "#1B7A3D", titles: "1 Title" },
    { name: "FC Augsburg", founded: 1907, stadium: "WWK Arena", logo: "/images/augsburg.png", color: "#009C3D", titles: "0 Titles" },
    { name: "1. FC Heidenheim", founded: 1907, stadium: "Voith-Arena", logo: "/images/heidenheim.png", color: "#003A7D", titles: "0 Titles" },
    { name: "TSG Hoffenheim", founded: 1945, stadium: "PreZero Arena", logo: "/images/hoffenheim.png", color: "#00A3E0", titles: "0 Titles" },
    { name: "FC St. Pauli", founded: 1910, stadium: "Millerntor-Stadion", logo: "/images/stpauli.png", color: "#7A3E35", titles: "0 Titles" },
    { name: "Holstein Kiel", founded: 1900, stadium: "Holstein-Stadion", logo: "/images/kiel.png", color: "#00639F", titles: "0 Titles" },
    { name: "VfL Bochum", founded: 1848, stadium: "Vonovia Ruhrstadion", logo: "/images/bochum.png", color: "#003C5D", titles: "0 Titles" }
  ];
  const players = [
    { name: "Harry Kane", position: "Forward", team: "Bayern Munich", age: 31, image: "/images/kane.webp", teamColor: "#DC052D" },
    { name: "Joshua Kimmich", position: "Midfielder", team: "Bayern Munich", age: 26, image: "/images/default.png", teamColor: "#DC052D" },
    { name: "Leroy Sané", position: "Forward", team: "Bayern Munich", age: 28, image: "/images/default.png", teamColor: "#DC052D" },
    { name: "Kingsley Coman", position: "Forward", team: "Bayern Munich", age: 27, image: "/images/default.png", teamColor: "#DC052D" },
    { name: "Dayot Upamecano", position: "Defender", team: "Bayern Munich", age: 22, image: "/images/default.png", teamColor: "#DC052D" },
    { name: "Joshua Kimmich", position: "Midfielder", team: "Bayern Munich", age: 26, image: "/images/default.png", teamColor: "#DC052D" },
    { name: "Mats Hummels", position: "Defender", team: "Borussia Dortmund", age: 35, image: "/images/default.png", teamColor: "#FDE100" },
    { name: "Youssoufa Moukoko", position: "Forward", team: "Borussia Dortmund", age: 19, image: "/images/default.png", teamColor: "#FDE100" },
    { name: "Julian Brandt", position: "Midfielder", team: "Borussia Dortmund", age: 27, image: "/images/default.png", teamColor: "#FDE100" },
    { name: "Sebastian Haller", position: "Forward", team: "Borussia Dortmund", age: 29, image: "/images/default.png", teamColor: "#FDE100" },
    { name: "Niklas Süle", position: "Defender", team: "Borussia Dortmund", age: 28, image: "/images/default.png", teamColor: "#FDE100" },
    { name: "Marius Wolf", position: "Midfielder", team: "Borussia Dortmund", age: 28, image: "/images/default.png", teamColor: "#FDE100" },
    { name: "Jonas Hofmann", position: "Midfielder", team: "Borussia Mönchengladbach", age: 31, image: "/images/default.png", teamColor: "#1C9E4C" },
    { name: "Alassane Pléa", position: "Forward", team: "Borussia Mönchengladbach", age: 30, image: "/images/default.png", teamColor: "#1C9E4C" },
    { name: "Ramy Bensebaini", position: "Defender", team: "Borussia Mönchengladbach", age: 29, image: "/images/default.png", teamColor: "#1C9E4C" },
    { name: "Florian Neuhaus", position: "Midfielder", team: "Borussia Mönchengladbach", age: 26, image: "/images/default.png", teamColor: "#1C9E4C" },
    { name: "Vincenzo Grifo", position: "Midfielder", team: "SC Freiburg", age: 30, image: "/images/default.png", teamColor: "#9C3D2A" },
    { name: "Christian Günter", position: "Defender", team: "SC Freiburg", age: 30, image: "/images/default.png", teamColor: "#9C3D2A" },
    { name: "Nicolas Höfler", position: "Midfielder", team: "SC Freiburg", age: 33, image: "/images/default.png", teamColor: "#9C3D2A" },
    { name: "Michael Gregoritsch", position: "Forward", team: "FC Augsburg", age: 30, image: "/images/default.png", teamColor: "#009C3D" },
    { name: "Reece Oxford", position: "Defender", team: "FC Augsburg", age: 25, image: "/images/default.png", teamColor: "#009C3D" },
    { name: "Daniel Caligiuri", position: "Midfielder", team: "FC Augsburg", age: 36, image: "/images/default.png", teamColor: "#009C3D" },
    { name: "Christopher Lenz", position: "Defender", team: "Union Berlin", age: 29, image: "/images/default.png", teamColor: "#F40000" },
    { name: "Taiwo Awoniyi", position: "Forward", team: "Union Berlin", age: 26, image: "/images/default.png", teamColor: "#F40000" },
    { name: "Sheraldo Becker", position: "Forward", team: "Union Berlin", age: 28, image: "/images/default.png", teamColor: "#F40000" },
    { name: "Geraldo Becker", position: "Defender", team: "Union Berlin", age: 31, image: "/images/default.png", teamColor: "#F40000" },
    { name: "Robin Knoche", position: "Defender", team: "Union Berlin", age: 31, image: "/images/default.png", teamColor: "#F40000" },
    { name: "Florian Wirtz", position: "Midfielder", team: "Bayer Leverkusen", age: 18, image: "/images/default.png", teamColor: "#E32221" },
    { name: "Kerem Demirbay", position: "Midfielder", team: "Bayer Leverkusen", age: 30, image: "/images/default.png", teamColor: "#E32221" },
    { name: "Piero Hincapié", position: "Defender", team: "Bayer Leverkusen", age: 21, image: "/images/default.png", teamColor: "#E32221" },
    { name: "Sardar Azmoun", position: "Forward", team: "Bayer Leverkusen", age: 29, image: "/images/default.png", teamColor: "#E32221" },
    { name: "Amine Adli", position: "Forward", team: "Bayer Leverkusen", age: 23, image: "/images/default.png", teamColor: "#E32221" }
  ];

  const topScorers = [
    { name: 'Robert Lewandowski', goals: 41, team: 'Bayern Munich', color: '#DC052D' },
    { name: 'Erling Haaland', goals: 27, team: 'Borussia Dortmund', color: '#FDE100' },
    { name: 'André Silva', goals: 25, team: 'Eintracht Frankfurt', color: '#E1000F' },
    { name: 'Wout Weghorst', goals: 20, team: 'VfL Wolfsburg', color: '#50AF3E' },
    { name: 'Andrej Kramarić', goals: 20, team: 'TSG Hoffenheim', color: '#1C63B7' }
  ];

  const teamPerformance = [
    { team: 'Bayern Munich', points: 78, color: '#DC052D' },
    { team: 'RB Leipzig', points: 65, color: '#DD0741' },
    { team: 'Borussia Dortmund', points: 64, color: '#FDE100' },
    { team: 'Wolfsburg', points: 61, color: '#50AF3E' },
    { team: 'Eintracht Frankfurt', points: 60, color: '#E1000F' }
  ];

  const goalsScored = [
    { matchday: 'Matchday 1', goals: 27 },
    { matchday: 'Matchday 5', goals: 137 },
    { matchday: 'Matchday 10', goals: 282 },
    { matchday: 'Matchday 15', goals: 421 },
    { matchday: 'Matchday 20', goals: 568 },
    { matchday: 'Matchday 25', goals: 706 },
    { matchday: 'Matchday 30', goals: 850 },
    { matchday: 'Matchday 34', goals: 954 }
  ];
  
  const hashedPassword = await bcrypt.hash("Admin$00", 10);
  const users = [
    { username: "admin", password: hashedPassword }
  ];

  const statistics = [
    {totGoals: 954, avgGoals: 3.02, clean: 95, redCards: 43}
  ];

  try {
    await Team.deleteMany();
    await Team.insertMany(teams);
    await Player.deleteMany();
    await Player.insertMany(players);
    await User.deleteMany();
    await User.insertMany(users);
    await Stats.deleteMany();
    await Stats.insertMany(statistics);
    await TopScorer.deleteMany();
    await TopScorer.insertMany(topScorers);
    await TeamPerformance.deleteMany();
    await TeamPerformance.insertMany(teamPerformance);
    await GoalsScored.deleteMany();
    await GoalsScored.insertMany(goalsScored);
    console.log('Data seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error(`Error seeding data: ${error}`);
    process.exit(1);
  }
};

seedData();




