import { useEffect, useState } from 'react';

type ResourceKey = 'gold' | 'food' | 'wood' | 'health';

type Resources = Record<ResourceKey, number>;

type Reward = Partial<Resources>;

type TriviaEncounter = {
  type: 'trivia';
  id: string;
  title: string;
  portrait: string;
  intro: string;
  prompt: string;
  options: string[];
  answerIndex: number;
  reward: Reward;
  strangeFact: string;
};

type HangmanEncounter = {
  type: 'hangman';
  id: string;
  title: string;
  portrait: string;
  intro: string;
  clue: string;
  word: string;
  reward: Reward;
  strangeFact: string;
};

type WordSearchEncounter = {
  type: 'wordsearch';
  id: string;
  title: string;
  portrait: string;
  intro: string;
  instruction: string;
  words: string[];
  reward: Reward;
  strangeFact: string;
};

type EventChoice = {
  label: string;
  message: string;
  effect: Reward;
};

type EventEncounter = {
  type: 'event';
  id: string;
  title: string;
  portrait: string;
  intro: string;
  prompt: string;
  choices: EventChoice[];
  strangeFact: string;
};

type Encounter = TriviaEncounter | HangmanEncounter | WordSearchEncounter | EventEncounter;

type Region = {
  name: string;
  sky: string;
  mid: string;
  ground: string;
  accent: string;
};

type ResultPayload = {
  message: string;
  reward?: Reward;
  damage?: number;
  strangeFact: string;
};

type WordPlacement = {
  word: string;
  cells: number[];
};

type WordPuzzle = {
  size: number;
  cells: string[];
  placements: WordPlacement[];
};

const REGIONS: Region[] = [
  {
    name: 'New York Harbor',
    sky: 'linear-gradient(180deg, #8bc6ff 0%, #dff3ff 52%, #f9d2a8 100%)',
    mid: '#94b0c6',
    ground: '#7f9b63',
    accent: '#f7cf72',
  },
  {
    name: 'Delaware Valley',
    sky: 'linear-gradient(180deg, #8fe0c8 0%, #cff6e7 48%, #f5d49a 100%)',
    mid: '#6d9f7d',
    ground: '#6c8b4d',
    accent: '#e8f59d',
  },
  {
    name: 'Philadelphia Road',
    sky: 'linear-gradient(180deg, #a6d7ff 0%, #f1f7ff 54%, #f0c89a 100%)',
    mid: '#9f8b75',
    ground: '#8d6d4e',
    accent: '#ffe28a',
  },
  {
    name: 'Breadbasket Fields',
    sky: 'linear-gradient(180deg, #7bc4ff 0%, #ccecff 50%, #f4d59a 100%)',
    mid: '#90a96c',
    ground: '#748d4f',
    accent: '#f4f099',
  },
  {
    name: 'Appalachian Foothills',
    sky: 'linear-gradient(180deg, #8da1d6 0%, #dfe6ff 50%, #f2c594 100%)',
    mid: '#6e6d8e',
    ground: '#6d745a',
    accent: '#ffdf86',
  },
];

const ENCOUNTERS: Encounter[] = [
  {
    type: 'trivia',
    id: 'harbor-1',
    title: 'Harbor Checkpoint',
    portrait: '⚓',
    intro: 'The harbor master leans over the ledger and points west.',
    prompt: 'Which colony completed the Middle Colonies set with New York, New Jersey, and Pennsylvania?',
    options: ['Delaware', 'Virginia', 'Massachusetts', 'Georgia'],
    answerIndex: 0,
    reward: { gold: 12, food: 8 },
    strangeFact: 'Strange fact: colonial port records often listed ships by cargo before captain, because the cargo mattered more to customs.',
  },
  {
    type: 'trivia',
    id: 'penn-1',
    title: 'Penn Speaks Plainly',
    portrait: '🎩',
    intro: 'William Penn asks one clean question and expects one clean answer.',
    prompt: 'Pennsylvania was founded as a refuge primarily for which religious group?',
    options: ['Quakers', 'Puritans', 'Anglicans', 'Catholics'],
    answerIndex: 0,
    reward: { wood: 10, food: 10 },
    strangeFact: 'Strange fact: Penn wanted Philadelphia to have broad streets partly because London fires had shown how dangerous cramped streets could be.',
  },
  {
    type: 'hangman',
    id: 'hangman-quaker',
    title: 'Meetinghouse Mystery',
    portrait: '🕯️',
    intro: 'A quiet meetinghouse offers supplies if you solve its sacred password.',
    clue: 'Members of the Society of Friends',
    word: 'QUAKER',
    reward: { food: 20, health: 4 },
    strangeFact: 'Strange fact: many Quakers preferred plain dress and plain speech, avoiding titles like Mister and Madam.',
  },
  {
    type: 'wordsearch',
    id: 'breadbasket-search',
    title: 'Breadbasket Harvest',
    portrait: '🌾',
    intro: 'The farm steward grins. "Drag through the crops and we share the haul."',
    instruction: 'Drag in a straight line to mark each crop word.',
    words: ['WHEAT', 'RYE', 'CORN', 'OATS'],
    reward: { food: 24, gold: 8 },
    strangeFact: 'Strange fact: the Middle Colonies exported so much grain that flour barrels became a familiar sight all around the Atlantic world.',
  },
  {
    type: 'event',
    id: 'market-square',
    title: 'Market Square',
    portrait: '🧺',
    intro: 'A crowded square hums with shouting traders and hot pie smoke.',
    prompt: 'A vendor offers a quick deal before sunset. What do you want?',
    choices: [
      { label: 'Trade 8 gold for 18 food', message: 'You leave with bread, smoked fish, and a grin.', effect: { gold: -8, food: 18 } },
      { label: 'Trade 6 gold for 14 wood', message: 'Fresh timber is stacked onto the wagon.', effect: { gold: -6, wood: 14 } },
      { label: 'Rest by the fountain', message: 'A short rest steadies the party.', effect: { health: 10 } },
    ],
    strangeFact: 'Strange fact: open-air markets were noisy enough that some colonial visitors compared them to theater performances.',
  },
  {
    type: 'trivia',
    id: 'franklin-paper',
    title: 'Franklin Wants Speed',
    portrait: '⚡',
    intro: 'Benjamin Franklin taps a bundle of papers and says, "No speeches. Answer fast."',
    prompt: 'What was the Pennsylvania Gazette?',
    options: ['A newspaper', 'A courthouse', 'A warship', 'A school'],
    answerIndex: 0,
    reward: { gold: 18 },
    strangeFact: 'Strange fact: Franklin sometimes used fake letters from invented characters in his newspaper just to stir debate.',
  },
  {
    type: 'wordsearch',
    id: 'print-shop-search',
    title: 'Print Shop Scramble',
    portrait: '🖨️',
    intro: 'The pressroom is chaos. Ink everywhere. Find the trade words before the next sheet runs.',
    instruction: 'Drag across letters to collect printer words.',
    words: ['PRESS', 'INK', 'TYPE', 'PAPER'],
    reward: { gold: 20, wood: 8 },
    strangeFact: 'Strange fact: colonial printers often doubled as postmasters, booksellers, political operators, and rumor engines.',
  },
  {
    type: 'hangman',
    id: 'hangman-liberty',
    title: 'Tavern Back Room',
    portrait: '🍻',
    intro: 'A coded note is pinned behind the ale casks. Crack it to gain safe passage.',
    clue: 'A core colonial ideal tied to freedom',
    word: 'LIBERTY',
    reward: { health: 8, gold: 16 },
    strangeFact: 'Strange fact: taverns were so important to colonial politics that lawmakers regularly complained they were half parliament, half trouble.',
  },
  {
    type: 'trivia',
    id: 'hudson-1',
    title: 'River Question',
    portrait: '🚣',
    intro: 'A ferryman squints at your wagon and asks payment in knowledge.',
    prompt: 'Which river helped New York become a major trade gateway?',
    options: ['Hudson River', 'James River', 'Savannah River', 'Connecticut River'],
    answerIndex: 0,
    reward: { wood: 12, food: 8 },
    strangeFact: 'Strange fact: river travel could be faster than road travel, but one bad current could still turn cargo into floating wreckage.',
  },
  {
    type: 'trivia',
    id: 'breadbasket-1',
    title: 'Field Exam',
    portrait: '🚜',
    intro: 'A farmer wipes his brow and points to the fields behind him.',
    prompt: 'Why were the Middle Colonies nicknamed the Breadbasket Colonies?',
    options: ['They grew large amounts of grain', 'They made the most baskets', 'They imported all the bread', 'They taxed flour mills'],
    answerIndex: 0,
    reward: { food: 22 },
    strangeFact: 'Strange fact: some farms produced enough wheat to send flour to the Caribbean, where plantation islands depended on imported food.',
  },
  {
    type: 'trivia',
    id: 'franklin-lightning',
    title: 'Storm Lesson',
    portrait: '⛈️',
    intro: 'Franklin points at a storm cloud and raises one eyebrow.',
    prompt: 'Franklin’s lightning rod was designed to protect buildings from what danger?',
    options: ['Fire', 'Flooding', 'Snow', 'Locusts'],
    answerIndex: 0,
    reward: { gold: 22, health: 6 },
    strangeFact: 'Strange fact: some people thought lightning rods were suspicious because they seemed to interfere with divine will.',
  },
];

const INITIAL_RESOURCES: Resources = {
  gold: 36,
  food: 52,
  wood: 24,
  health: 100,
};

function clampResources(resources: Resources): Resources {
  return {
    gold: Math.max(0, resources.gold),
    food: Math.max(0, resources.food),
    wood: Math.max(0, resources.wood),
    health: Math.min(100, Math.max(0, resources.health)),
  };
}

function applyReward(resources: Resources, reward: Reward = {}, damage = 0): Resources {
  return clampResources({
    gold: resources.gold + (reward.gold ?? 0),
    food: resources.food + (reward.food ?? 0),
    wood: resources.wood + (reward.wood ?? 0),
    health: resources.health + (reward.health ?? 0) - damage,
  });
}

function describeReward(reward?: Reward, damage = 0): string {
  const parts: string[] = [];
  if (reward?.gold) parts.push(`${reward.gold > 0 ? '+' : ''}${reward.gold} gold`);
  if (reward?.food) parts.push(`${reward.food > 0 ? '+' : ''}${reward.food} food`);
  if (reward?.wood) parts.push(`${reward.wood > 0 ? '+' : ''}${reward.wood} wood`);
  if (reward?.health) parts.push(`${reward.health > 0 ? '+' : ''}${reward.health} health`);
  if (damage) parts.push(`-${damage} health`);
  return parts.join(' • ');
}

function App() {
  const [mode, setMode] = useState<'title' | 'playing' | 'end'>('title');
  const [turnIndex, setTurnIndex] = useState(0);
  const [phase, setPhase] = useState<'travel' | 'encounter'>('travel');
  const [resources, setResources] = useState<Resources>(INITIAL_RESOURCES);
  const [travelTick, setTravelTick] = useState(0);
  const [statusText, setStatusText] = useState('Harnessing the oxen.');
  const [resultText, setResultText] = useState('');
  const [factLog, setFactLog] = useState<string[]>([]);
  const [endMessage, setEndMessage] = useState('');

  const encounter = ENCOUNTERS[turnIndex];
  const progress = ENCOUNTERS.length === 0 ? 0 : (turnIndex / ENCOUNTERS.length) * 100;
  const regionIndex = Math.min(REGIONS.length - 1, Math.floor((progress / 100) * REGIONS.length));
  const region = REGIONS[regionIndex];

  useEffect(() => {
    if (mode !== 'playing' || phase !== 'travel') {
      return undefined;
    }

    const tickTimer = window.setInterval(() => {
      setTravelTick((value) => value + 1);
    }, 420);

    const travelTimer = window.setTimeout(() => {
      setPhase('encounter');
    }, 1800);

    return () => {
      window.clearInterval(tickTimer);
      window.clearTimeout(travelTimer);
    };
  }, [mode, phase, turnIndex]);

  function startGame() {
    setMode('playing');
    setTurnIndex(0);
    setPhase('travel');
    setResources(INITIAL_RESOURCES);
    setTravelTick(0);
    setResultText('');
    setFactLog([]);
    setStatusText('Leaving the harbor at dawn.');
    setEndMessage('');
  }

  function finishJourney(message: string) {
    setEndMessage(message);
    setMode('end');
  }

  function resolveEncounter(payload: ResultPayload) {
    const nextResources = applyReward(resources, payload.reward, payload.damage ?? 0);
    const rewardText = describeReward(payload.reward, payload.damage ?? 0);
    const nextLog = [...factLog, payload.strangeFact];

    setResources(nextResources);
    setFactLog(nextLog);
    setResultText(rewardText ? `${payload.message} ${rewardText}.` : payload.message);

    if (nextResources.health <= 0) {
      window.setTimeout(() => {
        finishJourney('The wagon stalls, the party collapses, and the road wins this round.');
      }, 1100);
      return;
    }

    if (turnIndex >= ENCOUNTERS.length - 1) {
      window.setTimeout(() => {
        finishJourney('You reach the Appalachians with stories, supplies, and a wagon full of hard-won facts.');
      }, 1100);
      return;
    }

    window.setTimeout(() => {
      setTurnIndex((value) => value + 1);
      setPhase('travel');
      setStatusText('The wagon rolls on toward the next landmark.');
      setResultText('');
    }, 1300);
  }

  if (mode === 'title') {
    return (
      <main className="page-shell">
        <section className="title-card">
          <div className="title-kicker">Middle Colonies Adventure</div>
          <h1>Colonial Trail RPG</h1>
          <p>
            Keep the wagon moving, answer sharp history questions, solve hangman clues, and drag through
            real word searches while the road stays on screen the whole time.
          </p>
          <div className="title-features">
            <span>Direct questions</span>
            <span>Working drag word search</span>
            <span>Strange facts after each stop</span>
          </div>
          <button className="primary-button" onClick={startGame}>
            Start the Journey
          </button>
        </section>
      </main>
    );
  }

  if (mode === 'end') {
    return (
      <main className="page-shell">
        <section className="game-frame end-frame">
          <TravelScene
            progress={100}
            region={REGIONS[REGIONS.length - 1]}
            traveling={false}
            travelTick={travelTick}
            nextStop="Journey Complete"
          />
          <section className="console-shell">
            <div className="panel-header">
              <span className="panel-badge">Journey End</span>
              <span className="panel-step">{factLog.length} strange facts collected</span>
            </div>
            <h2>The Road is Yours</h2>
            <p className="panel-copy">{endMessage}</p>
            <div className="stats-strip compact-stats">
              <Stat label="Gold" value={resources.gold} />
              <Stat label="Food" value={resources.food} />
              <Stat label="Wood" value={resources.wood} />
              <Stat label="Health" value={resources.health} />
            </div>
            <div className="fact-scroll">
              {factLog.map((fact, index) => (
                <div className="fact-item" key={`${fact}-${index}`}>
                  {fact}
                </div>
              ))}
            </div>
            <button className="primary-button" onClick={startGame}>
              Play Again
            </button>
          </section>
        </section>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <section className="game-frame">
        <TravelScene
          progress={progress}
          region={region}
          traveling={phase === 'travel'}
          travelTick={travelTick}
          nextStop={encounter?.title ?? 'Final Ridge'}
        />
        <section className="console-shell">
          <div className="console-topbar">
            <div className="panel-header">
              <span className="panel-badge">{region.name}</span>
              <span className="panel-step">
                Stop {Math.min(turnIndex + 1, ENCOUNTERS.length)} / {ENCOUNTERS.length}
              </span>
            </div>
            <div className="stats-strip">
              <Stat label="Gold" value={resources.gold} />
              <Stat label="Food" value={resources.food} />
              <Stat label="Wood" value={resources.wood} />
              <Stat label="Health" value={resources.health} />
            </div>
          </div>

          {phase === 'travel' ? (
            <TravelConsole statusText={statusText} nextStop={encounter.title} resultText={resultText} />
          ) : (
            <EncounterPanel encounter={encounter} onResolve={resolveEncounter} turnKey={turnIndex} />
          )}
        </section>
      </section>
    </main>
  );
}

function TravelScene({
  progress,
  region,
  traveling,
  travelTick,
  nextStop,
}: {
  progress: number;
  region: Region;
  traveling: boolean;
  travelTick: number;
  nextStop: string;
}) {
  const bob = traveling ? travelTick % 2 : 0;

  return (
    <section className="scene-shell" style={{ ['--scene-sky' as string]: region.sky, ['--scene-mid' as string]: region.mid, ['--scene-ground' as string]: region.ground, ['--scene-accent' as string]: region.accent }}>
      <div className="scene-overlay" />
      <div className="scene-hud">
        <div>
          <span className="scene-label">Region</span>
          <strong>{region.name}</strong>
        </div>
        <div>
          <span className="scene-label">Next Stop</span>
          <strong>{nextStop}</strong>
        </div>
      </div>
      <div className={`cloud cloud-a ${traveling ? 'moving' : ''}`} />
      <div className={`cloud cloud-b ${traveling ? 'moving' : ''}`} />
      <div className={`ridge ridge-back ${traveling ? 'moving' : ''}`} />
      <div className={`ridge ridge-front ${traveling ? 'moving' : ''}`} />
      <div className={`tree-band ${traveling ? 'moving' : ''}`} />

      <div className="wagon-track">
        <div className="wagon-shadow" />
        <div className="wagon" style={{ transform: `translateY(${bob ? -2 : 0}px)` }}>
          <div className="wagon-cover" />
          <div className="wagon-body" />
          <div className="wagon-pole" />
          <div className="wagon-oxen" />
          <div className="wheel wheel-left" />
          <div className="wheel wheel-right" />
        </div>
      </div>

      <div className="route-meter">
        <div className="route-fill" style={{ width: `${progress}%` }} />
        <div className="route-stops">
          {REGIONS.map((stop) => (
            <span key={stop.name}>{stop.name}</span>
          ))}
        </div>
      </div>
    </section>
  );
}

function TravelConsole({ statusText, nextStop, resultText }: { statusText: string; nextStop: string; resultText: string }) {
  return (
    <section className="panel-shell travel-panel">
      <div className="travel-callout">{statusText}</div>
      <h2>On the Road</h2>
      <p className="panel-copy">
        Wheels rattle, oxen snort, and the road opens toward <strong>{nextStop}</strong>.
      </p>
      <div className="travel-beats">
        <div className="beat-card">Scan the horizon for the next landmark.</div>
        <div className="beat-card">Get ready for a direct question, puzzle, or trade choice.</div>
        <div className="beat-card">The wagon stays visible so the trip always feels alive.</div>
      </div>
      {resultText ? <div className="result-banner">{resultText}</div> : null}
    </section>
  );
}

function EncounterPanel({ encounter, onResolve, turnKey }: { encounter: Encounter; onResolve: (payload: ResultPayload) => void; turnKey: number }) {
  if (encounter.type === 'trivia') {
    return <TriviaPanel key={turnKey} encounter={encounter} onResolve={onResolve} />;
  }

  if (encounter.type === 'hangman') {
    return <HangmanPanel key={turnKey} encounter={encounter} onResolve={onResolve} />;
  }

  if (encounter.type === 'wordsearch') {
    return <WordSearchPanel key={turnKey} encounter={encounter} onResolve={onResolve} />;
  }

  return <EventPanel key={turnKey} encounter={encounter} onResolve={onResolve} />;
}

function TriviaPanel({ encounter, onResolve }: { encounter: TriviaEncounter; onResolve: (payload: ResultPayload) => void }) {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section className="panel-shell">
      <PanelIntro title={encounter.title} portrait={encounter.portrait} intro={encounter.intro} />
      <h2>{encounter.prompt}</h2>
      <div className="option-grid">
        {encounter.options.map((option, index) => {
          const isCorrect = index === encounter.answerIndex;
          const isSelected = selected === index;
          return (
            <button
              className={`option-button ${isSelected ? 'selected' : ''}`}
              disabled={selected !== null}
              key={option}
              onClick={() => {
                setSelected(index);
                onResolve({
                  message: isCorrect ? 'Correct. The wagon crew cheers and pockets the reward.' : 'Wrong answer. The road demands a little pain.',
                  reward: isCorrect ? encounter.reward : undefined,
                  damage: isCorrect ? 0 : 8,
                  strangeFact: encounter.strangeFact,
                });
              }}
            >
              <span>{String.fromCharCode(65 + index)}</span>
              <strong>{option}</strong>
              {selected !== null && isCorrect ? <em>Correct</em> : null}
            </button>
          );
        })}
      </div>
      <FactPreview fact={encounter.strangeFact} />
    </section>
  );
}

function EventPanel({ encounter, onResolve }: { encounter: EventEncounter; onResolve: (payload: ResultPayload) => void }) {
  return (
    <section className="panel-shell">
      <PanelIntro title={encounter.title} portrait={encounter.portrait} intro={encounter.intro} />
      <h2>{encounter.prompt}</h2>
      <div className="option-grid single-column">
        {encounter.choices.map((choice) => (
          <button
            className="option-button"
            key={choice.label}
            onClick={() => {
              const damage = choice.effect.gold && choice.effect.gold < 0 ? 0 : 0;
              onResolve({
                message: choice.message,
                reward: choice.effect,
                damage,
                strangeFact: encounter.strangeFact,
              });
            }}
          >
            <span>→</span>
            <strong>{choice.label}</strong>
          </button>
        ))}
      </div>
      <FactPreview fact={encounter.strangeFact} />
    </section>
  );
}

function HangmanPanel({ encounter, onResolve }: { encounter: HangmanEncounter; onResolve: (payload: ResultPayload) => void }) {
  const [guessed, setGuessed] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const wrongCount = guessed.filter((letter) => !encounter.word.includes(letter)).length;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const solved = encounter.word.split('').every((letter) => guessed.includes(letter));

  useEffect(() => {
    if (finished) {
      return;
    }

    if (solved) {
      setFinished(true);
      onResolve({
        message: 'You solve the code word before the tavern crowd catches on.',
        reward: encounter.reward,
        strangeFact: encounter.strangeFact,
      });
      return;
    }

    if (wrongCount >= 6) {
      setFinished(true);
      onResolve({
        message: `The answer was ${encounter.word}. The room goes cold for a second.`,
        damage: 10,
        strangeFact: encounter.strangeFact,
      });
    }
  }, [encounter.reward, encounter.strangeFact, encounter.word, finished, onResolve, solved, wrongCount]);

  return (
    <section className="panel-shell">
      <PanelIntro title={encounter.title} portrait={encounter.portrait} intro={encounter.intro} />
      <div className="minigame-layout">
        <div className="hangman-figure" aria-hidden="true">
          <div className="gallows" />
          <div className={`part head ${wrongCount >= 1 ? 'visible' : ''}`} />
          <div className={`part body ${wrongCount >= 2 ? 'visible' : ''}`} />
          <div className={`part arm-left ${wrongCount >= 3 ? 'visible' : ''}`} />
          <div className={`part arm-right ${wrongCount >= 4 ? 'visible' : ''}`} />
          <div className={`part leg-left ${wrongCount >= 5 ? 'visible' : ''}`} />
          <div className={`part leg-right ${wrongCount >= 6 ? 'visible' : ''}`} />
        </div>

        <div className="minigame-main">
          <h2>{encounter.clue}</h2>
          <div className="hangman-word">
            {encounter.word.split('').map((letter, index) => (
              <span key={`${letter}-${index}`}>{guessed.includes(letter) ? letter : ''}</span>
            ))}
          </div>
          <div className="keyboard-grid">
            {letters.map((letter) => (
              <button
                className="key-button"
                disabled={guessed.includes(letter) || finished}
                key={letter}
                onClick={() => {
                  if (!finished) {
                    setGuessed((value) => [...value, letter]);
                  }
                }}
              >
                {letter}
              </button>
            ))}
          </div>
          <FactPreview fact={encounter.strangeFact} />
        </div>
      </div>
    </section>
  );
}

function WordSearchPanel({ encounter, onResolve }: { encounter: WordSearchEncounter; onResolve: (payload: ResultPayload) => void }) {
  const [puzzle] = useState<WordPuzzle>(() => buildWordPuzzle(encounter.words, 10));
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [dragState, setDragState] = useState<{ active: boolean; start: number; end: number }>({ active: false, start: -1, end: -1 });
  const [message, setMessage] = useState('');
  const [finished, setFinished] = useState(false);

  const livePath = dragState.active ? computeLinePath(dragState.start, dragState.end, puzzle.size) : [];
  const selectedCells = livePath.length > 1 ? new Set(livePath) : new Set<number>();
  const foundCells = new Set(foundWords.flatMap((word) => puzzle.placements.find((placement) => placement.word === word)?.cells ?? []));

  useEffect(() => {
    if (!dragState.active) {
      return undefined;
    }

    function handlePointerMove(event: PointerEvent) {
      const node = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>('[data-cell-index]');
      if (!node) {
        return;
      }

      const nextIndex = Number(node.dataset.cellIndex);
      setDragState((current) => (current.active && current.end !== nextIndex ? { ...current, end: nextIndex } : current));
    }

    function handlePointerUp() {
      finalizeSelection();
    }

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp, { once: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [dragState.active, dragState.end, dragState.start, foundWords, puzzle.placements, puzzle.size]);

  useEffect(() => {
    if (!finished && foundWords.length === encounter.words.length) {
      setFinished(true);
      onResolve({
        message: 'Every word snaps into place. The whole wagon party celebrates the find.',
        reward: encounter.reward,
        strangeFact: encounter.strangeFact,
      });
    }
  }, [encounter.reward, encounter.strangeFact, encounter.words.length, finished, foundWords.length, onResolve]);

  function finalizeSelection() {
    const path = computeLinePath(dragState.start, dragState.end, puzzle.size);
    setDragState({ active: false, start: -1, end: -1 });

    if (path.length < 2) {
      setMessage('Drag in one straight line across a full word.');
      return;
    }

    const match = puzzle.placements.find((placement) => {
      if (foundWords.includes(placement.word)) {
        return false;
      }

      return samePath(placement.cells, path) || samePath([...placement.cells].reverse(), path);
    });

    if (!match) {
      setMessage('That line is not one of the hidden words.');
      return;
    }

    setFoundWords((value) => [...value, match.word]);
    setMessage(`Found ${match.word}. Keep dragging for the rest.`);
  }

  return (
    <section className="panel-shell">
      <PanelIntro title={encounter.title} portrait={encounter.portrait} intro={encounter.intro} />
      <div className="minigame-layout wordsearch-layout">
        <div className="word-list-box">
          <h2>{encounter.instruction}</h2>
          <div className="word-list">
            {encounter.words.map((word) => (
              <div className={`word-chip ${foundWords.includes(word) ? 'done' : ''}`} key={word}>
                {word}
              </div>
            ))}
          </div>
          <div className="hint-block">Drag through letters horizontally, vertically, or diagonally.</div>
          <FactPreview fact={encounter.strangeFact} />
        </div>

        <div className="word-grid" style={{ gridTemplateColumns: `repeat(${puzzle.size}, 1fr)` }}>
          {puzzle.cells.map((letter, index) => {
            const isFound = foundCells.has(index);
            const isSelected = selectedCells.has(index);
            return (
              <button
                className={`word-cell ${isFound ? 'found' : ''} ${isSelected ? 'selected' : ''}`}
                data-cell-index={index}
                key={index}
                onPointerDown={() => {
                  setDragState({ active: true, start: index, end: index });
                  setMessage('');
                }}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>
      <div className="result-banner subtle">{message || 'Find every word to win the round.'}</div>
    </section>
  );
}

function PanelIntro({ title, portrait, intro }: { title: string; portrait: string; intro: string }) {
  return (
    <div className="panel-intro">
      <div className="portrait-frame">{portrait}</div>
      <div>
        <div className="panel-badge">{title}</div>
        <p className="panel-copy">{intro}</p>
      </div>
    </div>
  );
}

function FactPreview({ fact }: { fact: string }) {
  return <div className="fact-preview">Reward includes a strange fact: {fact}</div>;
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="stat-pill">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function buildWordPuzzle(words: string[], size: number): WordPuzzle {
  const cells = Array.from({ length: size * size }, () => '');
  const placements: WordPlacement[] = [];
  const directions = [
    [0, 1],
    [1, 0],
    [1, 1],
    [-1, 1],
  ] as const;

  for (const word of words) {
    let placed = false;

    for (let attempt = 0; attempt < 300 && !placed; attempt += 1) {
      const [rowStep, colStep] = directions[Math.floor(Math.random() * directions.length)];
      const startRow = Math.floor(Math.random() * size);
      const startCol = Math.floor(Math.random() * size);
      const indices: number[] = [];

      for (let index = 0; index < word.length; index += 1) {
        const row = startRow + rowStep * index;
        const col = startCol + colStep * index;

        if (row < 0 || row >= size || col < 0 || col >= size) {
          indices.length = 0;
          break;
        }

        const cellIndex = row * size + col;
        const existing = cells[cellIndex];
        if (existing && existing !== word[index]) {
          indices.length = 0;
          break;
        }

        indices.push(cellIndex);
      }

      if (indices.length !== word.length) {
        continue;
      }

      indices.forEach((cellIndex, index) => {
        cells[cellIndex] = word[index];
      });
      placements.push({ word, cells: indices });
      placed = true;
    }

    if (!placed) {
      throw new Error(`Could not place word: ${word}`);
    }
  }

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let index = 0; index < cells.length; index += 1) {
    if (!cells[index]) {
      cells[index] = alphabet[Math.floor(Math.random() * alphabet.length)];
    }
  }

  return { size, cells, placements };
}

function computeLinePath(start: number, end: number, size: number): number[] {
  if (start < 0 || end < 0) {
    return [];
  }

  const startRow = Math.floor(start / size);
  const startCol = start % size;
  const endRow = Math.floor(end / size);
  const endCol = end % size;
  const rowDiff = endRow - startRow;
  const colDiff = endCol - startCol;

  const isStraight = rowDiff === 0 || colDiff === 0 || Math.abs(rowDiff) === Math.abs(colDiff);
  if (!isStraight) {
    return [];
  }

  const rowStep = rowDiff === 0 ? 0 : rowDiff / Math.abs(rowDiff);
  const colStep = colDiff === 0 ? 0 : colDiff / Math.abs(colDiff);
  const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
  const path: number[] = [];

  for (let offset = 0; offset <= steps; offset += 1) {
    const row = startRow + rowStep * offset;
    const col = startCol + colStep * offset;
    path.push(row * size + col);
  }

  return path;
}

function samePath(left: number[], right: number[]): boolean {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

export default App;

