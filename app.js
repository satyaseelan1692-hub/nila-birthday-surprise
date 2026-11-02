const el=id=>document.getElementById(id);
const questions=[
 {title:'Where did we<br><em>first meet?</em>',hint:'Every love story starts somewhere. Remember ours?',choices:['At a café','On the street','At college','At a party'],correct:1,reply:'Yes! One ordinary street. The beginning of my favorite story. ♡'},
 {title:'What’s your idea of<br><em>a perfect day with me?</em>',hint:'No wrong answers here. Just a little daydream about us.',choices:['A long drive and our favorite songs','A cozy movie night together','A little adventure somewhere new','Anywhere, as long as it’s with you'],reply:'A whole day with you? That already sounds perfect. ♡'},
 {title:'If our love were a movie,<br><em>what would you call it?</em>',hint:'You’re the leading lady. You get to choose the title.',choices:['My Favorite Person','A Million Little Moments','You, Me & Forever','The Best Kind of Love'],reply:'Whatever the title, you’ll always be my favorite part. ♡'},
 {title:'What should we collect<br><em>more of together?</em>',hint:'Here’s to everything still waiting for us.',choices:['Sunsets and long walks','Silly photos and inside jokes','Adventures and new places','All of these, with you'],reply:'Here’s to a lifetime of little moments worth keeping. ♡'},
 {title:'Why did you fall<br><em>in love with me?</em>',hint:'A little reason. A big feeling. Tell me in your own words.',note:true}
];
let step=0,answers=Array(questions.length).fill(null),confirmed=false;
function show(id,focus){document.querySelectorAll('.screen').forEach(s=>s.hidden=s.id!==id);window.scrollTo({top:0,behavior:'instant'});if(focus)el(focus).focus({preventScroll:true});}
function question(n){step=n;confirmed=false;const q=questions[n];el('questionHeading').innerHTML=q.title;el('questionHint').textContent=q.hint;el('stepLabel').textContent=`LITTLE LOVE NOTE ${String(n+1).padStart(2,'0')} / 05`;el('progress').replaceChildren(...questions.map((_,i)=>{const p=document.createElement('i');p.className=i<=n?'active':'';return p;}));el('choices').replaceChildren();el('noteField').hidden=!q.note;el('choiceFeedback').textContent='';el('continue').textContent=q.note?'My surprise is waiting  →':'Keep going  →';el('continue').disabled=!q.note;el('loveAnswer').required=!!q.note;
 if(q.note){el('loveAnswer').value=answers[n]||'';}else q.choices.forEach((text,i)=>{const b=document.createElement('button');b.type='button';b.className='choice';b.setAttribute('aria-pressed','false');const letter=document.createElement('span');letter.className='choice-letter';letter.textContent='ABCD'[i];const label=document.createElement('span');label.textContent=text;b.append(letter,label);b.addEventListener('click',()=>select(i));el('choices').append(b);});
 show('questions','questionHeading');if(!q.note&&answers[n]!==null)select(answers[n],false);
}
function select(i,celebrate=true){const q=questions[step];document.querySelectorAll('.choice').forEach((b,j)=>{b.classList.toggle('selected',i===j);b.setAttribute('aria-pressed',String(i===j));});if(q.correct!==undefined&&i!==q.correct){confirmed=false;el('choiceFeedback').textContent='Almost, my love. Think of the street where our story began. ♡';el('continue').disabled=true;return;}answers[step]=i;confirmed=true;el('choiceFeedback').textContent=q.reply;el('continue').disabled=false;if(celebrate){const next=step+1;showBouquet(q.reply,()=>question(next));}}
el('start').addEventListener('click',()=>question(0));
el('questionForm').addEventListener('submit',e=>{e.preventDefault();if(questions[step].note){const answer=el('loveAnswer').value.trim();if(!answer){el('choiceFeedback').textContent='A few words from your heart are all it takes. ♡';el('loveAnswer').focus();return;}answers[step]=answer;showBouquet('Your words are a gift. Here are some flowers for the girl who means everything to me. ♡',()=>show('ready','readyHeading'),true);}else if(confirmed)question(step+1);});
el('back').addEventListener('click',()=>step>0?question(step-1):show('welcome','start'));
el('reveal').addEventListener('click',()=>{show('cinema','filmHeading');el('movie').play().catch(()=>{el('videoStatus').textContent='Press play to start your surprise. ♡';});});
el('movie').addEventListener('playing',()=>{el('videoStatus').textContent='';});
el('movie').addEventListener('error',()=>{el('videoStatus').textContent='The video couldn’t load. Try the “Open video” link below.';});
el('replay').addEventListener('click',()=>{el('movie').currentTime=0;el('movie').play().catch(()=>{el('videoStatus').textContent='Press play to watch again.';});});
function restart(){el('movie').pause();el('movie').currentTime=0;answers=Array(questions.length).fill(null);el('questionForm').reset();show('welcome','start');}
el('restart').addEventListener('click',restart);document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();restart();});

// A soft mosaic of all 110 memories, using one lightweight image atlas.
const memoryWall=document.createElement('div');memoryWall.className='memory-wall';memoryWall.setAttribute('aria-hidden','true');
for(let i=0;i<110;i++){const piece=document.createElement('span');piece.className='memory-piece';piece.style.setProperty('--x',`${(i%10)/9*100}%`);piece.style.setProperty('--y',`${Math.floor(i/10)/10*100}%`);piece.style.setProperty('--tilt',`${(i%5-2)*3}deg`);memoryWall.append(piece);}
document.body.prepend(memoryWall);

// Native dialog supplies focus trapping, keyboard dismissal, and an inert background.
const bouquet=document.createElement('dialog');bouquet.className='bouquet-dialog';bouquet.setAttribute('aria-labelledby','bouquetTitle');bouquet.setAttribute('aria-describedby','bouquetMessage');
bouquet.innerHTML='<button type="button" class="bouquet-close" aria-label="Close flowers">×</button><div class="flower-sparkles" aria-hidden="true"><span>♡</span><span>✦</span><span>♡</span><span>✧</span></div><div class="big-bouquet" role="img" aria-label="A big bouquet of flowers">💐</div><p class="eyebrow">A LITTLE LOVE, JUST FOR YOU</p><h2 id="bouquetTitle">Flowers for <em>my love.</em></h2><p id="bouquetMessage"></p><button type="button" id="bouquetContinue" class="primary">Keep going, my love →</button>';
document.body.append(bouquet);let afterBouquet=null;
function showBouquet(message,after,last=false){if(bouquet.open)return;afterBouquet=after;el('bouquetMessage').textContent=message;el('bouquetContinue').textContent=last?'Take me to my surprise →':'Keep going, my love →';bouquet.showModal();document.body.classList.add('bouquet-open');el('bouquetContinue').focus();}
el('bouquetContinue').addEventListener('click',()=>{const next=afterBouquet;afterBouquet=null;bouquet.close();if(next)next();});
bouquet.querySelector('.bouquet-close').addEventListener('click',()=>bouquet.close());
bouquet.addEventListener('close',()=>{afterBouquet=null;document.body.classList.remove('bouquet-open');});
