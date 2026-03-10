You are building a small educational browser game in React for a child to study for a test on the Middle Colonies.

Your job is to build the game in careful phases. Do not jump ahead. Complete only the requested phase, then stop and summarize what you changed, what files were created, and what should happen next.

## Core Game Concept

Build a fun, kid-friendly educational quest game called:

# Quest for the Middle Colonies

The player completes 4 mini-games and then unlocks a final challenge.

Mini-games:
1. Map Dash
2. Penn’s Peace Path
3. Franklin’s Lightning Lab
4. Colony Town Challenge

Final challenge:
5. The Governor’s Gate

The game should feel playful, colorful, and adventurous, but still be clean and easy to understand.

---

# Learning Content

These are the facts and answers the game must teach:

1. The four Middle Colonies were New York, Pennsylvania, New Jersey, and Delaware.
2. False: The Pacific Ocean did not border the Middle Colonies to the east.
3. The Appalachian Mountains formed a natural border to the west.
4. William Penn founded Pennsylvania in 1681.
5. Quakers believed everyone should be treated fairly and equally.
6. False: Quaker ministers did not choose people to speak aloud during meetings.
7. Quakers were one of the first groups to argue against slavery in America.
8. Quakers believed fighting was wrong, so they refused to join the army.
9. William Penn guaranteed religious freedom in Pennsylvania.
10. True: Quakers came to the Middle Colonies to escape unfair treatment in England.
11. Benjamin Franklin invented the lightning rod.
12. False: Benjamin Franklin did not become President of the United States.
13. Benjamin Franklin invented the Franklin Stove.
14. William Penn treated Native Americans fairly / peacefully / with equality.
15. The Middle Colonies were called the Breadbasket Colonies.
16. The region had fertile soil.
17. The economy depended mostly on agriculture.
18. People practiced self-government.
19. Each colony elected its own legislature.
20. Enslaved workers had no rights and were forced to work without pay.
21. False: Large landowners and indentured servants were not both at the top of the social structure.
22. Indentured servants were temporary workers.
23. A young person learning a trade was an apprentice.
24. After apprenticeship, the worker became a journeyman.
25. The two major exports were corn and wheat.
26. In large cities, workers manufactured iron items.
27. Forests provided lumber to build homes and ships.
28. In England, Quakers were persecuted for their beliefs.

---

# Tech Requirements

- Use React
- Use TypeScript
- Use clean component structure
- Use simple local state first; do not add unnecessary libraries unless needed
- Use accessible buttons and readable text
- Make the game mobile-friendly and desktop-friendly
- Use a playful but clean visual style
- Avoid overengineering
- Use reusable data-driven structures where possible
- Keep all game content in structured data files when appropriate
- Use placeholder art / simple CSS shapes if needed instead of waiting for graphics
- Do not add backend, auth, or database
- Do not add sound unless explicitly requested later
- Do not add animation libraries unless truly needed
- Prefer straightforward CSS or Tailwind if already present in the project
- Make it easy to expand later

---

# Tone and UX Goals

- Child-friendly
- Encouraging
- Never harsh on wrong answers
- Wrong answers should gently prompt retry or teach the answer
- Progress should feel rewarding
- Each mini-game should feel meaningfully different
- The final game should feel like an earned achievement
- The educational content must stay accurate

---

# Build Rules

- Only complete one phase at a time
- After each phase, stop
- After each phase, provide:
  1. what you built
  2. files created/changed
  3. what remains
  4. any issues or decisions
- Do not begin the next phase until told
- If something is unclear, make the most reasonable assumption and proceed
- Keep code organized and readable
- Favor small components over giant files
- Avoid placeholder comments like “implement later” if the current phase should include the feature

---

# Game Structure

The player starts on a main quest screen.

The player must complete:
- Map Dash
- Penn’s Peace Path
- Franklin’s Lightning Lab
- Colony Town Challenge

Each completed mini-game awards a relic:
- Explorer Compass
- Peace Key
- Spark Crystal
- Colony Seal

After all 4 relics are earned, unlock:
- The Governor’s Gate

The final challenge mixes questions from all areas.

After winning, show a victory screen:
- “Keeper of the Middle Colonies”

---

# Content Organization Requirements

Organize the questions by category:

## Map Dash
Use these concepts:
- Delaware
- False: Pacific Ocean to the east
- Appalachian Mountains
- Breadbasket Colonies
- Fertile soil
- Agriculture
- Corn and wheat
- Homes and ships

## Penn’s Peace Path
Use these concepts:
- William Penn
- Quakers
- Equality / fairness
- No chosen speakers
- Slavery
- Army
- Religious freedom
- True: escaping unfair treatment
- Fair / peaceful treatment of Native Americans
- Persecuted

## Franklin’s Lightning Lab
Use these concepts:
- Lightning rod
- False: Franklin was not President
- Franklin Stove
- Manufactured iron items

## Colony Town Challenge
Use these concepts:
- Self-government
- Legislature
- Enslaved workers
- False: social structure statement
- Temporary workers
- Apprentice
- Journeyman

## Governor’s Gate
Use mixed review questions from all groups.

---

# Phase 1 — Project Skeleton and Game Shell

In this phase, build the basic app shell only.

## Build:
- Main app layout
- Title screen / landing screen
- Main quest hub screen
- Four locked/unlocked mini-game cards
- A relic progress area showing the 4 relics
- Final challenge gate card, locked until all four mini-games are completed
- A simple overall state structure for tracking progress
- Routing or screen-state navigation between the hub and mini-games
- Placeholder screens for each mini-game and the final challenge
- A simple victory screen placeholder

## Do not build yet:
- Actual question gameplay
- Scoring logic beyond basic completion flags
- Rich styling beyond a good starter UI
- Audio
- Advanced animation

## State shape should support:
- which mini-games are complete
- which relics are earned
- whether Governor’s Gate is unlocked
- current screen
- optional future score/progress expansion

## Deliverable goal:
The user should be able to launch the app, view the quest hub, click into placeholder mini-game screens, and see a coherent game shell.

When Phase 1 is complete, stop.

---

# Phase 2 — Structured Game Data

In this phase, create the content system.

## Build:
- A typed data model for questions
- A typed data model for mini-games
- Centralized game content file(s)
- Question sets for each mini-game
- Mixed review pool for Governor’s Gate
- Support for different question types:
  - multiple choice
  - true/false
  - fill-in-the-blank using buttons or choices
  - simple scenario choice if useful

## Requirements:
- Keep answers age-appropriate and clear
- Keep wording close to the source facts
- Add short positive feedback text for correct answers
- Add short gentle correction text for incorrect answers
- Avoid ambiguous answer sets
- Ensure all 28 facts are represented

## Also build:
- utility helpers for shuffling questions
- helper to normalize progress
- helper to unlock Governor’s Gate when appropriate

## Do not build yet:
- Full interactive mini-game mechanics
- Final visual polish
- Reward celebration screens beyond basic placeholders

When Phase 2 is complete, stop.

---

# Phase 3 — Build Mini-game 1: Map Dash

In this phase, fully implement Map Dash.

## Theme:
A geography and land-based adventure challenge.

## Desired gameplay:
- Fast, playful question flow
- Could be card-flip, map selection, path stepping, or multiple choice
- Must feel visually distinct from other mini-games

## Must teach:
- Delaware
- Pacific Ocean false statement
- Appalachian Mountains
- Breadbasket Colonies
- Fertile soil
- Agriculture
- Corn and wheat
- Ships

## Build:
- A complete playable mini-game
- Intro panel explaining the mission
- Question flow
- Correct / incorrect feedback
- Progress indicator
- Completion state
- Award relic: Explorer Compass
- Return to quest hub after completion

## UX:
- Kid-friendly
- Clear buttons
- No frustrating punishment
- Optionally allow retry for missed questions
- At end, mark mini-game complete in global progress

When Phase 3 is complete, stop.

---

# Phase 4 — Build Mini-game 2: Penn’s Peace Path

In this phase, fully implement Penn’s Peace Path.

## Theme:
A story-like path of choices around William Penn and Quaker beliefs.

## Desired gameplay:
- Narrative decision path
- Character prompts
- Peaceful mission vibe
- More story-driven than Map Dash

## Must teach:
- William Penn
- Quakers
- Fairness and equality
- No chosen speakers in meetings
- Slavery
- Army
- Religious freedom
- True statement about escaping unfair treatment
- Penn’s fair / peaceful treatment of Native Americans
- Persecuted

## Build:
- A complete playable mini-game
- Story intro
- Sequential decisions/questions
- Supportive feedback
- Completion state
- Award relic: Peace Key
- Return to quest hub after completion

## UX:
- Make it feel different from Map Dash
- Include simple character text boxes if helpful
- Keep pace brisk

When Phase 4 is complete, stop.

---

# Phase 5 — Build Mini-game 3: Franklin’s Lightning Lab

In this phase, fully implement Franklin’s Lightning Lab.

## Theme:
An inventor’s lab with science and city-industry challenges.

## Desired gameplay:
- Puzzle-like feeling
- Help Franklin solve town problems
- Slightly more mechanical or problem-solving themed

## Must teach:
- Lightning rod
- False statement about Franklin becoming President
- Franklin Stove
- Manufactured iron items

## Build:
- A complete playable mini-game
- Intro mission screen
- Question/puzzle loop
- Correct / incorrect educational feedback
- Completion state
- Award relic: Spark Crystal
- Return to quest hub after completion

## UX:
- Distinct visual identity from other mini-games
- Light science/invention flavor
- Simple and fun, not complicated

When Phase 5 is complete, stop.

---

# Phase 6 — Build Mini-game 4: Colony Town Challenge

In this phase, fully implement Colony Town Challenge.

## Theme:
A colonial town where the player helps different people and learns how society worked.

## Desired gameplay:
- Town-stop or station-based challenge
- Role sorting / dialogue / matching / Q&A hybrid
- Slight sense of moving through a town

## Must teach:
- Self-government
- Legislature
- Enslaved workers
- False social structure statement
- Temporary workers
- Apprentice
- Journeyman

## Build:
- A complete playable mini-game
- Intro mission screen
- Multi-step town challenge
- Progress tracking
- Completion state
- Award relic: Colony Seal
- Return to quest hub after completion

## UX:
- Make town stations visually clear
- Make the learning feel grounded in daily life

When Phase 6 is complete, stop.

---

# Phase 7 — Build The Governor’s Gate Final Challenge

In this phase, implement the final challenge.

## Unlock rule:
Only available after all 4 relics are earned.

## Desired gameplay:
- Feels like the grand finale
- Mixed questions from all mini-games
- Slightly more epic presentation
- Not too hard or stressful

## Build:
- Final gate intro
- Mixed review question sequence
- Use randomized question selection from across all categories
- Completion logic
- Victory outcome
- Final title:
  - Keeper of the Middle Colonies

## Also add:
- a celebratory win screen
- summary of relics earned
- replay option
- option to return to hub

When Phase 7 is complete, stop.

---

# Phase 8 — Polish, Feedback, and Cohesion

In this phase, improve the overall game quality.

## Polish:
- Better visual consistency across all screens
- Better spacing, color, buttons, and hierarchy
- Better feedback messages
- Add lightweight transitions if appropriate
- Improve readability
- Ensure mobile responsiveness
- Improve accessibility labels
- Add restart / reset progress option
- Add a parent-friendly progress reset confirmation
- Add simple completion badges or checkmarks

## Also review:
- educational accuracy
- consistency of game tone
- code organization
- duplicate logic extraction
- simple refactors where useful

## Do not:
- overcomplicate architecture
- add unnecessary dependencies
- add backend systems

When Phase 8 is complete, stop.

---

# Phase 9 — Optional Stretch Goals (Do Not Start Unless Asked)

Possible future improvements:
- sound effects
- save progress to localStorage
- animated map
- avatar selection
- parent dashboard for review
- printable certificate
- difficulty modes
- timed mode
- accessibility mode with larger text and simplified controls

Do not build Phase 9 unless explicitly requested.

---

# Implementation Notes

Use these principles throughout:
- Prefer reusable components like:
  - ScreenShell
  - GameCard
  - ProgressRelics
  - QuestionCard
  - FeedbackPanel
  - CompletionModal
- Keep game data separate from rendering logic
- Keep question validation simple and reliable
- Wrong answers should teach, not punish
- Use cheerful headings and short instructions
- Favor clarity over flashy complexity

---

# Start Now

Begin with Phase 1 only.

Remember:
- complete only Phase 1
- then stop
- then summarize what was built, what files changed, and what comes next