import { MiniGameData } from './types';

// Facts covered: 1, 2, 3, 15, 16, 17, 25, 27
export const mapDashData: MiniGameData = {
    id: 'map-dash',
    title: 'Map Dash',
    questions: [
        {
            id: 'md-1',
            type: 'multiple-choice',
            prompt: 'Which of these was one of the four Middle Colonies?',
            options: ['Massachusetts', 'Delaware', 'Virginia', 'Georgia'],
            correctAnswer: 'Delaware',
            positiveFeedback: 'Great job! The Middle Colonies were New York, Pennsylvania, New Jersey, and Delaware.',
            negativeFeedback: 'Not quite. The Middle Colonies were New York, Pennsylvania, New Jersey, and Delaware.',
            npc: 'Colonial Surveyor'
        },
        {
            id: 'md-2',
            type: 'true-false',
            prompt: 'True or False: The Pacific Ocean bordered the Middle Colonies to the east.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            positiveFeedback: 'Correct! The Atlantic Ocean bordered them to the east, not the Pacific.',
            negativeFeedback: 'Actually, that is false. The Atlantic Ocean was to the east.',
            npc: 'Ship Captain'
        },
        {
            id: 'md-3',
            type: 'multiple-choice',
            prompt: 'What mountain range formed a natural border to the west of the Middle Colonies?',
            options: ['Rocky Mountains', 'Appalachian Mountains', 'Andes Mountains', 'Cascade Mountains'],
            correctAnswer: 'Appalachian Mountains',
            positiveFeedback: 'You got it! The Appalachian Mountains formed the western border.',
            negativeFeedback: 'Keep exploring! It was the Appalachian Mountains.',
            npc: 'Frontier Scout'
        },
        {
            id: 'md-4',
            type: 'multiple-choice',
            prompt: 'Because they grew so much food, the Middle Colonies were often called the...',
            options: ['Fisherman Colonies', 'Breadbasket Colonies', 'Trade Hubs', 'Lumber Makers'],
            correctAnswer: 'Breadbasket Colonies',
            positiveFeedback: 'Yes! They grew so much food they were called the Breadbasket Colonies.',
            negativeFeedback: 'Not exactly. They were called the Breadbasket Colonies.',
            npc: 'Local Farmer'
        },
        {
            id: 'md-5',
            type: 'multiple-choice',
            prompt: 'What kind of soil did this region have?',
            options: ['Rocky and hard', 'Dry and sandy', 'Fertile soil', 'Frozen soil'],
            correctAnswer: 'Fertile soil',
            positiveFeedback: 'Exactly! The soil was very fertile and great for growing crops.',
            negativeFeedback: 'It was actually very fertile soil, perfect for crops.',
            npc: 'Local Farmer'
        },
        {
            id: 'md-6',
            type: 'multiple-choice',
            prompt: 'Because of the great soil, the economy depended mostly on...',
            options: ['Shipbuilding only', 'Agriculture', 'Whaling', 'Gold mining'],
            correctAnswer: 'Agriculture',
            positiveFeedback: 'Right! Agriculture (or farming) was incredibly important here.',
            negativeFeedback: 'The most important part of the economy was agriculture.',
            npc: 'Merchant'
        },
        {
            id: 'md-7',
            type: 'multiple-choice',
            prompt: 'What were the two major exports from the Middle Colonies?',
            options: ['Corn and wheat', 'Cotton and tobacco', 'Rice and indigo', 'Fish and silk'],
            correctAnswer: 'Corn and wheat',
            positiveFeedback: 'Delicious! Corn and wheat were the major exports.',
            negativeFeedback: 'The main crops they exported to other places were corn and wheat.',
            npc: 'Merchant'
        },
        {
            id: 'md-8',
            type: 'multiple-choice',
            prompt: 'The forests in the region provided lumber to build...',
            options: ['Only furniture', 'Homes and ships', 'Wagons and trains', 'Fences only'],
            correctAnswer: 'Homes and ships',
            positiveFeedback: 'Excellent! The wood was used to build strong homes and ships.',
            negativeFeedback: 'Lumber from the vast forests was used to build homes and ships.',
            npc: 'Shipwright'
        }
    ]
};

// Facts covered: 4, 5, 6, 7, 8, 9, 10, 14, 28
export const pennsPeacePathData: MiniGameData = {
    id: 'penns-peace-path',
    title: "Penn's Peace Path",
    questions: [
        {
            id: 'ppp-1',
            type: 'multiple-choice',
            prompt: 'Who founded Pennsylvania in 1681?',
            options: ['George Washington', 'William Penn', 'Thomas Jefferson', 'King George'],
            correctAnswer: 'William Penn',
            positiveFeedback: 'Spot on! William Penn founded it.',
            negativeFeedback: 'It was William Penn who founded Pennsylvania.',
            npc: 'Quaker Elder'
        },
        {
            id: 'ppp-2',
            type: 'fill-blank',
            prompt: 'In England, the Quakers were _____ (treated very badly) for their beliefs.',
            options: ['celebrated', 'persecuted', 'rewarded', 'promoted'],
            correctAnswer: 'persecuted',
            positiveFeedback: 'Yes, they were persecuted, which means they were treated unfairly for what they believed.',
            negativeFeedback: 'They were persecuted, meaning they were treated terribly for their beliefs.',
            npc: 'Quaker Immigrant'
        },
        {
            id: 'ppp-3',
            type: 'true-false',
            prompt: 'True or False: Quakers came to the Middle Colonies to escape unfair treatment in England.',
            options: ['True', 'False'],
            correctAnswer: 'True',
            positiveFeedback: 'Yes, they were escaping bad treatment to find a safer, fairer home.',
            negativeFeedback: 'It is true! They wanted to escape unfair treatment.',
            npc: 'Quaker Immigrant'
        },
        {
            id: 'ppp-4',
            type: 'multiple-choice',
            prompt: 'Quakers believed that everyone should be treated...',
            options: ['Fairly and equally', 'Differently', 'Harshly', 'By their rank'],
            correctAnswer: 'Fairly and equally',
            positiveFeedback: 'Yes! Fairness and equality were at the heart of their beliefs.',
            negativeFeedback: 'They deeply believed everyone should be treated fairly and equally.',
            npc: 'Quaker Elder'
        },
        {
            id: 'ppp-5',
            type: 'true-false',
            prompt: 'True or False: Quaker ministers chose specific people to speak aloud during meetings.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            positiveFeedback: 'Right! Anyone could speak if they felt moved to. There were no chosen speakers.',
            negativeFeedback: 'Actually, that is false. They had no chosen speakers at meetings.',
            npc: 'Quaker Friend'
        },
        {
            id: 'ppp-6',
            type: 'multiple-choice',
            prompt: 'Quakers were one of the first groups in America to argue against...',
            options: ['Voting', 'Slavery', 'Farming', 'Reading'],
            correctAnswer: 'Slavery',
            positiveFeedback: 'Exactly. They believed slavery was wrong and argued against it early on.',
            negativeFeedback: 'They were one of the early groups to argue against slavery.',
            npc: 'Abolitionist'
        },
        {
            id: 'ppp-7',
            type: 'multiple-choice',
            prompt: 'Because they believed fighting was wrong, Quakers refused to...',
            options: ['Pay taxes', 'Join the army', 'Build boats', 'Eat meat'],
            correctAnswer: 'Join the army',
            positiveFeedback: 'Correct. They were peaceful and refused to join the army.',
            negativeFeedback: 'They refused to join the army because they thought fighting was wrong.',
            npc: 'Pacifist'
        },
        {
            id: 'ppp-8',
            type: 'multiple-choice',
            prompt: 'In Pennsylvania, William Penn guaranteed people could follow their own beliefs. This is called...',
            options: ['Self-government', 'Religious freedom', 'Apprenticeship', 'Taxation'],
            correctAnswer: 'Religious freedom',
            positiveFeedback: 'That is right! Everyone was promised religious freedom.',
            negativeFeedback: 'It is called religious freedom.',
            npc: 'William Penn'
        },
        {
            id: 'ppp-9',
            type: 'multiple-choice',
            prompt: 'How did William Penn treat Native Americans?',
            options: ['He fought them constantly', 'Fairly and peacefully', 'He ignored them', 'He took their land without asking'],
            correctAnswer: 'Fairly and peacefully',
            positiveFeedback: 'Correct. He made fair treaties and wanted to live in peace with equality.',
            negativeFeedback: 'He treated them fairly, peacefully, and with equality.',
            npc: 'Lenape Chief'
        }
    ]
};

// Facts covered: 11, 12, 13, 26
export const franklinsLightningLabData: MiniGameData = {
    id: 'franklins-lightning-lab',
    title: "Franklin's Lightning Lab",
    questions: [
        {
            id: 'fll-1',
            type: 'multiple-choice',
            prompt: 'What famous invention of Benjamin Franklin helped protect buildings from dangerous lightning strikes?',
            options: ['Light bulb', 'Lightning rod', 'Electric fence', 'Battery'],
            correctAnswer: 'Lightning rod',
            positiveFeedback: 'Zzzap! Yes, he invented the lightning rod to keep homes safe.',
            negativeFeedback: 'It was the lightning rod that protected buildings from lightning.',
            npc: 'Benjamin Franklin'
        },
        {
            id: 'fll-2',
            type: 'true-false',
            prompt: 'True or False: Benjamin Franklin became President of the United States.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            positiveFeedback: 'Correct! He was a famous inventor, scientist, and leader, but he was never President.',
            negativeFeedback: 'Actually, it is False. He was very important, but never became President.',
            npc: 'Historian'
        },
        {
            id: 'fll-3',
            type: 'multiple-choice',
            prompt: 'Which of Franklin\'s inventions helped keep colonial houses warm?',
            options: ['Electric Blanket', 'Franklin Stove', 'Solar Heater', 'Campfire Fan'],
            correctAnswer: 'Franklin Stove',
            positiveFeedback: 'Cozy! The Franklin Stove was a great heating invention.',
            negativeFeedback: 'He invented the Franklin Stove to make heating homes better.',
            npc: 'Town Blacksmith'
        },
        {
            id: 'fll-4',
            type: 'multiple-choice',
            prompt: 'In large cities of the Middle Colonies, workers manufactured items made out of what strong metal?',
            options: ['Gold', 'Copper', 'Iron', 'Silver'],
            correctAnswer: 'Iron',
            positiveFeedback: 'Strong answer! They manufactured important iron items like tools and kettles.',
            negativeFeedback: 'They mostly manufactured iron items.',
            npc: 'Ironworker'
        }
    ]
};

// Facts covered: 18, 19, 20, 21, 22, 23, 24
export const colonyTownChallengeData: MiniGameData = {
    id: 'colony-town-challenge',
    title: 'Colony Town Challenge',
    questions: [
        {
            id: 'ctc-1',
            type: 'multiple-choice',
            prompt: 'People in the colonies made their own laws. This practice is called...',
            options: ['Self-government', 'Dictatorship', 'Monarchy', 'Empire building'],
            correctAnswer: 'Self-government',
            positiveFeedback: 'Right! They practiced self-government to run their towns.',
            negativeFeedback: 'It was called self-government.',
            npc: 'Town Magistrate'
        },
        {
            id: 'ctc-2',
            type: 'multiple-choice',
            prompt: 'Each colony elected a group of people to make its laws. This group was called a...',
            options: ['Kings Council', 'Legislature', 'Jury', 'Court'],
            correctAnswer: 'Legislature',
            positiveFeedback: 'Exactly! The legislature made the local rules and laws.',
            negativeFeedback: 'They elected a legislature to make the laws.',
            npc: 'Legislator'
        },
        {
            id: 'ctc-3',
            type: 'true-false',
            prompt: 'True or False: Large landowners and indentured servants were BOTH at the top of the social structure.',
            options: ['True', 'False'],
            correctAnswer: 'False',
            positiveFeedback: 'Correct. Landowners were at the top, but indentured servants had very little power and were near the bottom.',
            negativeFeedback: 'That is false. Only landowners were at the top; indentured servants were near the bottom.',
            npc: 'Wealthy Merchant'
        },
        {
            id: 'ctc-4',
            type: 'fill-blank',
            prompt: 'People who agreed to work for a set number of years to pay for their trip to America were _____ workers called indentured servants.',
            options: ['permanent', 'temporary', 'royal', 'wealthy'],
            correctAnswer: 'temporary',
            positiveFeedback: 'Yes! Indentured servants were temporary workers who eventually became free.',
            negativeFeedback: 'They were temporary workers (they only worked for a set number of years).',
            npc: 'Indentured Servant'
        },
        {
            id: 'ctc-5',
            type: 'multiple-choice',
            prompt: 'Some people had no rights at all and were forced to work without pay forever. They were called...',
            options: ['Apprentices', 'Journey workers', 'Enslaved workers', 'Governors'],
            correctAnswer: 'Enslaved workers',
            positiveFeedback: 'Correct. It was a very unfair and hard reality for enslaved workers.',
            negativeFeedback: 'These were enslaved workers, who were forced to work without rights or pay.',
            npc: 'Free Laborer'
        },
        {
            id: 'ctc-6',
            type: 'multiple-choice',
            prompt: 'A young person who lived with a master to learn a trade (like a blacksmith or baker) was called an...',
            options: ['Apprentice', 'Indentured servant', 'Owner', 'Governor'],
            correctAnswer: 'Apprentice',
            positiveFeedback: 'Right! An apprentice spent years learning a useful skill.',
            negativeFeedback: 'That learning worker was an apprentice.',
            npc: 'Master Craftsman'
        },
        {
            id: 'ctc-7',
            type: 'multiple-choice',
            prompt: 'After finishing an apprenticeship, the worker could travel and get paid. They became a...',
            options: ['Master', 'Journeyman', 'Servant', 'Mayor'],
            correctAnswer: 'Journeyman',
            positiveFeedback: 'Great job! A journeyman was skilled enough to work for pay.',
            negativeFeedback: 'After being an apprentice, they became a journeyman.',
            npc: 'Journeyman'
        }
    ]
};

// Helper array containing all mini-games
export const allGameData: MiniGameData[] = [
    mapDashData,
    pennsPeacePathData,
    franklinsLightningLabData,
    colonyTownChallengeData
];
