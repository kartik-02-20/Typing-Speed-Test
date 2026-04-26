const WORD_BANK = [
  "the","and","for","are","but","not","you","all","can","had","her","was","one","our","out","day","get","has","him","his","how","man","new","now","old","see","two","way","who","boy","did","its","let","put","say","she","too","use","dad","mom","big","end","far","few","got","run","set","sun","top","try","act","age","ago","air","arm","ask","bad","bag","bay","bed","bit","box","bus","buy","car","cut","dog","dry","due","ear","eat","eye","fat","fit","fly","fun","gas","god","gun","gut","gym","hit","hot","ice","job","joy","key","kid","law","lay","leg","lip","log","lot","low","map","mix","mud","net","odd","oil","own","pay","pet","pig","pop","pot","pro","raw","red","rid","rim","rod","row","rub","rug","sad","sap","sit","six","sky","sky","sly","sob","sod","son","sow","sip","spa","spy","sub","tab","tag","tan","tap","tar","tax","tip","toe","ton","toy","tub","tug","urn","van","via","war","web","wet","win","wit","woe","won","yam","zoo","able","area","army","away","baby","back","ball","band","bank","base","bath","bear","beat","been","bell","best","bill","bird","blow","blue","boat","body","bomb","bond","bone","book","bore","born","boss","both","bowl","bulk","burn","bush","busy","cake","call","calm","came","camp","card","care","case","cash","cast","cave","cell","chat","chip","city","clan","clay","clip","club","code","coin","cold","come","cook","cool","copy","cord","core","corn","cost","crew","crop","dark","data","date","dead","deal","dear","debt","deck","deed","deep","deny","desk","diet","dire","disk","dock","does","done","door","dose","down","draw","drew","drop","drug","drum","dual","dull","dump","dusk","dust","duty","each","earn","ease","east","echo","edge","else","emit","epic","even","ever","evil","exam","exit","face","fact","fail","fair","fake","fall","fame","farm","fast","fate","feel","feet","fell","felt","file","fill","film","find","fine","fire","firm","fish","fist","five","flag","flat","flaw","fled","fled","flex","flip","flow","foam","folk","fond","food","foot","fore","fork","form","fort","foul","four","free","from","fuel","full","fund","fuse","gain","gate","gave","gift","girl","give","glad","glow","glue","goal","goes","gold","golf","good","grab","gray","grew","grid","grip","grow","gulf","guru","gust","hack","half","hall","halt","hand","hang","hard","harm","hate","have","head","heal","heap","heat","heel","held","hell","help","herb","here","hero","hide","high","hill","hint","hire","hold","hole","holy","home","hope","horn","host","hour","huge","hung","hunt","hurt","idea","idle","inch","into","iron","item","join","just","keep","kept","kill","kind","king","kiss","knew","know","lack","lady","laid","lake","land","lane","lash","last","late","lead","leaf","lean","leap","left","lend","less","life","lift","like","line","link","list","live","load","lock","lone","long","look","lord","lose","loss","lost","love","luck","lung","made","mail","main","make","male","many","mark","mask","mass","math","meal","mean","meet","melt","menu","mere","mesh","mild","mile","milk","mill","mind","mine","miss","mist","mode","moon","more","most","move","much","must","myth","name","navy","near","neck","need","next","nice","nine","node","none","noon","norm","note","null","oath","once","open","oral","over","pace","pack","page","pain","pair","palm","park","part","pass","past","path","peak","peel","peer","pick","pile","pill","pine","pink","pipe","plan","play","plop","plot","plow","plus","poem","poet","poll","pool","poor","port","pose","post","pour","prey","prop","pull","pump","pure","push","quit","race","rage","rail","rain","rake","rank","rate","read","real","reap","rear","reel","rely","rent","rest","rice","rich","ride","ring","riot","rise","risk","road","roam","roar","rock","role","roll","roof","room","root","rope","rose","rude","rule","rush","safe","said","sail","sake","salt","same","sand","sang","sank","save","scan","scar","seek","seem","seen","self","sell","send","sent","sick","side","sign","silk","sing","sink","site","size","skin","slam","slap","slim","slip","slot","slow","slum","smug","snap","snow","soak","soar","sock","soft","soil","some","song","soon","sort","soul","soup","sour","span","spin","spit","spot","stem","step","stir","stop","such","suit","sung","sunk","sure","surf","swap","sway","swim","swing","tale","talk","tall","tank","tart","task","team","tear","tell","tend","tent","term","text","than","that","them","then","they","thin","this","thus","tide","till","time","tiny","tire","toad","told","toll","tone","took","tool","torn","town","trap","trek","trim","trip","true","tube","tune","tusk","twin","type","ugly","unto","upon","user","vary","vast","very","view","vile","vine","void","vote","wade","wage","wake","walk","wall","want","ward","warm","warn","warp","wart","wash","weak","weed","week","well","went","were","west","what","when","whip","wide","wife","wild","will","wind","wine","wing","wire","wise","wish","with","wolf","worm","wrap","wren","writ","yard","year","your","zero","zone"
];

function getWords(n) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
  return arr.join(' ');
}

// State
let fullText = '';
let typedIndex = 0;
let correctCount = 0;
let errorCount = 0;
let totalTyped = 0;
let timer = null;
let timeLeft = 60;
let maxTime = 60;
let started = false;
let finished = false;
let wpmHistory = [];

// DOM references
const textDisplay = document.getElementById('text-display');
const hiddenInput = document.getElementById('hidden-input');
const typingBox = document.getElementById('typing-box');
const timerDisplay = document.getElementById('timer-display');
const timerRing = document.getElementById('timer-ring');
const wpmDisplay = document.getElementById('wpm-display');
const accDisplay = document.getElementById('acc-display');
const resultsEl = document.getElementById('results');
const clickHint = document.getElementById('click-hint');

const CIRC = 2 * Math.PI * 22; // 138.2

function renderText() {
  textDisplay.innerHTML = '';
  for (let i = 0; i < fullText.length; i++) {
    const span = document.createElement('span');
    span.textContent = fullText[i];
    span.classList.add('char');
    if (i < typedIndex) {
      span.classList.add(wpmHistory[i] === false ? 'wrong' : 'correct');
    } else if (i === typedIndex) {
      span.classList.add('cursor');
    }
    textDisplay.appendChild(span);
  }
}

function initTest() {
  fullText = getWords(120);
  typedIndex = 0;
  correctCount = 0;
  errorCount = 0;
  totalTyped = 0;
  wpmHistory = [];
  started = false;
  finished = false;
  timeLeft = maxTime;
  clearInterval(timer);
  hiddenInput.value = '';
  updateTimerRing();
  timerDisplay.textContent = timeLeft;
  wpmDisplay.textContent = '0';
  accDisplay.textContent = '100';
  resultsEl.classList.remove('show');
  renderText();
  clickHint.textContent = '[ click the box or press any key to start ]';
}

function startTimer() {
  started = true;
  clickHint.textContent = '';
  typingBox.classList.add('active');
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft;
    updateTimerRing();
    updateWPM();
    if (timeLeft <= 0) endTest();
  }, 1000);
}

function updateTimerRing() {
  const pct = timeLeft / maxTime;
  timerRing.style.strokeDashoffset = CIRC * (1 - pct);
  if (pct < 0.25) timerRing.style.stroke = '#ff5f57';
  else if (pct < 0.5) timerRing.style.stroke = '#ffbc57';
  else timerRing.style.stroke = '#e8ff57';
}

function updateWPM() {
  const elapsed = (maxTime - timeLeft) || 1;
  const wpm = Math.round((correctCount / 5) / (elapsed / 60));
  wpmDisplay.textContent = wpm;
  const acc = totalTyped > 0 ? Math.round((correctCount / totalTyped) * 100) : 100;
  accDisplay.textContent = acc;
}

function endTest() {
  clearInterval(timer);
  finished = true;
  typingBox.classList.remove('active');
  hiddenInput.blur();

  const elapsed = maxTime;
  const wpm = Math.round((correctCount / 5) / (elapsed / 60));
  const acc = totalTyped > 0 ? Math.round((correctCount / totalTyped) * 100) : 100;

  document.getElementById('res-wpm').textContent = wpm;
  document.getElementById('res-acc').textContent = acc + '%';
  document.getElementById('res-correct').textContent = correctCount;
  document.getElementById('res-errors').textContent = errorCount;

  // grade
  const badge = document.getElementById('grade-badge');
  let grade, bgColor, textColor;
  if (wpm >= 100) { grade = '🏆 expert'; bgColor = '#e8ff57'; textColor = '#0d0d0f'; }
  else if (wpm >= 70) { grade = '⚡ advanced'; bgColor = '#57ffda'; textColor = '#0d0d0f'; }
  else if (wpm >= 50) { grade = '✓ intermediate'; bgColor = '#2a2a34'; textColor = '#f0f0f2'; }
  else { grade = '↗ keep practicing'; bgColor = '#2a2a34'; textColor = '#6b6b80'; }
  badge.textContent = grade;
  badge.style.background = bgColor;
  badge.style.color = textColor;

  saveScore(wpm, acc, maxTime + 's');
  renderLeaderboard();
  resultsEl.classList.add('show');
  clickHint.textContent = '';
}

function saveScore(wpm, acc, mode) {
  let scores = JSON.parse(localStorage.getItem('tt_scores') || '[]');
  scores.push({ wpm, acc, mode, ts: Date.now() });
  scores.sort((a, b) => b.wpm - a.wpm);
  scores = scores.slice(0, 8);
  localStorage.setItem('tt_scores', JSON.stringify(scores));
}

function renderLeaderboard() {
  const scores = JSON.parse(localStorage.getItem('tt_scores') || '[]');
  const lb = document.getElementById('lb-list');
  if (!scores.length) {
    lb.innerHTML = '<div style="color:var(--muted);font-family:var(--mono);font-size:0.8rem;text-align:center;padding:1rem">no scores yet</div>';
    return;
  }
  lb.innerHTML = scores.map((s, i) => `
    <div class="lb-row">
      <span class="lb-rank">#${i + 1}</span>
      <span class="lb-wpm">${s.wpm} wpm</span>
      <span class="lb-acc">${s.acc}%</span>
      <span class="lb-mode">${s.mode}</span>
      ${i === 0 ? '<span class="lb-new">★ best</span>' : ''}
    </div>
  `).join('');
}

// Input handler
hiddenInput.addEventListener('input', () => {
  if (finished) return;
  if (!started) startTimer();

  const val = hiddenInput.value;
  if (!val.length) return;
  const ch = val[val.length - 1];
  hiddenInput.value = '';

  if (typedIndex >= fullText.length) return;

  const expected = fullText[typedIndex];
  totalTyped++;

  if (ch === expected) {
    wpmHistory[typedIndex] = true;
    correctCount++;
    typedIndex++;
  } else {
    wpmHistory[typedIndex] = false;
    errorCount++;
    typedIndex++;
    typingBox.classList.add('error-shake');
    setTimeout(() => typingBox.classList.remove('error-shake'), 300);
  }

  // Auto-extend text if near end
  if (typedIndex > fullText.length - 30) {
    fullText += ' ' + getWords(40);
  }

  renderText();
  updateWPM();

  // Animate WPM display
  wpmDisplay.classList.remove('pulse');
  void wpmDisplay.offsetWidth;
  wpmDisplay.classList.add('pulse');
});

// Focus handlers
typingBox.addEventListener('click', () => {
  if (!finished) hiddenInput.focus();
});

document.addEventListener('keydown', (e) => {
  if (!finished && !started && e.key.length === 1) {
    hiddenInput.focus();
  }
});

// Mode selector
document.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    maxTime = parseInt(btn.dataset.time);
    initTest();
  });
});

// Reset / New buttons
document.getElementById('reset-btn').addEventListener('click', initTest);
document.getElementById('new-btn').addEventListener('click', initTest);

// Init on load
initTest();
